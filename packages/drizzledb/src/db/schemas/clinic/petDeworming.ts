import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { pet } from './';
// import { restockDewormer } from './restockDewormer';

export const petDeworming = sqliteTable('pet_deworming', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // idPet: integer('id_pet')
  //   .references(() => pet.id)
  //   .notNull(),
  // dewormerId: integer('restock_dewormer_id')
  //   .notNull()
  //   .references(() => restockDewormer.id),
  applicationDate: text('application_date'),
});
export type InsertPetDeworming = typeof petDeworming.$inferInsert;
export type SelectPetDeworming = typeof petDeworming.$inferSelect;

// export const petDewormingRelations = relations(petDeworming, ({ one }) => {
//   return {
//     pet: one(pet, {
//       fields: [petDeworming.idPet],
//       references: [pet.id],
//     }),
//     restockDewormer: one(restockDewormer, {
//       fields: [petDeworming.dewormerId],
//       references: [restockDewormer.id],
//     }),
//   };
// });
