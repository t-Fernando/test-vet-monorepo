import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {
  appointment,
  consultation,
  creditAccount,
  petToClient,
  taxInformation,
  ticket,
} from '.';

export const client = sqliteTable('client', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  contactMethid: text('contact_method', {
    enum: ['whatsapp', 'email', 'phone'],
  }).notNull(),
});
export type InsertClient = typeof client.$inferInsert;
export type SelectClient = typeof client.$inferSelect;

export const clientRelations = relations(client, ({ one, many }) => {
  return {
    creditAccount: one(creditAccount, {
      fields: [client.id],
      references: [creditAccount.clientId],
    }),
    taxInformation: one(taxInformation, {
      fields: [client.id],
      references: [taxInformation.clientId],
    }),
    petToClient: many(petToClient),
    ticket: many(ticket),
    appointment: many(appointment),
    consultation: many(consultation),
  };
});
