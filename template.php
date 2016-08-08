<!DOCTYPE html>
<html>
  <head>
    <title>MapMap! - Compare two locations at the same zoom level</title>
    <link rel="stylesheet" href="/main.css">
  </head>
  <body>
    <div class="container__left">
      <form id="locationLeft" class="location__container">
        <input name="location" type="text" />
      </form>

      <div class="map__container">
        <div id="mapLeft" class="map"></div>
      </div>
    </div>

    <div class="container__right">
      <form id="locationRight" class="location__container">
        <input name="location" type="text" />
      </form>

      <div class="map__container">
        <div id="mapRight" class="map"></div>
      </div>
    </div>

    <script src="/utils.js"></script>
    <script src="/app.js"></script>
    <script src="/startup.js"></script>
    <script src="<?= $google_maps_uri ?>" async defer></script>
  </body>
</html>
