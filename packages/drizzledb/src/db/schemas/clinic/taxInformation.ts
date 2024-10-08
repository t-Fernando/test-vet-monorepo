import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { client } from './';

export const taxInformation = sqliteTable('tax_information', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  address: text('address').notNull(),
  postalCode: text('postal_code').notNull(),
  state: text('state').notNull(),
  city: text('city').notNull(),
  residentialComplex: text('residential_complex').notNull(),
  rfc: text('rfc').notNull(),
  billingEmail: text('billing_email').notNull(),
  deductionType: text('deduction_type').notNull(),
});
export type InsertTaxInformation = typeof taxInformation.$inferInsert;
export type SelectTaxInformation = typeof taxInformation.$inferSelect;

export const taxInformationRelations = relations(taxInformation, ({ one }) => {
  return {
    client: one(client, {
      fields: [taxInformation.clientId],
      references: [client.id],
    }),
  };
});
