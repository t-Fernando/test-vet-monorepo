CREATE TABLE IF NOT EXISTS "subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"licenses" integer NOT NULL,
	"monthly_price" real NOT NULL
);
