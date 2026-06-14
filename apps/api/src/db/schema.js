import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.default(sql`null`)
		.$onUpdate(() => new Date()),
});

export const articles = pgTable('articles', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	title: varchar({ length: 50 }).notNull(),
	content: text().notNull(),
	isPublic: boolean().notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.default(sql`null`)
		.$onUpdate(() => new Date()),
	authorId: integer()
		.references(() => users.id)
		.notNull(),
});

export const comments = pgTable('comments', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	author: varchar({ length: 100 }).notNull(),
	content: varchar({ length: 500 }).notNull(),
	createdAt: timestamp().defaultNow(),
	updatedAt: timestamp()
		.default(sql`null`)
		.$onUpdate(() => new Date()),
	articleId: integer()
		.references(() => articles.id)
		.notNull(),
});
