import { redirect } from '@sveltejs/kit';
import { dev } from '$app/env';
import { HCA_CLIENT_ID } from '$app/env/private';
import type { RequestHandler } from './$types';

// GET /auth/login -> sends you to Hack Club Auth
export const GET: RequestHandler = ({ url, cookies }) => {
	// Random value we check again in /auth/callback so nobody can fake a login
	const state = crypto.randomUUID();
	cookies.set('hca_state', state, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev,
		maxAge: 60 * 10
	});

	const params = new URLSearchParams({
		client_id: HCA_CLIENT_ID,
		redirect_uri: `${url.origin}/auth/callback`,
		response_type: 'code',
		scope: 'openid email slack_id',
		state
	});


	redirect(302, `https://auth.hackclub.com/oauth/authorize?${params}`, { external: true });
};
