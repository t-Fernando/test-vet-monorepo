ALTER TABLE "owner" ADD COLUMN "clinic_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "clinic_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "subscription_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "owner" ADD CONSTRAINT "owner_clinic_id_clinic_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_clinic_id_clinic_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinic"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_subscription_id_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscription"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
