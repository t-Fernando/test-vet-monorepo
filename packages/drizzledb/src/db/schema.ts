import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const publicCategoryTable = sqliteTable('public_category', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
});

export type InsertPublicCategory = typeof publicCategoryTable.$inferInsert;
export type SelectPublicCategory = typeof publicCategoryTable.$inferSelect;

export const publicMedicineTable = sqliteTable('public_medicine', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  description: text('description'),
  satKey: text('sat_key'),
  barCode: text('bar_code'),
  sku: text('sku'),
  image: text('image'), //url?
  searchKeywords: text('search_keywords').$type<string[]>(),
  controlled: integer('controlled', { mode: 'boolean' }),
  similarMedications: text('similar_medications').$type<string[]>(),
  activeIngredients: text('active_ingredients'),
  suggestedPrice: real('suggested_price'),
  categoriesId: integer('categories_id')
    .references(() => publicCategoryTable.id)
    .notNull(),
});

export type InsertPublicMedicine = typeof publicMedicineTable.$inferInsert;
export type SelectPublicMedicine = typeof publicMedicineTable.$inferSelect;

//Relations
export const publicCategoryRelations = relations(
  publicCategoryTable,
  ({ many }) => {
    return {
      medicine: many(publicMedicineTable),
    };
  }
);
export const publicMedicineRelations = relations(
  publicMedicineTable,
  ({ one }) => {
    return {
      category: one(publicCategoryTable, {
        fields: [publicMedicineTable.id],
        references: [publicCategoryTable.id],
      }),
    };
  }
);
