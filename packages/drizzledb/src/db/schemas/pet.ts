import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { petDeworming, petToClient, petVaccination } from '.';

// Pet - Client section

export type PetState = 'rescued' | 'deceased' | 'aggressiveness';

export const pet = sqliteTable('pet', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  species: text('species').notNull(),
  race: text('race').notNull(),
  size: text('size').notNull(),
  color: text('color').notNull(),
  //! changed to not null
  gender: text('gender', { enum: ['male', 'female'] }).notNull(),
  //! all dates managed as text
  birthdate: text('birthdate').notNull(), // YYYY-MM-DD HH:MM:SS.SSS
  state: text('state', { mode: 'json' })
    .$type<PetState[]>()
    .default(sql`'[]'`),
  lastDeworming: text('last_deworming'), // YYYY-MM-DD HH:MM:SS.SSS
  sterilizationDate: text('sterilization_date'), // YYYY-MM-DD HH:MM:SS.SSS
  allergies: text('allergies', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`),
  surgeries: text('surgeries', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`),
  feeding: text('feeding'),
  feedingFrequency: text('feeding_frequency'),
  environment: text('environment'),
});
export type InsertPet = typeof pet.$inferInsert;
export type SelectPet = typeof pet.$inferSelect;

export const petRelations = relations(pet, ({ many }) => {
  return {
    petDeworming: many(petDeworming),
    petVaccination: many(petVaccination),
    petToClient: many(petToClient),
  };
});
