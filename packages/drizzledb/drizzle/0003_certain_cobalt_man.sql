CREATE TABLE `public_product` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`productType` text,
	`sat_key` text,
	`barcode` text,
	`categories_ids` text DEFAULT '[]',
	`sku` text,
	`image` text,
	`search_keywords` text DEFAULT '[]',
	`similar_products` text DEFAULT '[]'
);
