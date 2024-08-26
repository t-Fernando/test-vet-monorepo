import { relations, sql } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  real,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';
import { dewormerSupplier } from './dewormerSupplier';
import { cartItem } from './cartItem';
import { petDeworming } from './petDeworming';

export const dewormer = sqliteTable(
  'dewormer',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    stock: integer('stock').default(0),
    lot: text('lot'),
    purchaseDate: text('purchase_date'), //Date
    expirityDate: text('expirity_date'), //Date
    branch: text('branch'),
    department: text('department'),
    rack: text('rack'),
    purchacePrice: real('purchace_price').default(0),
    utility: real('utility').default(0),
    discountPercentage: real('discount_percentage').default(0),
    discountCode: text('discount_code'),
    publicPrice: real('public_price').default(0),
    laboratoryId: integer('laboratoryId')
      .notNull()
      .$type<number[]>()
      .default(sql`'[]'`), // id from public db
    dewormerId: integer('dewormerId')
      .notNull()
      .$type<number[]>()
      .default(sql`'[]'`), // id from public db
  },
  (table) => {
    return {
      dewormerIdx: uniqueIndex('dewormerIdx').on(table.id),
      dewormerLotIdx: index('dewormerLotIdx').on(table.lot),
    };
  }
);

// index('dewormer').on(dewormer.lot);

export type InsertDewormer = typeof dewormer.$inferInsert;
export type SelectDewormer = typeof dewormer.$inferSelect;

export const dewormerRelations = relations(dewormer, ({ many }) => {
  return {
    dewormerSupplier: many(dewormerSupplier),
    cartItem: many(cartItem),
    petDeworming: many(petDeworming),
  };
});
