import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// Public - Category
export const publicCategoryTable = pgTable('public_category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});

export type InsertPublicCategory = typeof publicCategoryTable.$inferInsert;
export type SelectPublicCategory = typeof publicCategoryTable.$inferSelect;

// Public - Brand
export const publicBrandTable = pgTable('public_brand', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});

export type InsertPublicBrand = typeof publicBrandTable.$inferInsert;
export type SelectPublicBrand = typeof publicBrandTable.$inferSelect;

// Public - Laboratory
export const publicLaboratory = pgTable('public_laboratory', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  address: varchar('address'),
  phone: varchar('phone'),
  email: varchar('email'),
});

export type InsertPublicLaboratory = typeof publicLaboratory.$inferInsert;
export type SelectPublicLaboratory = typeof publicLaboratory.$inferSelect;

// Public - Medicine
export const publicMedicineTable = pgTable('public_medicine', {
  id: serial('id').primaryKey(),
  name: varchar('name'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  categoriesId: integer('categories_id')
    .references(() => publicCategoryTable.id)
    .notNull(),
  sku: varchar('sku'),
  image: varchar('image'), //! no image type in drizzle-orm, using varchar
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  controlled: boolean('controlled'),
  similarMedications: varchar('similar_medications').$type<string[]>(),
  activeIngredients: varchar('active_ingredients'),
  suggestedPrice: real('suggested_price'),
});

export type InsertPublicMedicine = typeof publicMedicineTable.$inferInsert;
export type SelectPublicMedicine = typeof publicMedicineTable.$inferSelect;
