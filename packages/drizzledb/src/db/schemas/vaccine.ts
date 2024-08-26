import { relations, sql } from 'drizzle-orm';
import {
  sqliteTable,
  integer,
  text,
  real,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';

import {
  petVaccination,
  prescriptionItem,
  vaccineSupplier,
  cartItem,
} from './';

export const vaccine = sqliteTable(
  'vaccine',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    vaccineId: integer('vaccine_id')
      .notNull()
      .$type<number[]>()
      .default(sql`'[]'`), // id from public db
    laboratoryId: integer('laboratoryId')
      .notNull()
      .$type<number[]>()
      .default(sql`'[]'`), // id from public db
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
  },
  (table) => {
    return {
      vaccineIdx: uniqueIndex('vaccineIdx').on(table.id),
      lotIdx: index('lotIdx').on(table.lot),
    };
  }
);

export type InsertVaccine = typeof vaccine.$inferInsert;
export type SelectVaccine = typeof vaccine.$inferSelect;

export const vaccineRelations = relations(vaccine, ({ many }) => {
  return {
    petVaccination: many(petVaccination),
    prescriptionItem: many(prescriptionItem),
    vaccineSupplier: many(vaccineSupplier),
    cartItem: many(cartItem),
  };
});
