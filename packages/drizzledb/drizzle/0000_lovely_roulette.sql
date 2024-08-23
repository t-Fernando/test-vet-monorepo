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
CREATE TABLE `grooming` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service_type` text,
	`name` text,
	`species` text,
	`breed` text,
	`size` text,
	`coat_type` text,
	`services` text DEFAULT '[]',
	`price` real DEFAULT 0
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
	`application_date` text,
	FOREIGN KEY (`id_pet`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action
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
	`application_date` text,
	`observations` text,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action
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
CREATE TABLE `reminder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`appointment_id` integer NOT NULL,
	`notify_before_of` text,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE no action
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
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `idx` ON `user` (`id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);