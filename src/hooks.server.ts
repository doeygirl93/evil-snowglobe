import type { Handle } from '@sveltejs/kit/hooks';
import { eq } from 'drizzle-orm';
import { db } from './lib/server/db';
import { sessions, users } from './lib/server/db/schema';

// Runs on every request (like Hono middleware): session cookie -> locals.user
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;

	const sessionId = event.cookies.get('session');
	if (sessionId) {
		// Find the session AND its user in one query (join on sessions.user_id = users.id)
		const [row] = await db
			.select({ user: users, expiresAt: sessions.expiresAt })
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(eq(sessions.id, sessionId))
			.limit(1);

		if (row && row.expiresAt.getTime() > Date.now()) {
			event.locals.user = row.user;
		} else if (row) {
			// Expired: clean it up
			await db.delete(sessions).where(eq(sessions.id, sessionId));
		}
	}

	return resolve(event);
};
