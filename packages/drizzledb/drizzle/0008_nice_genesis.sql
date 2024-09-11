CREATE TABLE `public_clinic` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`domain` text NOT NULL,
	`services` text DEFAULT '[]'
);
