import { error, redirect } from '@sveltejs/kit';
import { dev } from '$app/env';
import { HCA_CLIENT_ID, HCA_CLIENT_SECRET } from '$app/env/private';
import { db } from '../../../lib/server/db';
import { sessions, users } from '../../../lib/server/db/schema';
import type { RequestHandler } from './$types';

// GET /auth/callback?code=...&state=... -> Hack Club Auth sends you back here
export const GET: RequestHandler = async ({ url, cookies }) => {
	// 1. Check this login actually started on our site
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const expectedState = cookies.get('hca_state');
	cookies.delete('hca_state', { path: '/' });

	const hcaError = url.searchParams.get('error');
	if (hcaError) error(400, `Hack Club Auth said: ${hcaError}`);
	if (!code || !state || state !== expectedState) error(400, 'Invalid login attempt, try again.');

	// 2. Token swap: code + client secret -> access token (server only)
	const tokenRes = await fetch('https://auth.hackclub.com/oauth/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			client_id: HCA_CLIENT_ID,
			client_secret: HCA_CLIENT_SECRET,
			redirect_uri: `${url.origin}/auth/callback`,
			code,
			grant_type: 'authorization_code'
		})
	});
	if (!tokenRes.ok) error(500, `Token swap failed: ${await tokenRes.text()}`);
	const { access_token } = (await tokenRes.json()) as { access_token: string };

	// 3. Who is this?
	const infoRes = await fetch('https://auth.hackclub.com/oauth/userinfo', {
		headers: { Authorization: `Bearer ${access_token}` }
	});
	if (!infoRes.ok) error(500, `Userinfo failed: ${await infoRes.text()}`);
	const info = (await infoRes.json()) as {
		sub: string;
		name?: string;
		nickname?: string;
		email?: string;
		slack_id?: string;
	};

	// 4. Save the user (create first time, update after)
	const user = {
		id: info.sub,
		name: info.name ?? info.nickname ?? info.email ?? 'Hack Clubber',
		email: info.email ?? null,
		slackId: info.slack_id ?? null
	};
	await db
		.insert(users)
		.values(user)
		.onConflictDoUpdate({
			target: users.id,
			set: { name: user.name, email: user.email, slackId: user.slackId }
		});

	// 5. Log them in: session row + httpOnly cookie with its id
	const sessionId = crypto.randomUUID() + crypto.randomUUID();
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
	await db.insert(sessions).values({ id: sessionId, userId: user.id, expiresAt });
	cookies.set('session', sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		expires: expiresAt
	});

	// redirect() works by throwing, so keep it outside any try/catch
	redirect(302, '/app');
};
