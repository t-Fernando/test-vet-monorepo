CREATE TABLE `client` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`contact_method` text NOT NULL
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
CREATE TABLE `pet_vaccination` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pet_id` integer NOT NULL,
	`application_date` text,
	`observations` text,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action
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
