import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { medicalStudy, laboratoryOrder } from './';

export const provider = sqliteTable('provider', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name').notNull(),
});

export type InsertProvider = typeof provider.$inferInsert;
export type SelectProvider = typeof provider.$inferSelect;

export const providerRelations = relations(provider, ({ many }) => {
  return {
    medicalStudy: many(medicalStudy),
    laboratoryOrder: many(laboratoryOrder),
  };
});
