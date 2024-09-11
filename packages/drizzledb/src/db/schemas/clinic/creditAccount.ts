import { relations } from 'drizzle-orm';
import {
  blob,
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

import { client } from './';

export const creditAccount = sqliteTable('credit_account', {
  accountNumber: blob('account_number', { mode: 'bigint' }).primaryKey(),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  debt: real('debt').default(0),
  deopsit: real('deposit').default(0),
});
export type InsertCreditAccount = typeof creditAccount.$inferInsert;
export type SelectCreditAccount = typeof creditAccount.$inferSelect;

export const creditAccountRelations = relations(creditAccount, ({ one }) => {
  return {
    client: one(client, {
      fields: [creditAccount.clientId],
      references: [client.id],
    }),
  };
});
