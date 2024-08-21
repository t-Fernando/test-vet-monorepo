import {
  boolean,
  pgTable,
  real,
  uuid,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Common section

export const categoryTable = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});
export type InsertCategory = typeof categoryTable.$inferInsert;
export type SelectCategory = typeof categoryTable.$inferSelect;

export const brandTable = pgTable('brand', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});
export type InsertBrand = typeof brandTable.$inferInsert;
export type SelectBrand = typeof brandTable.$inferSelect;

export const laboratoryTable = pgTable('laboratory', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  address: varchar('address'),
  phone: varchar('phone'),
  email: varchar('email'),
});
export type InsertLaboratory = typeof laboratoryTable.$inferInsert;
export type SelectLaboratory = typeof laboratoryTable.$inferSelect;

export const medicineTable = pgTable('medicine', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // no reference
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  controlled: boolean('controlled'),
  similarMedications: varchar('similar_medications').$type<string[]>(),
  activeIngredients: varchar('active_ingredients'),
  suggestedPrice: real('suggested_price'),
});
export type InsertMedicine = typeof medicineTable.$inferInsert;
export type SelectMedicine = typeof medicineTable.$inferSelect;

//! Vaccine is the same as Medicine, add type field on Medicine instead?
export const vaccineTable = pgTable('vaccine', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // no reference
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  controlled: boolean('controlled'),
  similarVaccineds: varchar('similar_vaccines').$type<string[]>(),
  activeIngredients: varchar('active_ingredients'),
  suggestedPrice: real('suggested_price'),
});
export type InsertVaccine = typeof vaccineTable.$inferInsert;
export type SelectVaccine = typeof vaccineTable.$inferSelect;

export const productType = pgEnum('product_type', ['simple', 'multiple']);
export const productTable = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  productType: productType('product_type'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  brandId: uuid('brand_id')
    .references(() => brandTable.id)
    .notNull(),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // no reference
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  similarProducts: varchar('similar_products').$type<string[]>(),
});
export type InsertProduct = typeof productTable.$inferInsert;
export type SelectProduct = typeof productTable.$inferSelect;

export const dewormerTable = pgTable('dewormer', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type'),
  applicationPeriod: varchar('application_period'),
  suggestedPrice: real('suggested_price'),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`), // no reference
});
export type InsertDewormer = typeof dewormerTable.$inferInsert;
export type SelectDewormer = typeof dewormerTable.$inferSelect;

//Subscription management
