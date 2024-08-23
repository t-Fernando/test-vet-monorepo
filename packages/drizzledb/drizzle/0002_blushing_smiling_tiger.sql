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
CREATE TABLE `reminder` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`appointment_id` integer NOT NULL,
	`notify_before_of` text,
	FOREIGN KEY (`appointment_id`) REFERENCES `appointment`(`id`) ON UPDATE no action ON DELETE no action
);
