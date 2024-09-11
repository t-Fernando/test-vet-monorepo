import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { client, consultation, pet, reminder, user } from './';

export const appointment = sqliteTable('appointment', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  petId: text('pet_id')
    .references(() => pet.id)
    .notNull(),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  clinicService: text('clinic_service', {
    enum: ['clinic', 'store', 'groom', 'lodging'],
  }),
  surgeryType: text('surgery_type'),
  appointmentDate: text('appointment_date').notNull(),
  duration: text('duration').notNull(), //Date
  reason: text('reason'),
  estimatedAmount: real('estimated_amount').notNull(),
  groomingIds: text('grooming_ids')
    .$type<string[]>()
    .default(sql`'[]'`),
  status: text('status', { enum: ['pending', 'attended', 'unattended'] }),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
});

export type InsertAppointment = typeof appointment.$inferInsert;
export type SelectAppointment = typeof appointment.$inferSelect;

export const appointmentRelations = relations(appointment, ({ one, many }) => {
  return {
    pet: one(pet, {
      fields: [appointment.petId],
      references: [pet.id],
    }),
    client: one(client, {
      fields: [appointment.clientId],
      references: [client.id],
    }),
    user: one(user, {
      fields: [appointment.userId],
      references: [user.id],
    }),
    reminder: many(reminder),
    consultation: many(consultation),
  };
});
