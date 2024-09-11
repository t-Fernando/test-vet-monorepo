import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { medicine } from './medicine';
// import { supplier } from './supplier';
import { relations, sql } from 'drizzle-orm';
// import { cartItem } from './cartItem';

export const restockMedicine = sqliteTable('restock_medicine', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // medicineId: integer('medicine_id')
  //   .notNull()
  //   .references(() => medicine.id),
  // restockId
  commercialName: text('commercial_name'),
  stock: real('stock').default(0),
  lot: text('lot'),
  expirityDate: text('expirity_date'), // Date
  purchasePrice: real('purchase_price').default(0),
  discountPercentage: real('discount_percentage').default(0),
});

export type InsertRestockMedicine = typeof restockMedicine.$inferInsert;
export type SelectRestockMedicine = typeof restockMedicine.$inferSelect;

// export const restockMedicineRelations = relations(
//   restockMedicine,
//   ({ one, many }) => {
//     return {
//       medicine: one(medicine, {
//         fields: [restockMedicine.medicineId],
//         references: [medicine.id],
//       }),
//       supplier: one(supplier, {
//         fields: [restockMedicine.supplierId],
//         references: [supplier.id],
//       }),
//       cartItem: many(cartItem),
//     };
//   }
// );
