import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
// import { medicine } from '../clinic';

export const publicMedicine = sqliteTable('public_medicine', {
  id: text('id')
    .primaryKey()
    .$default(() => sql`uuid4()`),
  name: text('name'),
  description: text('description'),
  type: text('type', { enum: ['healing', 'maintenance'] }),
  satKey: text('sat_key'),
  barcode: text('barcode'),
  categoriesIds: text('categories_ids', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`), // not a real relation but an array of categoryIds
  sku: text('sku'),
  image: text('image'),
  searchKeywords: text('search_keywords', { mode: 'json' }).default(sql`'[]'`),
  controlled: integer('controlled', { mode: 'boolean' }),
  similarMedications: text('similar_medications', { mode: 'json' }).default(
    sql`'[]'`
  ),
  activeIngredients: text('active_ingredients'),
  suggestedPrice: real('suggested_price').default(0),
});

export type InsertPublicMedicine = typeof publicMedicine.$inferInsert;
export type SelectPublicMedicine = typeof publicMedicine.$inferSelect;

// export const publicDewormerRelations = relations(publicMedicine, ({ many }) => {
//   return {
//     medicine: many(medicine),
//   };
// });
