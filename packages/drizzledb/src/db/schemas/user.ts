import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { appointment } from './appointment';
import { consultation } from './consultation';

export type UserModules = 'clinic' | 'cash_desk' | 'agenda' | 'consultations';

export const user = sqliteTable(
  'user',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    phone: text('phone').notNull(),
    role: text('role', {
      enum: ['owner', 'vet', 'cashier', 'stylist'],
    }).notNull(),
    professionalLicense: text('professional_license'),
    specialty: text('specialty'),
    modules: text('modules', { mode: 'json' })
      .$type<UserModules[]>()
      .default(sql`'[]'`),
  },
  (table) => {
    return {
      idx: uniqueIndex('idx').on(table.id),
      emailIdx: uniqueIndex('email_idx').on(table.email),
    };
  }
);

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

//TODO: relation to Consultation y Prescription(with userId? ask Dan)

export const userRelations = relations(user, ({ many }) => {
  return {
    appointment: many(appointment),
    consultation: many(consultation),
  };
});
