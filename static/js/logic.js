// Store the API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Send the data.features object to the createFeatures function.
    createFeatures(data.features);
});

// Create a function to set marker size based on magnitude
function markerSize(magnitude) {
    return magnitude;
}

// Create a function to set marker color based on depth
function markerColor(depth) {
    if (depth >= 90) return "red";
    else if (depth < 90 && depth >= 70) return "orangered";
    else if (depth < 70 && depth >= 50) return "orange";
    else if (depth < 50 && depth >= 30) return "gold";
    else if (depth < 30 && depth >= 10) return "yellow";
    else return "lightgreen";
}

// Create a function to plot markers for each earthquake
function createFeatures(earthquakeData) {

// Define a function to run once for each feature in the features array.
// Give each feature a popup that describes the place, time, magnitude, and depth of the earthquake.
function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location:  ${feature.properties.place}</h3><hr>
    <p>Date:  ${new Date(feature.properties.time)}</p>
    <p>Magnitude:  ${feature.properties.mag}</p>
    <p>Depth:  ${feature.geometry.coordinates[2]}</p>`);
};

// Create a GeoJSON layer that contains the features array on the earthquakeData object.
// Run the onEachFeature function once for each piece of data in the array.
var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    
    // Create function to customize markers
    pointToLayer: function(feature, latlng) {
        // Define markers with size based on magnitude and color based on depth 
        var markers = {
            stroke: false,
            fillOpacity: 0.75,
            color: "black",
            fillColor: markerColor(feature.geometry.coordinates[2]),
            radius: markerSize(feature.properties.mag)
        }    

        return L.circle(latlng, markers);
    }
});

    // Send the earthquakes layer to the createMap function
    createMap(earthquakes);
}

// Create a function to plot the map
function createMap(earthquakes) {

    // Create the base layer
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [street, earthquakes]
    });

    // Add the legend to the map
    legend.addTo(map);
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  