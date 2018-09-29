INSERT INTO `Parcels`
  (
    `orderInfo`,
    `destination`,
    `receiver`,
    `orderDate`,
    `itemInCentral`,
    `sentFromCentral`,
    `sentFromCentralWith`,
    `arrivedAtDestination`,
    `comment`,
    `itemProcessed`
  ) VALUES
  (
    'carburettor',
    'Mbagathi',
    'garage',
    '2018-08-29 00:00:00:000',
    1,
    '2018-08-30 00:00:00:000',
    'Frank',
    '2018-10-30 00:00:00:000',
    'example-data',
    0
  ),(
    'transistor',
    'Mbagathi',
    'Benjamin',
    '2018-08-02 00:00:00:000',
    1,
    '2018-09-24 00:00:00:000',
    'Axel',
    '2018-10-30 00:00:00:000',
    'example-data',
    0
  ),(
    'Raspberry Pi',
    'Arua',
    'Martin',
    '2018-08-02 00:00:00:000',
    0,
    null,
    '',
    null,
    'example-data',
    0
  ),(
    'WLAN-Antenna',
    'Aru',
    'Hans',
    '2018-08-02 00:00:00:000',
    0,
    null,
    '',
    null,
    'example-data',
    0
  ),(
    'turbine blade',
    'Tinderet',
    'Siggi',
    '2018-08-02 00:00:00:000',
    1,
    '2018-08-15 00:00:00:000',
    'Uwe',
    '2018-08-30 00:00:00:000',
    'example-data',
    1
  );