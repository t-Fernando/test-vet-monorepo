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

export const category = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});
export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;

export const brand = pgTable('brand', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
});
export type InsertBrand = typeof brand.$inferInsert;
export type SelectBrand = typeof brand.$inferSelect;

export const laboratory = pgTable('laboratory', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  address: varchar('address'),
  phone: varchar('phone'),
  email: varchar('email'),
});
export type InsertLaboratory = typeof laboratory.$inferInsert;
export type SelectLaboratory = typeof laboratory.$inferSelect;

export const medicationType = pgEnum('medication_type', [
  'medicine',
  'vaccine',
]);
export const medication = pgTable('medication', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  controlled: boolean('controlled'),
  similarMedications: varchar('similar_medications').$type<string[]>(),
  activeIngredients: varchar('active_ingredients'),
  suggestedPrice: real('suggested_price'),
  type: medicationType('type').notNull(),
});
export type InsertMedication = typeof medication.$inferInsert;
export type SelectMedication = typeof medication.$inferSelect;

export const productType = pgEnum('product_type', ['simple', 'multiple']);
export const product = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  productType: productType('product_type'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  brandId: uuid('brand_id')
    .references(() => brand.id)
    .notNull(),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').$type<string[]>(),
  similarProducts: varchar('similar_products').$type<string[]>(),
});
export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export const dewormer = pgTable('dewormer', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type'),
  applicationPeriod: varchar('application_period'),
  suggestedPrice: real('suggested_price'),
  categoriesIds: varchar('categories_ids')
    .$type<string[]>()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});
export type InsertDewormer = typeof dewormer.$inferInsert;
export type SelectDewormer = typeof dewormer.$inferSelect;

//Subscription management
