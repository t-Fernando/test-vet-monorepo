import { sql } from 'drizzle-orm';
import {
  blob,
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

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

export const client = sqliteTable('client', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  contactMethid: text('contact_method', {
    enum: ['whatsapp', 'email', 'call'],
  }).notNull(),
});
export type InsertClient = typeof client.$inferInsert;
export type SelectClient = typeof client.$inferSelect;

export const petToClient = sqliteTable('pet_to_client', {
  petId: integer('pet_id')
    .references(() => pet.id)
    .notNull(),
  clientId: integer('client_id')
    .references(() => client.id)
    .notNull(),
  isPrimaryOwner: integer('is_primary_owner', { mode: 'boolean' }).notNull(),
});
export type InsertPetToClient = typeof petToClient.$inferInsert;
export type SelectPetToClient = typeof petToClient.$inferSelect;

export const creditAccount = sqliteTable('credit_account', {
  accountNumber: blob('account_number', { mode: 'bigint' }).primaryKey(),
  clientId: integer('client_id')
    .references(() => client.id)
    .notNull(),
  debt: real('debt').default(0),
  deopsit: real('deposit').default(0),
});
export type InsertCreditAccount = typeof creditAccount.$inferInsert;
export type SelectCreditAccount = typeof creditAccount.$inferSelect;

export const taxInformation = sqliteTable('tax_information', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientId: integer('client_id')
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
