CREATE TABLE `vaccine` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`type` text,
	`stock_count` integer DEFAULT 0,
	`stock` text DEFAULT '[]',
	`branch` text,
	`department` text,
	`rack` text,
	`public_price` real DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vaccine_idx` ON `vaccine` (`id`);