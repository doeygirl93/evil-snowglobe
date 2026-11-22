import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '../../../lib/server/db';
import { sessions } from '../../../lib/server/db/schema';
import type { RequestHandler } from './$types';

// POST /auth/logout (from a <form method="POST" action="/auth/logout">)
export const POST: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session');
	if (sessionId) await db.delete(sessions).where(eq(sessions.id, sessionId));
	cookies.delete('session', { path: '/' });
	redirect(303, '/');
};
