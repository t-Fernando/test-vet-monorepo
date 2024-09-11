import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { appointment } from './';

export const reminder = sqliteTable('reminder', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  // appointmentId: integer('appointment_id')
  //   .references(() => appointment.id)
  //   .notNull(),
  notifyBeforeOf: text('notify_before_of'),
});

export type InsertReminder = typeof reminder.$inferInsert;
export type SelectReminder = typeof reminder.$inferSelect;

// export const reminderRelations = relations(reminder, ({ one }) => {
//   return {
//     appointment: one(appointment, {
//       fields: [reminder.appointmentId],
//       references: [appointment.id],
//     }),
//   };
// });
