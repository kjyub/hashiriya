-- Insert initial Game data
INSERT INTO public.games (code, name, image_url, tags) VALUES
('ACC', 'Assetto Corsa Competizione', '/game-images/assetto-corsa-competizione.jpeg', ARRAY['sim', 'racing']),
('ACE', 'Assetto Corsa Evo', '/game-images/assetto-corsa-evo.jpeg', ARRAY['sim', 'racing']),
('AC', 'Assetto Corsa', '/game-images/assetto-corsa.jpeg', ARRAY['sim', 'racing']),
('AMS2', 'Automobilista 2', '/game-images/automobilista2.jpeg', ARRAY['sim', 'racing']),
('BeamNG', 'BeamNG.drive', '/game-images/beamng-drive.jpeg', ARRAY['simulation', 'driving']),
('DR2', 'Dirt Rally 2.0', '/game-images/dirt-rally-2.jpeg', ARRAY['rally', 'racing']),
('ETS2', 'Euro Truck Simulator 2', '/game-images/euro-truck-2.jpeg', ARRAY['simulation', 'trucking']),
('F125', 'F1 2025', '/game-images/f1-25.jpeg', ARRAY['f1', 'racing']),
('FH5', 'Forza Horizon 5', '/game-images/forza-horizon-5.jpeg', ARRAY['arcade', 'racing', 'open-world']),
('FM', 'Forza Motorsport', '/game-images/forza-motorsport.jpeg', ARRAY['sim-cade', 'racing']),
('ID', 'Initial D', '/game-images/initial-d.jpeg', ARRAY['arcade', 'racing', 'anime']),
('iRacing', 'iRacing', '/game-images/iracing.jpeg', ARRAY['sim', 'esports']),
('LMU', 'Le Mans Ultimate', '/game-images/le-mans-ultimate.jpeg', ARRAY['endurance', 'racing']),
('PC2', 'Project CARS 2', '/game-images/project-cars-2.jpeg', ARRAY['sim-cade', 'racing']),
('R3E', 'RaceRoom Racing Experience', '/game-images/raceroom.jpeg', ARRAY['sim', 'racing']),
('RF2', 'rFactor 2', '/game-images/rf2.jpeg', ARRAY['sim', 'racing']),
('WRCG', 'WRC Generations', '/game-images/wrc-generations.jpeg', ARRAY['rally', 'racing']),
('WRC', 'WRC', '/game-images/wrc.jpeg', ARRAY['rally', 'racing']);

WITH inserted_parents AS (
  INSERT INTO public.tracks (code, name, country) VALUES
  ('NUR', 'Nürburgring', 'Germany'),
  ('SPA', 'Spa-Francorchamps', 'Belgium'),
  ('MNZ', 'Monza', 'Italy'),
  ('SIL', 'Silverstone', 'United Kingdom'),
  ('SUZ', 'Suzuka Circuit', 'Japan'),
  ('LSEC', 'WeatherTech Raceway Laguna Seca', 'USA'),
  ('DAY', 'Daytona International Speedway', 'USA'),
  ('BATH', 'Mount Panorama Circuit (Bathurst)', 'Australia'),
  ('SAR', 'Circuit de la Sarthe (Le Mans)', 'France'),
  ('COTA', 'Circuit of the Americas', 'USA'),
  ('INT', 'Autódromo José Carlos Pace (Interlagos)', 'Brazil'),
  ('RBR', 'Red Bull Ring', 'Austria'),
  ('BRH', 'Brands Hatch', 'United Kingdom'),
  ('RDA', 'Road Atlanta', 'USA'),
  ('ZAN', 'Circuit Zandvoort', 'Netherlands'),
  ('IMO', 'Autodromo Internazionale Enzo e Dino Ferrari (Imola)', 'Italy')
  RETURNING id, code
)
INSERT INTO public.tracks (parent_id, code, name, country)
SELECT
  t.parent_id,                                   -- parent_id
  t.code,                                        -- code
  CASE t.code                                    -- name
    WHEN 'NUR_GP'    THEN 'Nürburgring GP'
    WHEN 'NUR_NS'    THEN 'Nürburgring Nordschleife'
    WHEN 'NUR_NSGP'  THEN 'Nürburgring Nordschleife + GP'
    WHEN 'DAY_RC'    THEN 'Daytona Road Course'
    WHEN 'DAY_OV'    THEN 'Daytona Oval'
    WHEN 'BRH_GP'    THEN 'Brands Hatch GP'
    WHEN 'BRH_INDY'  THEN 'Brands Hatch Indy'
  END AS name,
  CASE t.code                                    -- country
    WHEN 'NUR_GP'    THEN 'Germany'
    WHEN 'NUR_NS'    THEN 'Germany'
    WHEN 'NUR_NSGP'  THEN 'Germany'
    WHEN 'DAY_RC'    THEN 'USA'
    WHEN 'DAY_OV'    THEN 'USA'
    WHEN 'BRH_GP'    THEN 'United Kingdom'
    WHEN 'BRH_INDY'  THEN 'United Kingdom'
  END AS country
FROM (
  SELECT (SELECT id FROM inserted_parents WHERE code = 'NUR') AS parent_id, 'NUR_GP'   AS code
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'NUR'), 'NUR_NS'
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'NUR'), 'NUR_NSGP'
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'DAY'), 'DAY_RC'
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'DAY'), 'DAY_OV'
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'BRH'), 'BRH_GP'
  UNION ALL SELECT (SELECT id FROM inserted_parents WHERE code = 'BRH'), 'BRH_INDY'
) AS t;