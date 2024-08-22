import { relations } from 'drizzle-orm';
import { brand, product } from './tables';

export const brandRelations = relations(brand, ({ many }) => {
  return {
    product: many(product),
  };
});

export const productRelations = relations(product, ({ one }) => {
  return {
    brand: one(brand, {
      fields: [product.brandId],
      references: [brand.id],
    }),
  };
});
