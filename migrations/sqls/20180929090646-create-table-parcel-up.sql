CREATE TABLE `Parcels` (
  id INTEGER PRIMARY KEY,
  orderInfo TEXT DEFAULT '',
  destination TEXT DEFAULT '',
  receiver TEXT DEFAULT '',
  orderDate DATE DEFAULT null,
  itemInCentral INTEGER DEFAULT 0,
  sentFromCentral DATE DEFAULT null,
  sentFromCentralWith TEXT DEFAULT TEXT,
  arrivedAtDestination DATE DEFAULT null,
  comment TEXT DEFAULT TEXT,
  itemProcessed INTEGER DEFAULT 0
);