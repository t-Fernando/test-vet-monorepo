CREATE TABLE `public_payment` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`end_date` text NOT NULL,
	`billing_period` text NOT NULL,
	`total_amount` real NOT NULL
);
