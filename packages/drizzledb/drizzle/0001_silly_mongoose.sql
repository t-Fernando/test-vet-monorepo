ALTER TABLE `cart_item` RENAME COLUMN `remainingAmount` TO `remaining_amount`;--> statement-breakpoint
ALTER TABLE `payment_history` RENAME COLUMN `paymentDate` TO `payment_date`;--> statement-breakpoint
ALTER TABLE `ticket` RENAME COLUMN `createdAt` TO `created_at`;--> statement-breakpoint
ALTER TABLE `ticket` RENAME COLUMN `additionalDiscount` TO `additional_discount`;--> statement-breakpoint
ALTER TABLE `ticket` RENAME COLUMN `totalDiscount` TO `total_discount`;--> statement-breakpoint
ALTER TABLE `ticket` RENAME COLUMN `totalAmount` TO `total_amount`;