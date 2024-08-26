ALTER TABLE `dewormer` ADD `laboratoryId` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `dewormer` ADD `dewormerId` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `medicine` ADD `medicine_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD `product_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `vaccine` ADD `vaccine_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `vaccine` ADD `laboratoryId` integer NOT NULL;