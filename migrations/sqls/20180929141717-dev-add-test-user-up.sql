
-- password is "test" (bcypt, 10 salt-rounds)

INSERT INTO 'Users' (`firstname`, `lastname`, `username`, `password`) VALUES
  (
    'test',
    'test',
    'test1',
    '$2a$10$yeDornCgneGogOxwHY963Oe/T46kG4VKMpEu9uZqBi//Vme4Q0y7i'
  ), (
    'test',
    'test',
    'test2',
    '$2a$10$wgn6cQToxqLSP0zyeWicN.6IDxq/Ot/iz7wxPpaBV7tLtVrk4ftLO'
  ), (
    'test',
    'test',
    'test',
    '$2a$10$9BlV00cMao5.YJlcIbVvu.yVuxwFW3WJddEn85yEwFLFZjjP4P4xK'
  );