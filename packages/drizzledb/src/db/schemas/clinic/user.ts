import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

import { appointment, consultation, prescription } from './';
import { publicOwner } from '../public';

export type UserModules = 'clinic' | 'cash_desk' | 'agenda' | 'consultations';

export const user = sqliteTable(
  'user',
  {
    id: text('id')
      .primaryKey()
      .$default(() => sql`uuid4()`),
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

export const userRelations = relations(user, ({ one, many }) => {
  return {
    publicOwner: one(publicOwner, {
      fields: [user.id],
      references: [publicOwner.userId],
    }),
    appointment: many(appointment),
    consultation: many(consultation),
    prescription: one(prescription, {
      fields: [user.id],
      references: [prescription.veterinarianId],
    }),
  };
});
