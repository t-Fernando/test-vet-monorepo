// import { relations } from 'drizzle-orm';
// import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
// import { restock } from './restock';
// import { restockDewormer } from './restockDewormer';
// import { restockMedicine } from './restockMedicine';
// import { restockProduct } from './restockProduct';
// import { restockVaccine } from './restockVaccine';

// export const supplier = sqliteTable('supplier', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(),
//   address: text('address'),
//   phone: text('phone'),
//   email: text('email'),
// });

// export type InsertSupplier = typeof supplier.$inferInsert;
// export type SelectSupplier = typeof supplier.$inferSelect;

// export const supplierRelations = relations(supplier, ({ many }) => {
//   return {
//     restock: many(restock),
//     restockDewormer: many(restockDewormer),
//     restockMedicine: many(restockMedicine),
//     restockProduct: many(restockProduct),
//     restockVaccine: many(restockVaccine),
//   };
// });
