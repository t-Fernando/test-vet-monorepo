import {
  boolean,
  pgTable,
  real,
  varchar,
  pgEnum,
  serial,
  integer,
  timestamp,
  index,
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
//! removed vaccine table and added type field here
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

export const owner = pgTable(
  'owner',
  {
    id: serial('id').primaryKey(),
    email: varchar('email').notNull(),
    clinicId: integer('clinic_id')
      .references(() => clinic.id)
      .notNull(),
    password: varchar('password').notNull(),
  },
  (table) => {
    return {
      idx: index('idx').on(table.id),
      emailIdx: index('emailkey').on(table.email),
    };
  }
);
export type InsertOwner = typeof owner.$inferInsert;
export type SelectOwner = typeof owner.$inferSelect;

export const clinicServices = pgEnum('clininc_services', [
  'clinic',
  'store',
  'groom',
  'lodging',
]);
export const clinic = pgTable('clinic', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  domain: varchar('name').notNull(),
  services: clinicServices('services').array(),
});
export type InsertClinic = typeof clinic.$inferInsert;
export type SelectClinic = typeof clinic.$inferSelect;

export const subscription = pgTable('subscription', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  licenses: integer('licenses').notNull(),
  monthlyPrice: real('monthly_price').notNull(),
});
export type InsertSubscription = typeof subscription.$inferInsert;
export type SelectSubscription = typeof subscription.$inferSelect;

export const billingPeriod = pgEnum('billing_period', ['monthly', 'annual']);
export const payment = pgTable('payment', {
  id: serial('id').primaryKey(),
  clinicId: integer('clinic_id')
    .references(() => clinic.id)
    .notNull(),
  subscriptionId: integer('subscription_id')
    .references(() => subscription.id)
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  endDate: timestamp('end_date', { mode: 'date' }),
  billingPeriod: billingPeriod('billing_period'),
  totalAmount: real('total_amount'),
});
export type InsertPayment = typeof payment.$inferInsert;
export type SelectPayment = typeof payment.$inferSelect;
