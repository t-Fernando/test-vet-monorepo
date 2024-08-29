import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { publicClinic, publicSubscription } from './';
import { relations } from 'drizzle-orm';

export const publicPayment = sqliteTable('public_payment', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clinicId: integer('clinic_id')
    .notNull()
    .references(() => publicClinic.id),
  subscriptionId: integer('subscription_id')
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
