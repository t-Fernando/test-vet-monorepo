// import { relations, sql } from 'drizzle-orm';
// import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
// import { dewormer } from './dewormer';
// import { supplier } from './supplier';
// import { restock } from './restock';
// import { cartItem } from './cartItem';
// import { petDeworming } from './petDeworming';

// export const restockDewormer = sqliteTable('restock_dewormer', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   dewormerId: integer('dewormer_id')
//     .notNull()
//     .references(() => dewormer.id),
//   supplierId: integer('supplier_id')
//     .notNull()
//     .references(() => supplier.id),
//   commercialName: text('commercial_name'),
//   stock: real('stock').default(0),
//   lot: text('lot'),
//   expirityDate: text('expirity_date'), // Date
//   purchasePrice: real('purchase_price').default(0),
//   discountPercentage: real('discount_percentage').default(0),
//   // not a real relationship, but array of laboratory ids
//   laboratoryIds: integer('laboratory_ids')
//     .$type<number[]>()
//     .default(sql`'[]'`),
// });

// export type InsertRestockDewormer = typeof restockDewormer.$inferInsert;
// export type SelectRestockDewormer = typeof restockDewormer.$inferSelect;

// export const restockDewormerRelations = relations(
//   restockDewormer,
//   ({ one, many }) => {
//     return {
//       dewormer: one(dewormer, {
//         fields: [restockDewormer.dewormerId],
//         references: [dewormer.id],
//       }),
//       supplier: one(supplier, {
//         fields: [restockDewormer.supplierId],
//         references: [supplier.id],
//       }),
//       cartItem: many(cartItem),
//       petDeworming: many(petDeworming),
//     };
//   }
// );
