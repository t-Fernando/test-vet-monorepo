// import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
// import { product } from './product';
// import { supplier } from './supplier';
// import { relations } from 'drizzle-orm';
// import { cartItem } from './cartItem';
// import { accessory } from './accessory';

// export const restockProduct = sqliteTable('restock_product', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   productId: integer('product_id')
//     .notNull()
//     .references(() => product.id),
//   supplierId: integer('supplier_id')
//     .notNull()
//     .references(() => supplier.id),
//   commercialName: text('commercial_name'),
//   stock: real('stock').default(0),
//   expiritiDate: text('expirity_date'),
//   purchasePrice: real('purchase_price').default(0),
//   discountPercentage: real('discount_percentage').default(0),
// });

// export type InsertRestockProduct = typeof restockProduct.$inferInsert;
// export type SelectRestockProduct = typeof restockProduct.$inferSelect;

// export const restockProductRelations = relations(
//   restockProduct,
//   ({ one, many }) => {
//     return {
//       product: one(product, {
//         fields: [restockProduct.productId],
//         references: [product.id],
//       }),
//       supplier: one(supplier, {
//         fields: [restockProduct.supplierId],
//         references: [supplier.id],
//       }),
//       cartItem: many(cartItem),
//       accessory: many(accessory),
//     };
//   }
// );
