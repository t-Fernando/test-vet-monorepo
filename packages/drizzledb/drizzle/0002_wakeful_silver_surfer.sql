CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`phone` text NOT NULL,
	`role` text NOT NULL,
	`professional_license` text,
	`specialty` text,
	`modules` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `idx` ON `user` (`id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);