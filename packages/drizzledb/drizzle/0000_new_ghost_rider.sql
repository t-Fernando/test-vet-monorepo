CREATE TABLE `public_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `public_medicine` (
	`id` text PRIMARY KEY NOT NULL,
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
