import { relations, sql } from 'drizzle-orm';
import {
  sqliteTable,
  integer,
  text,
  real,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';
import { publicMedicine } from '../public/medicine';
// import { restockMedicine } from './restockMedicine';
// import { restockItem } from './restockItem';
// import { medicineSimilarities } from './medicineSimilarities';
// import { prescriptionItem } from './prescriptionItem';

// import { medicineSupplier, cartItem, prescriptionItem } from './';

export type Stock = {
  // not a real reference but an array of restockMedicineIds
  medicineRestockId: number;
  stock: number;
};

export const medicine = sqliteTable(
  'medicine',
  {
    id: text('id')
      .primaryKey()
      .$default(() => sql`uuid4()`),
    // publicMedicineId: integer('public_medicine_id').references(
    //   () => publicMedicine.id
    // ),
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
  },
  (table) => {
    return {
      medicineIdx: uniqueIndex('medicine_idx').on(table.id),
      // publicMedicineIdx: index('public_medicine_idx').on(
      //   table.publicMedicineId
      // ),
    };
  }
);

export type InsertMedicine = typeof medicine.$inferInsert;
export type SelectMedicine = typeof medicine.$inferSelect;

// export const medicineRelations = relations(medicine, ({ one, many }) => {
//   return {
//     restockMedicine: many(restockMedicine),
//     restockItem: many(restockItem),
//     medicineSimilarities: many(medicineSimilarities),
//     publicMedicine: one(publicMedicine, {
//       fields: [medicine.publicMedicineId],
//       references: [publicMedicine.id],
//     }),
//     prescriptionItem: many(prescriptionItem),
//   };
// });
