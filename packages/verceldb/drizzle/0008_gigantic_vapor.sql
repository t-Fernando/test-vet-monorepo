CREATE INDEX IF NOT EXISTS "idx" ON "owner" USING btree ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailkey" ON "owner" USING btree ("email");