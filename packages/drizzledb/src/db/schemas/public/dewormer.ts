import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { dewormer } from '../clinic';

export const publicDewormer = sqliteTable('public_dewormer', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type', { enum: ['healing', 'maintenance'] }),
  applicationPeriod: text('application_period'),
  suggestedPrice: real('suggested_price').default(0),
  categoriesIds: text('categories_ids', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`), // not a real relationship, just a list of ids
});

export type InsertPublicDewormer = typeof publicDewormer.$inferInsert;
export type SelectPublicDewormer = typeof publicDewormer.$inferSelect;

export const publicDewormerRelations = relations(publicDewormer, ({ many }) => {
  return {
    dewormer: many(dewormer),
  };
});
