import { relations, sql } from 'drizzle-orm';
import {
  sqliteTable,
  integer,
  text,
  real,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';
import { publicDewormer } from '../public';
import { restockDewormer } from './restockDewormer';
import { restockItem } from './restockItem';
import { dewormerSimilarities } from './dewormerSimilarities';
import { prescriptionItem } from './prescriptionItem';

export type Stock = {
  // not a real relationship, just a list of restockDewormerIds
  dewormerRestockId: number;
  stock: number;
};

export const dewormer = sqliteTable(
  'dewormer',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    publicDewormerId: integer('public_dewormer_id').references(
      () => publicDewormer.id
    ),
    name: text('name').notNull(),
    description: text('description'),
    type: text('type', { enum: ['healing', 'maintenance'] }),
    stockCount: integer('stock_count').default(0),
    stock: text('stock')
      .$type<Stock[]>()
      .default(sql`'[]'`),
    branch: text('branch'),
    department: text('department'),
    rack: text('rack'),
    publicPrice: real('public_price').default(0),
  },
  (table) => {
    return {
      dewormerIdx: uniqueIndex('dewormer_idx').on(table.id),
      publicDewormerIdx: index('public_dewormer_idx').on(
        table.publicDewormerId
      ),
    };
  }
);

export const dewormerRelations = relations(dewormer, ({ one, many }) => {
  return {
    restockDewormer: many(restockDewormer),
    restockItem: many(restockItem),
    dewormerSimilarities: many(dewormerSimilarities),
    publicDewormer: one(publicDewormer, {
      fields: [dewormer.publicDewormerId],
      references: [publicDewormer.id],
    }),
    prescriptionItem: many(prescriptionItem),
  };
});
