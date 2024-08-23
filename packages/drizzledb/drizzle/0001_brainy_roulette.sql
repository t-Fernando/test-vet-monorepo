CREATE TABLE `pet_to_client` (
	`pet_id` integer NOT NULL,
	`client_id` integer NOT NULL,
	`is_primary_owner` integer NOT NULL,
	FOREIGN KEY (`pet_id`) REFERENCES `pet`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON UPDATE no action ON DELETE no action
);
