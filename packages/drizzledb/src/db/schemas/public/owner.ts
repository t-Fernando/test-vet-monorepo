import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
import { publicClinic } from './';
import { relations, sql } from 'drizzle-orm';
import { user } from '../clinic';

export const publicOwner = sqliteTable(
  'public_owner',
  {
    id: text('id')
      .primaryKey()
      .$default(() => sql`uuid4()`),
    email: text('email').unique().notNull(),
    clinicId: text('clinic_id')
      .notNull()
      .references(() => publicClinic.id),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    password: text('password').notNull(),
  },
  (table) => {
    return {
      publicOwnerIdx: uniqueIndex('public_owner_idx').on(table.id),
      publicOwnerEmailIdx: uniqueIndex('public_email_idx').on(table.email),
    };
  }
);

export type InsertPublicOwner = typeof publicOwner.$inferInsert;
export type SelectPublicOwner = typeof publicOwner.$inferSelect;

export const publicOwnerRelations = relations(publicOwner, ({ one }) => {
  return {
    publicClinic: one(publicClinic, {
      fields: [publicOwner.clinicId],
      references: [publicClinic.id],
    }),
    user: one(user, {
      fields: [publicOwner.userId],
      references: [user.id],
    }),
  };
});
