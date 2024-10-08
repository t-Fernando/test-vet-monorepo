import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import {
  appointment,
  client,
  laboratoryOrder,
  medicalStudy,
  mucosalExam,
  pet,
  physicalExam,
  prescription,
  ticket,
  user,
  valveAndOphthalmicExam,
} from './';

export const consultation = sqliteTable('consultation', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  reason: text('reason'),
  antecedents: text('antecedents'),
  treatmentAdministered: text('treatment_administered'),
  durationOfIllness: text('duration_of_illness'),
  notes: text('notes'),
  diagnosis: text('diagnosis'),
  therapeuticPlan: text('therapeutic_plan'),
  recommendations: text('recommendations'),
  createdAt: text('created_at').notNull(), //Date
  petId: text('pet_id')
    .references(() => pet.id)
    .notNull(),
  clientId: text('client_id')
    .references(() => client.id)
    .notNull(),
  appointmentId: text('appointment_id')
    .references(() => appointment.id)
    .notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
});
export type InsertConsultation = typeof consultation.$inferInsert;
export type SelectConsultation = typeof consultation.$inferSelect;

export const consultationRelations = relations(
  consultation,
  ({ one, many }) => {
    return {
      pet: one(pet, {
        fields: [consultation.petId],
        references: [pet.id],
      }),
      client: one(client, {
        fields: [consultation.clientId],
        references: [client.id],
      }),
      appointment: one(appointment, {
        fields: [consultation.appointmentId],
        references: [appointment.id],
      }),
      user: one(user, {
        fields: [consultation.userId],
        references: [user.id],
      }),
      ticket: many(ticket),
      physicalExam: many(physicalExam),
      damnitExam: many(physicalExam),
      valveAndOphthalmicExam: many(valveAndOphthalmicExam),
      mucosalExam: many(mucosalExam),
      laboratoryOrder: many(laboratoryOrder),
      medicalStudy: many(medicalStudy),
      prescription: one(prescription, {
        fields: [consultation.id],
        references: [prescription.consultationId],
      }),
    };
  }
);
