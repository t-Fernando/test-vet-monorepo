import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { publicClinic, publicSubscription } from './';

export const publicPayment = sqliteTable('public_payment', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  clinicId: text('clinic_id')
    .notNull()
    .references(() => publicClinic.id),
  subscriptionId: text('subscription_id')
    .notNull()
    .references(() => publicSubscription.id),
  createdAt: text('created_at').notNull(), //Date
  endDate: text('end_date').notNull(), //Date
  billingPeriod: text('billing_period', {
    enum: ['monthly', 'annual'],
  }).notNull(),
  totalAmount: real('total_amount').notNull(),
});

export type InsertPublicPayment = typeof publicPayment.$inferInsert;
export type SelectPublicPayment = typeof publicPayment.$inferSelect;

export const publicPaymentRelations = relations(publicPayment, ({ one }) => {
  return {
    publicSubscription: one(publicSubscription, {
      fields: [publicPayment.subscriptionId],
      references: [publicSubscription.id],
    }),
    publicClinic: one(publicClinic, {
      fields: [publicPayment.clinicId],
      references: [publicClinic.id],
    }),
  };
});
