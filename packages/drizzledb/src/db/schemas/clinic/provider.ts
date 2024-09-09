// import { relations } from 'drizzle-orm';
// import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// import { medicalStudy, laboratoryOrder } from './';

// export const provider = sqliteTable('provider', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   name: text('name').notNull(), //! added notNull
// });

// export type InsertProvider = typeof provider.$inferInsert;
// export type SelectProvider = typeof provider.$inferSelect;

// export const providerRelations = relations(provider, ({ many }) => {
//   return {
//     medicalStudy: many(medicalStudy),
//     laboratoryOrder: many(laboratoryOrder),
//   };
// });
