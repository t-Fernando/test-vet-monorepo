import { relations, sql } from 'drizzle-orm';
import {
  sqliteTable,
  integer,
  text,
  real,
  uniqueIndex,
  index,
} from 'drizzle-orm/sqlite-core';
// import { publicVaccine } from '../public';
// import { restockItem } from './restockItem';
// import { vaccineSimilarities } from './vaccineSimilarities';
// import { restockVaccine } from './restockVaccine';
// import { prescriptionItem } from './prescriptionItem';

// import {
//   petVaccination,
//   prescriptionItem,
//   vaccineSupplier,
//   cartItem,
// } from './';

export type Stock = {
  // not a real relation but an array of restockVaccineIds
  vaccineRestockId: number;
  stock: number;
};

export const vaccine = sqliteTable(
  'vaccine',
  {
    id: text('id')
      .primaryKey()
      .$default(() => sql`uuid4()`),
    laboratoryIds: text('laboratory_ids') // not a real relation but an array of laboratory ids
      .default(sql`'[]'`)
      .notNull(),
    // publicVaccineId
    name: text('name').notNull(),
    description: text('description'),
    type: text('type', { enum: ['healing', 'maintenance'] }),
    stockCount: integer('stock_count').default(0),
    stock: text('stock')
      .$type<Stock[]>()
      .default(sql`'[]'`),
    branch: text('branch'),
    department: text('department'),
    rack: text('rack'),
    publicPrice: real('public_price').default(0),
  },
  (table) => {
    return {
      vaccineIdx: uniqueIndex('vaccine_idx').on(table.id),
      // publicVaccineIdx
    };
  }
);

export type InsertVaccine = typeof vaccine.$inferInsert;
export type SelectVaccine = typeof vaccine.$inferSelect;

// export const vaccineRelations = relations(vaccine, ({ one, many }) => {
//   return {
//     restockItem: many(restockItem),
//     vaccineSimilarities: many(vaccineSimilarities),
//     publicVaccine: one(publicVaccine, {
//       fields: [vaccine.publicVaccineId],
//       references: [publicVaccine.id],
//     }),
//     restockVaccine: many(restockVaccine),
//     prescriptionItem: many(prescriptionItem),
//   };
// });
