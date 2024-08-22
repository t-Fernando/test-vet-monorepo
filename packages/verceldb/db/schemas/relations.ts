import { relations } from 'drizzle-orm';
import { brand, product, payment, clinic, subscription, owner } from './tables';

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

export const paymentRelations = relations(payment, ({ one }) => {
  return {
    clinic: one(clinic, {
      fields: [payment.clinicId],
      references: [clinic.id],
    }),
    subscription: one(subscription, {
      fields: [payment.clinicId],
      references: [subscription.id],
    }),
  };
});

export const subscriptionRelations = relations(subscription, ({ many }) => {
  return {
    payment: many(payment),
  };
});

export const clinicRelations = relations(clinic, ({ many }) => {
  return {
    payment: many(payment),
    owner: many(owner),
  };
});

export const ownerRelations = relations(owner, ({ one }) => {
  return {
    clinic: one(clinic, {
      fields: [owner.clinicId],
      references: [clinic.id],
    }),
  };
});
