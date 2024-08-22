DO $$ BEGIN
 CREATE TYPE "public"."billing_period" AS ENUM('monthly', 'annual');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"end_date" timestamp,
	"billing_period" "billing_period",
	"total_amount" real
);
