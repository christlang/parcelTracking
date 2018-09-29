
-- password is "test" (bcypt, 10 salt-rounds)

INSERT INTO 'Users' (`firstname`, `lastname`, `username`, `password`) VALUES
  (
    'test1',
    'test',
    'test',
    '$2a$10$ZweZbb3TIOtJqHW4O9.ZD.2.Ht7klIYNvlHdDsGyKtp4Von75uurK'
  ), (
    'test2',
    'test',
    'test',
    '$2a$10$9BlV00cMao5.YJlcIbVvu.yVuxwFW3WJddEn85yEwFLFZjjP4P4xK'
  );