import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { ticket } from '.';
import { relations } from 'drizzle-orm';

export const cartItem = sqliteTable('cart_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  ticketId: integer('ticket_id')
    .references(() => ticket.id)
    .notNull(),
  //TODO: medicineId
  //TODO: productId
  //TODO: vaccineId
  //TODO: dewormerId
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
  };
});
