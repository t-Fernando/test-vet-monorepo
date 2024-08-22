CREATE TABLE IF NOT EXISTS "owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);
