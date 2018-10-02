ALTER TABLE `Parcels` ADD COLUMN `itemProcessed` INTEGER;

UPDATE `Parcels` SET itemProcessed = 0;