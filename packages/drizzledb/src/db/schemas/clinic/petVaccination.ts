import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { pet } from './';
// import { restockVaccine } from './restockVaccine';

export const petVaccination = sqliteTable('pet_vaccination', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // petId: integer('pet_id')
  //   .references(() => pet.id)
  //   .notNull(),
  // restockVaccineId: integer('restock_vaccine_id')
  //   .notNull()
  //   .references(() => restockVaccine.id),
  applicationDate: text('application_date'),
  observations: text('observations'),
});
export type InsertPetVaccination = typeof petVaccination.$inferInsert;
export type SelectPetVaccination = typeof petVaccination.$inferSelect;

// export const petVaccinationRelations = relations(petVaccination, ({ one }) => {
//   return {
//     pet: one(pet, {
//       fields: [petVaccination.petId],
//       references: [pet.id],
//     }),
//     restockVaccine: one(restockVaccine, {
//       fields: [petVaccination.restockVaccineId],
//       references: [restockVaccine.id],
//     }),
//   };
// });
