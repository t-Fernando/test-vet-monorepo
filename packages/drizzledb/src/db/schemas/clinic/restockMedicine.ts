import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { medicine } from './medicine';
// import { supplier } from './supplier';
import { relations, sql } from 'drizzle-orm';
import { restock } from './restock';
import { cartItem } from './cartItem';
// import { cartItem } from './cartItem';

export const restockMedicine = sqliteTable('restock_medicine', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  medicineId: text('medicine_id')
    .notNull()
    .references(() => medicine.id),
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

export type InsertRestockMedicine = typeof restockMedicine.$inferInsert;
export type SelectRestockMedicine = typeof restockMedicine.$inferSelect;

export const restockMedicineRelations = relations(
  restockMedicine,
  ({ one, many }) => {
    return {
      medicine: one(medicine, {
        fields: [restockMedicine.medicineId],
        references: [medicine.id],
      }),
      restock: one(restock, {
        fields: [restockMedicine.restockId],
        references: [restock.id],
      }),
      cartItem: many(cartItem),
    };
  }
);
