(function() {
    function initMap(id, lattitude, longitude, popupText) {
        // check if id exists
        if (!document.getElementById(id)) {
            return;
        }
        
        // set up the map
        var map = new L.Map(id);

        // create the tile layer with correct attribution
        var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {
            maxZoom: 18,
            minZoom: 10,
            attribution: osmAttrib
        });

        // start the map
        map.setView(new L.LatLng(lattitude, longitude), 16);
        map.addLayer(osm);

        // add the marker with the appropriate text
        var marker =L.marker([lattitude, longitude]).addTo(map);
        marker.bindPopup(popupText).openPopup();
    }

    initMap('map', 52.51814, 10.0130413, 'Ramlinger Str. 43A');
})();
