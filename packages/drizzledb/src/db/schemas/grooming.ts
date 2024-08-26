import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { accessory, appointment } from './';

export const grooming = sqliteTable('grooming', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  serviceType: text('service_type', {
    enum: ['bath', 'haircut', 'nail_cutting'],
  }),
  name: text('name'),
  species: text('species'),
  breed: text('breed'),
  size: text('size'),
  coatType: text('coat_type'),
  accesoryId: integer('accesory_id')
    .notNull()
    .references(() => accessory.id),
  services: text('services')
    .$type<string[]>()
    .default(sql`'[]'`),
  price: real('price').default(0),
});

export const groomingRelations = relations(grooming, ({ one }) => {
  return {
    accessory: one(accessory, {
      fields: [grooming.accesoryId],
      references: [accessory.id],
    }),
  };
});

export type InsertGrooming = typeof grooming.$inferInsert;
export type SelectGrooming = typeof grooming.$inferSelect;
