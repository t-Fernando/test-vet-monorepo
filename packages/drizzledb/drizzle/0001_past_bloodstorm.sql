CREATE TABLE `public_vaccine` (
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
	`similar_vaccines` text DEFAULT '[]',
	`active_ingredients` text,
	`suggested_price` real DEFAULT 0
);
