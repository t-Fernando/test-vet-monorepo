import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const itemSimilarities = sqliteTable('item_similarities', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // itemAId
  // itemBId
  type: text('type', { enum: ['medicine', 'vaccine', 'dewormer', 'product'] }),
});

export type InsertItemSimilarities = typeof itemSimilarities.$inferInsert;
export type SelectItemSimilarities = typeof itemSimilarities.$inferSelect;
