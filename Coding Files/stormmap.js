var map = L.map('stormmap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
var basemap =  L.tileLayer(basemapUrl, {attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', maxZoom: 8}).addTo(map);


//Toggle Control using Leaflet <https://leafletjs.com/examples/layers-control/>

var layerControl = L.control.layers(null, {}, {
  collapsed: false
}).addTo(map);
      
//Add hail and tornado layers


//Tornado layer
var tornadoData = 'tornadoes.geojson';

  $.getJSON(tornadoData, function(data) {
    console.log("Tornado data loaded:", data);
     
   tornadoLayer = L.geoJSON(data, {
      style: function(feature) {
        return {
          color: 'black',
          weight: 2,
          opacity: 0.8
        };
      },

//next code line is for the popup requirement - code copied and parts edited from instructor, assignment 4.
        onEachFeature: function(feature, layer) {
             layer.bindPopup(
              '<strong>Tornado Report</strong><br>' +
              'State: ' + feature.properties.state + '<br>' +
              'Date: ' + feature.properties.date + '<br>' +
              'Time: ' + feature.properties.date + '<br>' +
              'EF Rating: ' + feature.properties.efscale + '<br>' +
              'Path Length (miles): ' + feature.properties.lengthMiles + '<br>' +
              'Tornado Width (yards): ' + feature.properties.widthYards + '<br>' +
              'Property Damage Costs: ' + feature.properties.propertyDamage + '<br>' +
              'Crop Damage Costs: ' + feature.properties.cropDamage + '<br>' +
              'Injuries: ' + feature.properties.injuries + '<br>' +
              'Fatalities: ' + feature.properties.fatalities + '<br>'
             );
      }

   }).addTo(map);

//link to toggle
   layerControl.addOverlay(tornadoLayer, "Tornadoes");
  });


  //Hail layer
var hailData = 'hail.geojson';
$.getJSON(hailData, function (data) {
  console.log("Hail data loaded:", data);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {

      var hailSize = Number(feature.properties.hailSize);
      var markerColor = 'green';
      if (hailSize >= 1) markerColor = 'hotpink';
      if (hailSize >= 2) markerColor = 'orange';
      if (hailSize >= 3) markerColor = 'red';
      if (hailSize >= 4) markerColor = 'blue';
      if (hailSize >= 5) markerColor = 'purple';


      return L.circleMarker(latlng, {
        radius: hailSize * 2,
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.35,
        weight: 1
      });

    }
  }).addTo(map)
  });



//Legend
            //copied code from leaflet assign 4
const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML += '<strong>Legend</strong><br>';
                div.innerHTML += '<br><strong>Hail Size in inches</strong><br>'
                const colors = ['hotpink', 'orange', 'red', 'blue', 'purple'];
                const labels = ['Less than 1', '2-3', '3-4', '5+'];
                for (let i = 0; i < colors.length; i++) {

                    div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + labels[i] + '<br>';
                }

                /*//adding code for weather alerts in legend
                div.innerHTML += '<br><strong>Weather Alert Severity</strong><br>'
                div.innerHTML += '<i style="background:purple"></i> Extreme<br>';
                div.innerHTML += '<i style="background:red"></i> Severe<br>';
                div.innerHTML += '<i style="background:orange"></i> Moderate<br>';
                div.innerHTML += '<i style="background: #e70c7a"></i> Minor<br>';
                return div;
        }; */

        legend.addTo(map);



/*var usgsEarthquakeData = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
    $.getJSON(usgsEarthquakeData, function(data) {
        L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            //magnitude was from the usgs provided link and that doc is broken into the individual details for each earthquake
            var magnitude = feature.properties.mag;
            var markerColor = 'green';
            if (magnitude >=2) markerColor = 'yellow';
            if (magnitude >=4) markerColor = 'orange';
            if (magnitude >=6) markerColor = 'red';
            return L.circleMarker(latlng, {
                radius: magnitude * 3,
                color: markerColor
        });
    },
        //next code line is for the popup requirement - code copied and some edited from instructor provided to include different information
        onEachFeature: function(feature, layer) {
            var magnitude = feature.properties.mag;
            var location = feature.properties.place;
            var time = new Date(feature.properties.time).toLocaleString();
            layer.bindPopup('magnitude: ' + magnitude + '<br>Location: ' + location + '<br>Time: ' + time);
        }

    }).addTo(map);
    });

    //code for creating a legend using Leaflet's interactive choropleth map tuturiol for legend creation & lots of google questions
        const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML += '<strong>Legend</strong><br>';
                div.innerHTML += '<br><strong>Earthquake Magnitude</strong><br>'
                const colors = ['green', 'yellow', 'orange', 'red'];
                const labels = ['Less than 2', '2-3.9', '4-5.9', '6+'];
                for (let i = 0; i < colors.length; i++) {
                div.innerHTML +=    
                '<i style="background:' + colors[i] + '"></i> ' + labels[i] + '<br>';
                }
                return div;
        };

        //put legend on the map code
        legend.addTo(map);
        */

