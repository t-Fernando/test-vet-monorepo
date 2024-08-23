import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { pet } from '.';
import { relations } from 'drizzle-orm';

export const petVaccination = sqliteTable('pet_vaccination', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  petId: integer('pet_id')
    .references(() => pet.id)
    .notNull(),
  //TODO: vaccineId: relation to vaccine table
  applicationDate: text('application_date'),
  observations: text('observations'),
});
export type InsertPetVaccination = typeof petVaccination.$inferInsert;
export type SelectPetVaccination = typeof petVaccination.$inferSelect;

export const petVaccinationRelations = relations(petVaccination, ({ one }) => {
  return {
    pet: one(pet, {
      fields: [petVaccination.petId],
      references: [pet.id],
    }),
  };
});
