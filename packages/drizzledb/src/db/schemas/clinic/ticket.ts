import { relations, sql } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { cartItem, client, consultation, paymentHistory } from './';

export const ticket = sqliteTable('ticket', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  consolutationId: text('consultation_id').references(() => consultation.id),
  createdAt: text('created_at')
    .notNull()
    .default(sql`current_timestamp`),
  additionalDiscount: real('additional_discount').default(0),
  totalDiscount: real('total_discount').default(0),
  totalAmount: real('total_amount').default(0),
});
export type InsertTicket = typeof ticket.$inferInsert;
export type SelectTicket = typeof ticket.$inferSelect;

export const ticketRelations = relations(ticket, ({ one, many }) => {
  return {
    client: one(client, {
      fields: [ticket.clientId],
      references: [client.id],
    }),
    consultation: one(consultation, {
      fields: [ticket.consolutationId],
      references: [consultation.id],
    }),
    paymentHistory: many(paymentHistory),
    cartItem: many(cartItem),
  };
});
