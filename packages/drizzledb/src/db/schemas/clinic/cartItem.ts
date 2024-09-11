import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { ticket } from './';
import { restockDewormer } from './restockDewormer';
import { restockMedicine } from './restockMedicine';
import { restockVaccine } from './restockVaccine';
import { restockProduct } from './restockProduct';

export const cartItem = sqliteTable('cart_item', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  ticketId: integer('ticket_id')
    .references(() => ticket.id)
    .notNull(),
  itemId: text('item_id')
    .notNull()
    .references(() => restockProduct.id)
    .references(() => restockVaccine.id)
    .references(() => restockMedicine.id)
    .references(() => restockDewormer.id),
  type: text('type', {
    enum: ['medicine', 'product', 'vaccine', 'dewormer'],
  }).notNull(),
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
    restockDewormer: one(restockDewormer, {
      fields: [cartItem.itemId],
      references: [restockDewormer.id],
    }),
    restockMedicine: one(restockMedicine, {
      fields: [cartItem.itemId],
      references: [restockMedicine.id],
    }),
    restockVaccine: one(restockVaccine, {
      fields: [cartItem.itemId],
      references: [restockVaccine.id],
    }),
    restockProduct: one(restockProduct, {
      fields: [cartItem.itemId],
      references: [restockProduct.id],
    }),
  };
});
