import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { publicMedicine } from '../public';
import { itemSimilarities, prescriptionItem, restockMedicine } from './';

export type Stock = {
  // not a real reference but an array of restockMedicineIds
  medicineRestockId: number;
  stock: number;
};

export const medicine = sqliteTable('medicine', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  publicMedicineId: text('public_medicine_id').references(
    () => publicMedicine.id
  ),
  laboratoryIds: text('laboratory_ids') // not a real relation but an array of laboratory ids
    .default(sql`'[]'`)
    .notNull(),
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
});

export type InsertMedicine = typeof medicine.$inferInsert;
export type SelectMedicine = typeof medicine.$inferSelect;

export const medicineRelations = relations(medicine, ({ one, many }) => {
  return {
    restockMedicine: many(restockMedicine),
    itemSimilarities: many(itemSimilarities),
    publicMedicine: one(publicMedicine, {
      fields: [medicine.publicMedicineId],
      references: [publicMedicine.id],
    }),
    prescriptionItem: many(prescriptionItem),
  };
});
