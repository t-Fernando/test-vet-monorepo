import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { dewormer, pet } from './';

export const petDeworming = sqliteTable('pet_deworming', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  idPet: integer('id_pet')
    .references(() => pet.id)
    .notNull(),
  dewormerId: integer('dewormer_id')
    .notNull()
    .references(() => dewormer.id),
  applicationDate: text('application_date'),
});
export type InsertPetDeworming = typeof petDeworming.$inferInsert;
export type SelectPetDeworming = typeof petDeworming.$inferSelect;

export const petDewormingRelations = relations(petDeworming, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petDeworming.idPet],
      references: [pet.id],
    }),
    dewormer: one(dewormer, {
      fields: [petDeworming.dewormerId],
      references: [dewormer.id],
    }),
  };
});
