-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Album` (
	`id` varchar(191) NOT NULL,
	`title` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`artistId` varchar(191) NOT NULL,
	`imageId` varchar(191) NOT NULL,
	`rating` int NOT NULL,
	`released` datetime(3) NOT NULL,
	`description` varchar(191) NOT NULL,
	CONSTRAINT `Album_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Artist` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`imageId` varchar(191) NOT NULL,
	`rating` int NOT NULL,
	CONSTRAINT `Artist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Image` (
	`id` varchar(191) NOT NULL,
	`url` varchar(191) NOT NULL,
	CONSTRAINT `Image_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Song` (
	`id` varchar(191) NOT NULL,
	`title` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`albumId` varchar(191) NOT NULL,
	`artistId` varchar(191) NOT NULL,
	`rating` int NOT NULL,
	`released` datetime(3) NOT NULL,
	`description` varchar(191) NOT NULL,
	CONSTRAINT `Song_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Spotify` (
	`id` varchar(191) NOT NULL,
	`accessToken` varchar(191) NOT NULL,
	`refreshToken` varchar(191) NOT NULL,
	CONSTRAINT `Spotify_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Transactions` (
	`id` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`amount` int NOT NULL,
	`name` varchar(191) NOT NULL,
	CONSTRAINT `Transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `Album_artistId_idx` ON `Album` (`artistId`);--> statement-breakpoint
CREATE INDEX `Album_imageId_idx` ON `Album` (`imageId`);--> statement-breakpoint
CREATE INDEX `Artist_imageId_idx` ON `Artist` (`imageId`);--> statement-breakpoint
CREATE INDEX `Song_albumId_idx` ON `Song` (`albumId`);--> statement-breakpoint
CREATE INDEX `Song_artistId_idx` ON `Song` (`artistId`);
*/