import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { client, pet } from './';

export const petToClient = sqliteTable('pet_to_client', {
  petId: text('pet_id')
    .references(() => pet.id)
    .notNull(),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  isPrimaryOwner: integer('is_primary_owner', { mode: 'boolean' }).notNull(),
});
export type InsertPetToClient = typeof petToClient.$inferInsert;
export type SelectPetToClient = typeof petToClient.$inferSelect;

export const petToClientRelations = relations(petToClient, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petToClient.petId],
      references: [pet.id],
    }),
    client: one(client, {
      fields: [petToClient.clientId],
      references: [client.id],
    }),
  };
});
