DO $$ BEGIN
 CREATE TYPE "public"."clininc_services" AS ENUM('clinic', 'store', 'groom', 'lodging');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clinic" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"services" clininc_services[]
);
