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
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dewormer" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar,
	"application_period" varchar,
	"suggested_price" real,
	"categories_ids" varchar DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "laboratory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"address" varchar,
	"phone" varchar,
	"email" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "medication" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"description" varchar,
	"satKey" varchar,
	"barCode" varchar,
	"categories_ids" varchar DEFAULT ARRAY[]::text[] NOT NULL,
	"sku" varchar,
	"image" varchar,
	"search_keywords" varchar,
	"controlled" boolean,
	"similar_medications" varchar,
	"active_ingredients" varchar,
	"suggested_price" real,
	"type" "medication_type"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"product_type" "product_type",
	"description" varchar,
	"satKey" varchar,
	"barCode" varchar,
	"brand_id" uuid NOT NULL,
	"categories_ids" varchar DEFAULT ARRAY[]::text[] NOT NULL,
	"sku" varchar,
	"image" varchar,
	"search_keywords" varchar,
	"similar_products" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_brand_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brand"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
