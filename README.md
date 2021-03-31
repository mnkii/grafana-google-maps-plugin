# Grafana Google Maps Plugin

A work in progress Grafana Google Maps Plugin - developed using Postgresql data source

Example SQL:
```SQL
SELECT * FROM
(VALUES
(1, 'York', -1.080278, 53.958332, 200, 20000, 'foo', NOW() - INTERVAL '1 WEEK'),
(2, 'Winchester', -1.308000, 51.063202, 800, 10000, 'bar',  NOW() - INTERVAL '1 WEEK'),
(3, 'Liverpool', -2.983333, 53.400002, 300, 30000, 'wibble', NOW() - INTERVAL '20 WEEK'),
(4, 'Exeter', 	-3.533333, 	50.716667, 400, 25000, 'wobble', NOW() - INTERVAL '1 YEAR'))
AS t (id, name, long, lat, value, radius, info, created_at);
```
