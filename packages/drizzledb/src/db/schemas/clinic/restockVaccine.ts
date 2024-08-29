import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { vaccine } from './vaccine';
import { supplier } from './supplier';
import { relations, sql } from 'drizzle-orm';
import { cartItem } from './cartItem';
import { petVaccination } from './petVaccination';

export const restockVaccine = sqliteTable('restock_vaccine', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  vaccineId: integer('vaccine_id')
    .notNull()
    .references(() => vaccine.id),
  supplierId: integer('supplier_id')
    .notNull()
    .references(() => supplier.id),
  commercialName: text('commercial_name'),
  stock: real('stock').default(0),
  lot: text('lot'),
  expirityDate: text('expirity_date'), // Date
  purchasePrice: real('purchase_price').default(0),
  discountPercentage: real('discount_percentage').default(0),
  laboratoryIds: integer('laboratory_ids')
    .$type<number[]>()
    .default(sql`'[]'`),
});

export type InsertRestockVaccine = typeof restockVaccine.$inferInsert;
export type SelectRestockVaccine = typeof restockVaccine.$inferSelect;

export const restockVaccineRelations = relations(
  restockVaccine,
  ({ one, many }) => {
    return {
      vaccine: one(vaccine, {
        fields: [restockVaccine.vaccineId],
        references: [vaccine.id],
      }),
      supplier: one(supplier, {
        fields: [restockVaccine.supplierId],
        references: [supplier.id],
      }),
      cartItem: many(cartItem),
      petVaccination: many(petVaccination),
    };
  }
);
