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

### Install
```
cd /var/lib/grafana/plugins

git clone https://github.com/mnkii/grafana-google-maps-plugin.git
cd grafana-google-maps-plugin
yarn install
yarn dev
sudo service grafana-server restart
```

### Using the plugin

Add new panel with 'Google Maps' as visualisation. Set 'Format As' to table.

Paste in the following SQL:
```SQL
SELECT * FROM
(VALUES
(1, 'York', -1.080278, 53.958332, 200, 20000, 'foo', NOW() - INTERVAL '1 WEEK'),
(2, 'Winchester', -1.308000, 51.063202, 800, 10000, 'bar',  NOW() - INTERVAL '1 WEEK'),
(3, 'Liverpool', -2.983333, 53.400002, 300, 30000, 'wibble', NOW() - INTERVAL '20 WEEK'),
(4, 'Exeter', 	-3.533333, 	50.716667, 400, 25000, 'wobble', NOW() - INTERVAL '1 YEAR'))
AS t (id, name, long, lat, value, radius, info, created_at);
```

In the 'panel tab' under 'display' enter your 'Google Maps API key' which you can get from [here](https://developers.google.com/maps/documentation/maps-static/get-api-key). The key needs access to 'map javascript API'.

Save the plugin.
