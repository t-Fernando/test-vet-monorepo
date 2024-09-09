CREATE TABLE `public_owner` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `public_owner_email_unique` ON `public_owner` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `public_owner_idx` ON `public_owner` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `public_email_idx` ON `public_owner` (`email`);