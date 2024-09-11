import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { vaccine } from './vaccine';
// import { supplier } from './supplier';
import { relations, sql } from 'drizzle-orm';
import { restock } from './restock';
import { cartItem } from './cartItem';
import { petVaccination } from './petVaccination';
// import { cartItem } from './cartItem';
// import { petVaccination } from './petVaccination';

export const restockVaccine = sqliteTable('restock_vaccine', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  vaccineId: text('vaccine_id')
    .notNull()
    .references(() => vaccine.id),
  restockId: text('restock_id')
    .notNull()
    .references(() => restock.id),
  commercialName: text('commercial_name'),
  stock: real('stock').default(0),
  lot: text('lot'),
  expirityDate: text('expirity_date'), // Date
  purchasePrice: real('purchase_price').default(0),
  discountPercentage: real('discount_percentage').default(0),
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
      restock: one(restock, {
        fields: [restockVaccine.restockId],
        references: [restock.id],
      }),
      cartItem: many(cartItem),
      petVaccination: many(petVaccination),
    };
  }
);
