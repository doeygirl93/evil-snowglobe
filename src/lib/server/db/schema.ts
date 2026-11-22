import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	// Hack Club Auth's user id ("sub"), so the same person always maps to the same row
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email'),
	slackId: text('slack_id'),
	points: integer('points').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
});

export const sessions = sqliteTable('sessions', {
	// Random id, stored in the "session" cookie
	id: text('id').primaryKey(),
	// Each session belongs to one user (the "many" side holds the id)
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type User = typeof users.$inferSelect;
