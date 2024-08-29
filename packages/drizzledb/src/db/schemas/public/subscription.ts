import { relations } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { publicPayment } from './';

export const publicSubscription = sqliteTable('public_subscription', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  licenses: integer('licenses').notNull(),
  monthlyPrice: real('monthly_price').notNull(),
});

export type InsertPublicSubscription = typeof publicSubscription.$inferInsert;
export type SelectPublicSubscription = typeof publicSubscription.$inferSelect;

export const publicSubscriptionRelations = relations(
  publicSubscription,
  ({ many }) => {
    return {
      publicPayment: many(publicPayment),
    };
  }
);
