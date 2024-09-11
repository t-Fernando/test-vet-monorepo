import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { ticket } from './';

export const paymentHistory = sqliteTable('payment_history', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  ticketId: text('ticket_id')
    .references(() => ticket.id)
    .notNull(),
  paymentDate: text('payment_date'),
  amount: real('amount').default(0),
});

export type InsertPaymentHistory = typeof paymentHistory.$inferInsert;
export type SelectPaymentHistory = typeof paymentHistory.$inferSelect;

export const paymentHistoryRelations = relations(paymentHistory, ({ one }) => {
  return {
    ticket: one(ticket, {
      fields: [paymentHistory.ticketId],
      references: [ticket.id],
    }),
  };
});
