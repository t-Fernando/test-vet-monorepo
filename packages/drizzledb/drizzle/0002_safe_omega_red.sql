CREATE TABLE `public_dewormer` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`application_period` text,
	`suggested_price` real DEFAULT 0,
	`categories_ids` text DEFAULT '[]'
);
