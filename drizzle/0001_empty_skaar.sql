CREATE TABLE `access_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(10) NOT NULL,
	`accessorName` varchar(128) NOT NULL,
	`organization` varchar(128) NOT NULL,
	`ipAddress` varchar(64),
	`userAgent` text,
	`accessedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_logs_id` PRIMARY KEY(`id`)
);
