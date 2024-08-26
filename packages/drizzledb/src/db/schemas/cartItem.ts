import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

import { dewormer, medicine, product, ticket, vaccine } from './';

export const cartItem = sqliteTable('cart_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ticketId: integer('ticket_id')
    .references(() => ticket.id)
    .notNull(),
  medicineId: integer('medicine_id')
    .references(() => medicine.id)
    .notNull(),
  productId: integer('product_id')
    .references(() => product.id)
    .notNull(),
  vaccineId: integer('vaccine_id')
    .references(() => vaccine.id)
    .notNull(),
  dewormerId: integer('dewormer_id')
    .references(() => dewormer.id)
    .notNull(),
  quantity: integer('quantity').default(0),
  price: real('price').default(0),
  debt: real('debt').default(0),
  deposit: real('deposit').default(0),
  remainingAmount: real('remaining_amount').default(0),
});

export type InsertCartItem = typeof cartItem.$inferInsert;
export type SelectCartItem = typeof cartItem.$inferSelect;

export const cartItemRelations = relations(cartItem, ({ one }) => {
  return {
    ticket: one(ticket, {
      fields: [cartItem.ticketId],
      references: [ticket.id],
    }),
    medicine: one(medicine, {
      fields: [cartItem.medicineId],
      references: [medicine.id],
    }),
    product: one(product, {
      fields: [cartItem.productId],
      references: [product.id],
    }),
    vaccine: one(vaccine, {
      fields: [cartItem.vaccineId],
      references: [vaccine.id],
    }),
    dewormer: one(dewormer, {
      fields: [cartItem.dewormerId],
      references: [dewormer.id],
    }),
  };
});
