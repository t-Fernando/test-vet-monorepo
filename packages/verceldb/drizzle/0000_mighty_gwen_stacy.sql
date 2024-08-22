DO $$ BEGIN
 CREATE TYPE "public"."medication_type" AS ENUM('medicine', 'vaccine');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."product_type" AS ENUM('simple', 'multiple');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "brand" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dewormer" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar,
	"application_period" varchar,
	"suggested_price" real,
	"categories_ids" integer[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "laboratory" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"phone" varchar,
	"email" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medication" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"satKey" varchar,
	"barCode" varchar,
	"categories_ids" integer[] NOT NULL,
	"sku" varchar,
	"image" varchar,
	"search_keywords" varchar[],
	"controlled" boolean,
	"similar_medications" varchar[],
	"active_ingredients" varchar,
	"suggested_price" real,
	"type" "medication_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"product_type" "product_type",
	"description" varchar,
	"satKey" varchar,
	"barCode" varchar,
	"categories_ids" integer[] NOT NULL,
	"sku" varchar,
	"image" varchar,
	"search_keywords" varchar[],
	"similar_products" varchar[]
);
