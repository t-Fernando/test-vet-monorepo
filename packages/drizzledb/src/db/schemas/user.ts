import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
      idx: index('idx').on(table.id),
      emailIdx: index('email_idx').on(table.email),
    };
  }
);

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;

//TODO: relation to Appointment, Consultation y Prescription(with userId? ask Dan)
