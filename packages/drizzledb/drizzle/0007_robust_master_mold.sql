CREATE TABLE `public_subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`licenses` integer NOT NULL,
	`monthly_price` real NOT NULL
);
