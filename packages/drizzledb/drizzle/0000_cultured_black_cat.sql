CREATE TABLE `accessory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`restock_product_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` real DEFAULT 0,
	FOREIGN KEY (`restock_product_id`) REFERENCES `restock_product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `appointment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_id` integer NOT NULL,
	`client_id` integer NOT NULL,
	`clinic_service` text,
	`surgery_type` text,
	`appointment_date` text NOT NULL,
	`duration` text NOT NULL,
	`reason` text,
	`estimated_amount` real NOT NULL,
	`grooming_ids` text DEFAULT '[]',
	`status` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cart_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ticket_id` integer NOT NULL,
	`item_id` integer NOT NULL,
	`type` text NOT NULL,
	`quantity` integer DEFAULT 0,
	`price` real DEFAULT 0,
	`debt` real DEFAULT 0,
	`deposit` real DEFAULT 0,
	`remaining_amount` real DEFAULT 0,
	FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `client` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`contact_method` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `consultation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reason` text,
	`antecedents` text,
	`treatment_administered` text,
	`duration_of_illness` text,
	`notes` text,
	`diagnosis` text,
	`therapeutic_plan` text,
	`recommendations` text,
	`created_at` text NOT NULL,
	`pet_id` integer NOT NULL,
	`client_id` integer NOT NULL,
	`appointment_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `credit_account` (
	`account_number` blob PRIMARY KEY NOT NULL,
	`client_id` integer NOT NULL,
	`debt` real DEFAULT 0,
	`deposit` real DEFAULT 0,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `damnit_exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`consultation_id` integer NOT NULL,
	`degenerative_disorders` text,
	`eating_disorders` text,
	`metabolic_disorders` text,
	`neoplastic_disorders` text,
	`infectious_diseases` text,
	`traumatic_conditions` text,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dewormer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_dewormer_id` integer,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`stock_count` integer DEFAULT 0,
	`stock` text DEFAULT '[]',
	`branch` text,
	`department` text,
	`rack` text,
	`public_price` real DEFAULT 0,
	FOREIGN KEY (`public_dewormer_id`) REFERENCES `public_dewormer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `grooming` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service_type` text,
	`name` text,
	`species` text,
	`breed` text,
	`size` text,
	`coat_type` text,
	`accesory_id` integer NOT NULL,
	`services` text DEFAULT '[]',
	`price` real DEFAULT 0,
	FOREIGN KEY (`accesory_id`) REFERENCES `accessory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `laboratory_order` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider_id` integer NOT NULL,
	`consultation_id` integer NOT NULL,
	`results_priority` text,
	`deadline_date` text,
	FOREIGN KEY (`provider_id`) REFERENCES `provider`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_file` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`medical_study_id` integer NOT NULL,
	`url` text,
	`description` text,
	FOREIGN KEY (`medical_study_id`) REFERENCES `medical_study`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medical_study` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`provider_id` integer NOT NULL,
	`consultation_id` integer NOT NULL,
	`diagnosis` text,
	`study_date` text DEFAULT (current_timestamp),
	`general_state` text,
	FOREIGN KEY (`provider_id`) REFERENCES `provider`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `medicine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_medicine_id` integer,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`stock_count` integer DEFAULT 0,
	`stock` text DEFAULT '[]',
	`branch` text,
	`department` text,
	`rack` text,
	`public_price` real DEFAULT 0,
	FOREIGN KEY (`public_medicine_id`) REFERENCES `public_medicine`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mucosal_exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`consultation_id` integer NOT NULL,
	`trachea` text,
	`lung_fields` text,
	`heart_rate` text,
	`bite` text,
	`pp` integer,
	`rd` integer,
	`rt` integer,
	`mucous` text DEFAULT '[]',
	`ganglion` text DEFAULT '[]',
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payment_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ticket_id` integer NOT NULL,
	`payment_date` text,
	`amount` real DEFAULT 0,
	FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`species` text NOT NULL,
	`race` text NOT NULL,
	`size` text NOT NULL,
	`color` text NOT NULL,
	`gender` text NOT NULL,
	`birthdate` text NOT NULL,
	`state` text DEFAULT '[]',
	`last_deworming` text,
	`sterilization_date` text,
	`allergies` text DEFAULT '[]',
	`surgeries` text DEFAULT '[]',
	`feeding` text,
	`feeding_frequency` text,
	`environment` text
);
--> statement-breakpoint
CREATE TABLE `pet_deworming` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`id_pet` integer NOT NULL,
	`restock_dewormer_id` integer NOT NULL,
	`application_date` text,
	FOREIGN KEY (`id_pet`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`restock_dewormer_id`) REFERENCES `restock_dewormer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pet_to_client` (
	`pet_id` integer NOT NULL,
	`client_id` integer NOT NULL,
	`is_primary_owner` integer NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pet_vaccination` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_id` integer NOT NULL,
	`restock_vaccine_id` integer NOT NULL,
	`application_date` text,
	`observations` text,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`restock_vaccine_id`) REFERENCES `restock_vaccine`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `physical_exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`consultation_id` integer NOT NULL,
	`mental_state` text,
	`weight` real,
	`dehydration` real,
	`mucous` text,
	`tllc` text,
	`rd` integer,
	`rt` integer,
	`ln` text,
	`fr` integer,
	`fc` integer,
	`cp` text,
	`pp` integer,
	`cc` integer,
	`pa` text,
	`pulse` text,
	`temperature` text,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prescription` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`consultation_id` integer NOT NULL,
	`veterinarian_id` integer NOT NULL,
	`medical_instructions` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`veterinarian_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prescription_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prescription_id` integer NOT NULL,
	`item_id` integer NOT NULL,
	`type` text NOT NULL,
	`amount` real DEFAULT 0,
	`frequency` text,
	`duration` text,
	`recommendations` text,
	FOREIGN KEY (`prescription_id`) REFERENCES `prescription`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_product_id` integer,
	`name` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'other',
	`stock_count` integer DEFAULT 0,
	`stock` text DEFAULT '[]',
	`branch` text,
	`department` text,
	`rack` text,
	`public_price` real DEFAULT 0,
	FOREIGN KEY (`public_product_id`) REFERENCES `public_product`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `provider` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reminder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`appointment_id` integer NOT NULL,
	`notify_before_of` text,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `restock` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`supplier_id` integer NOT NULL,
	`products` integer DEFAULT '[]',
	`restock_date` text,
	`total` real DEFAULT 0,
	FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `restock_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item_id` integer NOT NULL,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `supplier` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text,
	`phone` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `tax_information` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_id` integer NOT NULL,
	`address` text NOT NULL,
	`postal_code` text NOT NULL,
	`state` text NOT NULL,
	`city` text NOT NULL,
	`residential_complex` text NOT NULL,
	`rfc` text NOT NULL,
	`billing_email` text NOT NULL,
	`deduction_type` text NOT NULL,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ticket` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_id` integer NOT NULL,
	`consultation_id` integer NOT NULL,
	`created_at` text DEFAULT current_timestamp NOT NULL,
	`additional_discount` real DEFAULT 0,
	`total_discount` real DEFAULT 0,
	`total_amount` real DEFAULT 0,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`phone` text NOT NULL,
	`role` text NOT NULL,
	`professional_license` text,
	`specialty` text,
	`modules` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `vaccine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_vaccine_id` integer,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`stock_count` integer DEFAULT 0,
	`stock` text DEFAULT '[]',
	`branch` text,
	`department` text,
	`rack` text,
	`public_price` real DEFAULT 0,
	FOREIGN KEY (`public_vaccine_id`) REFERENCES `public_vaccine`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `valve_and_ohthalmic_exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`consultation_id` integer NOT NULL,
	`abdomen` text,
	`skin` text,
	`hair` text,
	`valve` text DEFAULT '[]',
	`left_eye` text DEFAULT '[]',
	`right_eye` text DEFAULT '[]',
	`left_ear` text DEFAULT '[]',
	`right_ear` text DEFAULT '[]',
	FOREIGN KEY (`consultation_id`) REFERENCES `consultation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `public_brand` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `public_category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `public_clinic` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`domain` text NOT NULL,
	`services` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `public_dewormer` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`application_period` text,
	`suggested_price` real DEFAULT 0,
	`categories_ids` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE TABLE `public_laboratory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`address` text,
	`phone` text,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `public_medicine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`type` text,
	`sat_key` text,
	`barcode` text,
	`categories_ids` text DEFAULT '[]',
	`sku` text,
	`image` text,
	`search_keywords` text DEFAULT '[]',
	`controlled` integer,
	`similar_medications` text DEFAULT '[]',
	`active_ingredients` text,
	`suggested_price` real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `public_owner` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`clinic_id` integer NOT NULL,
	`password` text NOT NULL,
	FOREIGN KEY (`clinic_id`) REFERENCES `public_clinic`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `public_payment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clinic_id` integer NOT NULL,
	`subscription_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`end_date` text NOT NULL,
	`billing_period` text NOT NULL,
	`total_amount` real NOT NULL,
	FOREIGN KEY (`clinic_id`) REFERENCES `public_clinic`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subscription_id`) REFERENCES `public_subscription`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `public_product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text DEFAULT 'other',
	`sat_key` text,
	`brand_id` integer NOT NULL,
	`barcode` text,
	`categories_ids` text DEFAULT '[]',
	`sku` text,
	`image` text,
	`search_keywords` text DEFAULT '[]',
	`similar_products` text DEFAULT '[]',
	FOREIGN KEY (`brand_id`) REFERENCES `public_brand`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `public_subscription` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`licenses` integer NOT NULL,
	`monthly_price` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `public_vaccine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`type` text,
	`sat_key` text,
	`barcode` text,
	`categories_ids` text DEFAULT '[]',
	`sku` text,
	`image` text,
	`search_keywords` text DEFAULT '[]',
	`controlled` integer,
	`similar_vaccines` text DEFAULT '[]',
	`active_ingredients` text,
	`suggested_price` real DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dewormer_idx` ON `dewormer` (`id`);--> statement-breakpoint
CREATE INDEX `public_dewormer_idx` ON `dewormer` (`public_dewormer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `medicine_idx` ON `medicine` (`id`);--> statement-breakpoint
CREATE INDEX `public_medicine_idx` ON `medicine` (`public_medicine_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `product_idx` ON `product` (`id`);--> statement-breakpoint
CREATE INDEX `public_product_idx` ON `product` (`public_product_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx` ON `user` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `vaccine_idx` ON `vaccine` (`id`);--> statement-breakpoint
CREATE INDEX `poblic_vaccine_idx` ON `vaccine` (`public_vaccine_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `public_owner_email_unique` ON `public_owner` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `public_owner_idx` ON `public_owner` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `public_email_idx` ON `public_owner` (`email`);