<?php

function getURIFromConfig($config) {
  return
    $config['endpoint'] .
    '?' .
    ($config['query_args'] ? http_build_query($config['query_args']) : '');
}

$config = require(__DIR__ . '/config.php');
$google_maps_uri = getURIFromConfig($config['google_maps']);

require(__DIR__ . '/template.php');
