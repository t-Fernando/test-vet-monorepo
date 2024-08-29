import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { provider, consultation } from './';

export const laboratoryOrder = sqliteTable('laboratory_order', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  providerId: integer('provider_id')
    .references(() => provider.id)
    .notNull(),
  consultationId: integer('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  resultsPriority: text('results_priority', {
    enum: ['low', 'medium', 'high'],
  }),
  deadlineDate: text('deadline_date'), //Date
});

export type InsertLaboratoryOrder = typeof laboratoryOrder.$inferInsert;
export type SelectLaboratoryOrder = typeof laboratoryOrder.$inferSelect;

export const laboratoryOrderRelations = relations(
  laboratoryOrder,
  ({ one }) => {
    return {
      provider: one(provider, {
        fields: [laboratoryOrder.providerId],
        references: [provider.id],
      }),
      consultation: one(consultation, {
        fields: [laboratoryOrder.consultationId],
        references: [consultation.id],
      }),
    };
  }
);
