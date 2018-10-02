--
-- Sqlite does not support to drop
-- a column -> so workaround
-- 1) rename table
-- 2) create new table with less columns
-- 3) copy data into new created table
-- 4) drop old table
--
ALTER TABLE `Parcels` RENAME TO `Parcels.old`;

create table Parcels
(
  id                   INTEGER PRIMARY KEY,
  orderInfo            TEXT    default '',
  destination          TEXT    default '',
  receiver             TEXT    default '',
  orderDate            DATE    default null,
  itemInCentral        INTEGER default 0,
  sentFromCentral      DATE    default null,
  sentFromCentralWith  TEXT    default TEXT,
  arrivedAtDestination DATE    default null,
  comment              TEXT    default TEXT
);


INSERT INTO Parcels (
    id,
    orderInfo,
    destination,
    receiver,
    orderDate,
    itemInCentral,
    sentFromCentral,
    sentFromCentralWith,
    arrivedAtDestination,
    comment
  )
  SELECT id,
    orderInfo,
    destination,
    receiver,
    orderDate,
    itemInCentral,
    sentFromCentral,
    sentFromCentralWith,
    arrivedAtDestination,
    comment
  FROM `Parcels.old`;

DROP TABLE `Parcels.old`;