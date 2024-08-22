import {
  boolean,
  pgTable,
  real,
  varchar,
  pgEnum,
  serial,
  integer,
} from 'drizzle-orm/pg-core';

// Common section

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(), //! changed to not null
});
export type InsertCategory = typeof category.$inferInsert;
export type SelectCategory = typeof category.$inferSelect;

export const brand = pgTable('brand', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(), //! changed to not null
});
export type InsertBrand = typeof brand.$inferInsert;
export type SelectBrand = typeof brand.$inferSelect;

export const laboratory = pgTable('laboratory', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(), //! changed to not null
  address: varchar('address').notNull(), //! changed to not null
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
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(), //! changed to not null
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  categoriesIds: integer('categories_ids').array().notNull(),
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').array(),
  controlled: boolean('controlled'),
  similarMedications: varchar('similar_medications').array(),
  activeIngredients: varchar('active_ingredients'),
  suggestedPrice: real('suggested_price'),
  type: medicationType('type').notNull(),
});
export type InsertMedication = typeof medication.$inferInsert;
export type SelectMedication = typeof medication.$inferSelect;

export const productType = pgEnum('product_type', ['simple', 'multiple']);
export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  productType: productType('product_type'),
  description: varchar('description'),
  satKey: varchar('satKey'),
  barCode: varchar('barCode'),
  brandId: integer('brand_id')
    .references(() => brand.id)
    .notNull(),
  categoriesIds: integer('categories_ids').array().notNull(),
  sku: varchar('sku'),
  image: varchar('image'),
  searchKeywords: varchar('search_keywords').array(),
  similarProducts: varchar('similar_products').array(),
});
export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;

export const dewormer = pgTable('dewormer', {
  id: serial('id').primaryKey(),
  type: varchar('type').notNull(), //! changed to not null
  applicationPeriod: varchar('application_period'),
  suggestedPrice: real('suggested_price'),
  categoriesIds: integer('categories_ids').array().notNull(),
});
export type InsertDewormer = typeof dewormer.$inferInsert;
export type SelectDewormer = typeof dewormer.$inferSelect;

//Subscription management
