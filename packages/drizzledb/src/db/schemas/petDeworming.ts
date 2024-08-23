import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { pet } from '.';
import { relations } from 'drizzle-orm';

export const petDeworming = sqliteTable('pet_deworming', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  idPet: integer('id_pet')
    .references(() => pet.id)
    .notNull(),
  //TODO: dewormerId: relation to dewormer table
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
  };
});
