import { relations, sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';
import { vaccine } from '../clinic';

export const publicVaccine = sqliteTable('public_vaccine', {
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
    .default(sql`'[]'`), // not a real relationship, just a list of ids
  sku: text('sku'),
  image: text('image'),
  searchKeywords: text('search_keywords', { mode: 'json' })
    .$type<string[]>()
    .default(sql`'[]'`),
  controlled: integer('controlled', { mode: 'boolean' }),
  similarVaccines: text('similar_vaccines', { mode: 'json' }).default(
    sql`'[]'`
  ),
  activeIngredients: text('active_ingredients'),
  suggestedPrice: real('suggested_price').default(0),
});

export type InsertPublicVaccine = typeof publicVaccine.$inferInsert;
export type SelectPublicVaccine = typeof publicVaccine.$inferSelect;

export const publicVaccineRelations = relations(publicVaccine, ({ many }) => {
  return {
    vaccine: many(vaccine),
  };
});
