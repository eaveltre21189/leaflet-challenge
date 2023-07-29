# leaflet-challenge

## Steps Completed:

### Leaflet-Part-1:  Creating the JavaScript Code (app.js)

* Obtain the URL for a dataset from the USGS GeoJSON Feed

    - I chose "All Earthquakes" under "Past 7 Days":  https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
    
    <br>

* Read in the GeoJSON data using D3

* Create functions to set the marker size based on the earthquake's magnitude and color based on the earthquake's depth

* Create a map that includes the following:

    - Pop-up boxes with the location, time, magnitufe, and depth for each event
    - A nested function to create the markers
    - A legend that displays the color and corresponding depth ranges

### Notes:

* The index.html and style.css files were provided in the starter files for the assignment. I did not alter the index.html file. I added a few lines of code to the style.css file to format the legend, but the rest was provided.

* I received some assistance from a classmate with some formatting on the legend. Specifically, this section of the code that I needed in order to get the legend to display the colored boxes:

    ```
    for (var i = 0; i < depth.length; i++){
        div.innerHTML += '<i style="background:' + markerColor(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;'+ labels[i] + '<br>';
    }
    ```
* I decided not to do the advanced part of this assignment, so I chose to not create a "Leaflet-Part-1" folder, as I didn't think it was necessary