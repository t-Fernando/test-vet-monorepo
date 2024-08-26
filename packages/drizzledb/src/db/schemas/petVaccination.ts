import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { pet, vaccine } from './';

export const petVaccination = sqliteTable('pet_vaccination', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  petId: integer('pet_id')
    .references(() => pet.id)
    .notNull(),
  vaccineId: integer('vaccine_id')
    .notNull()
    .references(() => vaccine.id),
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
    vaccine: one(vaccine, {
      fields: [petVaccination.vaccineId],
      references: [vaccine.id],
    }),
  };
});
