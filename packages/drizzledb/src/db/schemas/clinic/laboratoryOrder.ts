import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { provider, consultation } from './';

export const laboratoryOrder = sqliteTable('laboratory_order', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  providerId: text('provider_id')
    .references(() => provider.id)
    .notNull(),
  consultationId: text('consultation_id')
    .references(() => consultation.id)
    .notNull(),
  resultsPriority: text('results_priority', {
    enum: ['low', 'medium', 'high'],
  }),
  observations: text('observations'),
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
