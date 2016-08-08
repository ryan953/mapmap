<!DOCTYPE html>
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
    <script src="<?= $google_maps_uri ?>" async defer></script>
  </body>
</html>
