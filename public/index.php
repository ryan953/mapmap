<?php
$config = array(
  'google_maps' => array(
    'endpoint' => 'https://maps.googleapis.com/maps/api/js',
    'query_args' => array(
      'v' => '3.24',
      'key' => 'AIzaSyB70zXqgMf5Ko3bRci8USuDoU5D_nkgQYc',
      'callback' => 'init',
    ),
  ),
);

function getURLFromConfig($config) {
  return
    $config['endpoint'] .
    '?' .
    ($config['query_args'] ? http_build_query($config['query_args']) : '');
}

?><!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/main.css">
  </head>
  <body>
    <div class="serach__container">
      <div class="search__left">
        <form id="locationLeft">
          <input name="location" type="text" />
        </form>
      </div>
      <div class="search__right">
        <form id="locationRight">
          <input name="location" type="text" />
        </form>
      </div>
    </div>
    <div class="map__container">
      <div id="mapLeft" class="map__left"></div>
      <div id="mapRight" class="map__right"></div>
    </div>
    <script src="/utils.js"></script>
    <script src="/app.js"></script>
    <script src="/startup.js"></script>
    <script src="<?= getURLFromConfig($config['google_maps']) ?>" async defer></script>
  </body>
</html>
