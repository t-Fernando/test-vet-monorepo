import { relations } from 'drizzle-orm';
import { brandTable, productTable } from './tables';

export const brandRelations = relations(brandTable, ({ many }) => {
  return {
    product: many(productTable),
  };
});

export const productRelations = relations(productTable, ({ one }) => {
  return {
    brand: one(brandTable, {
      fields: [productTable.brandId],
      references: [brandTable.id],
    }),
  };
});
