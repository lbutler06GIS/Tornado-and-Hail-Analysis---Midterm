var map = L.map('stormmap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}';
var basemap =  L.tileLayer(basemapUrl, {attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service', maxZoom: 8}).addTo(map);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'});



//Toggle Control using Leaflet <https://leafletjs.com/examples/layers-control/>

var baseMaps = {
  "Esri World Physical": basemap,
  "Open Street Map": osm
};

var layerControl = L.control.layers(baseMaps, {}, {
  
  collapsed: false
}).addTo(map);
      
//Add hail and tornado layers
//Tornado layer
var tornadoData = 'tornadoes.geojson';
var tornadoLayer;

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
              'Time: ' + feature.properties.time + '<br>' +
              'EF Rating: ' + feature.properties.efscale + '<br>' +
              'Path Length (miles): ' + feature.properties.lengthMiles + '<br>' +
              'Tornado Width (yards): ' + feature.properties.widthYards + '<br>' +
              'Property Damage ($): ' + feature.properties.propertyDamage + '<br>' +
              'Crop Damage ($): ' + feature.properties.cropDamage + '<br>' +
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
var hailLayer;

$.getJSON(hailData, function (data) {
  console.log("Hail data loaded:", data);
  hailLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {

      var hailSize = Number(feature.properties.hailSize);
      var markerColor = 'green';
      if (hailSize >= 1) markerColor = 'hotpink';
      if (hailSize >= 2) markerColor = 'orange';
      if (hailSize >= 3) markerColor = 'red';
      if (hailSize >= 4) markerColor = 'blue';
      if (hailSize >= 5) markerColor = 'purple';
    


      return L.circleMarker(latlng, {
        radius: hailSize * 1,
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.35,
        weight: 1
    
  });
},

      //next code line is for the popup requirement - code copied and parts edited from instructor, assignment 4.
      
      
      onEachFeature: function(feature, layer) {
             layer.bindPopup(
              '<strong>Hail Report</strong><br>' +
              'State: ' + feature.properties.state + '<br>' +
              'Date: ' + feature.properties.date + '<br>' +
              'Time: ' + feature.properties.time + '<br>' +
              'Hail Size (diameter/inches): ' + feature.properties.hailSize + '<br>' +
              'Property Damages ($): ' + feature.properties.propertyDamage + '<br>' +
              'Crop Damages ($): ' + feature.properties.cropDamage + '<br>' 
              
  )}
  }).addTo(map)

  //to link to toggle
  layerControl.addOverlay(hailLayer, "Hail");
  });



//Legend
//copied code from leaflet assign 4 and adapted. Like everything else.
const legend = L.control({position: 'bottomright'});
        legend.onAdd = function(map) {
                const div = L.DomUtil.create('div', 'info legend');
                div.innerHTML += '<strong>Legend</strong><br>';
                div.innerHTML += '<br><strong>Hail Size in inches</strong><br>'
                const colors = ['green', 'hotpink', 'orange', 'red', 'blue', 'purple'];
                const labels = ['Less than 1', '1-2', '2-3', '3-4', '4-5', '5 or greater'];
                for (let i = 0; i < colors.length; i++) {

                    div.innerHTML += '<i style="background:' + colors[i] + '"></i> ' + labels[i] + '<br>';
                }

                div.innerHTML += '<br><strong>Tornado Paths</strong><br>';
                div.innerHTML += '<i style="background:black;"></i> Tornado paths<br>';

                return div;
              };

        legend.addTo(map);

