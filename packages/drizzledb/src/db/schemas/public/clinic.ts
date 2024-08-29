import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { publicOwner, publicPayment } from './';

export type ClinicServiceType = 'clinic' | 'store' | 'groom' | 'lodgining';

export const publicClinic = sqliteTable('public_clinic', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  domain: text('domain').notNull(),
  services: text('services', { mode: 'json' })
    .$type<ClinicServiceType[]>()
    .default(sql`'[]'`),
});

export type InsertPublicClinic = typeof publicClinic.$inferInsert;
export type SelectPublicClinic = typeof publicClinic.$inferSelect;

export const publicClinicRelations = relations(publicClinic, ({ many }) => {
  return {
    publicOwner: many(publicOwner),
    publicPayment: many(publicPayment),
  };
});
