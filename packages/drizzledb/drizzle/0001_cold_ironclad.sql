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
	`amount` real DEFAULT 0,
	`frequency` text,
	`duration` text,
	`recommendations` text,
	`type` text,
	FOREIGN KEY (`prescription_id`) REFERENCES `prescription`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `provider` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
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
