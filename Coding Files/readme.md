#Midterm Assignment - Create an interactive webmap
## Laura Butler

GitHub Web Map link https://lbutler06gis.github.io/Tornado-and-Hail-Analysis---Midterm/index.html

I created an interactive Leaflet Map to display tornado paths and hail reports across the United States for 
2024 and 2025.

The research question that drove my dataset choices - Does the size of hail produced during tornadic
thunderstorms increase or decrease depending on geographic locations? I could also use this data to 
see if hail size corresponds to tornado size. 

### Datasets
Datasets:
1.	NOAA Historical Tornado Records
    a.	Records containing tornado locations, dates, intensity ratings, and path information.
    b.	https://www.spc.noaa.gov/wcm/

2.	NOAA Historic Hail Records
    a.	Records containing hail locations, dates, sizes.
    b.	https://www.spc.noaa.gov/wcm/

3. Instructions on how to read the .csv from NOAA
    a. https://www.spc.noaa.gov/wcm/data/SPC_severe_database_description.pdf
    
    
    I trimmed these datasets down considerably. The data available is quite robust. I also realized as
    my hail datasets look like a glitter disaster, that it's all hail, not just hail produced with 
    a tornado. So, if I had more time, I could have edited the .csv in a way that removed hail
    occuring at times that did not directly correspond to a tornadic event by using the date and times. 
    However, after a billion hours turning my .csv into a usable geojson format to meet the midterm 
    requirements, I'll admit, I was done working with excel and vs code together. 

    ### Map Features
    - Tornado paths displayed as black lines.
    - Hail reports displayed as colored markers based on hail diameter. (Yes, looks like a glitter explosion). 
    - Popups containing information about each tornado and hail report. It is difficult to bring up a popup on
    a tornado. I tried to make the path thicker, so when you zoom in, you have a better chance at the popup 
    coming up. To fix this problem any other way, was outside of my skillset. 
    - Layer controls to turn tornado and hail data on or off.
    - Two basemap options: Esri World Phyical Map and Open Street Map.
    -Legend identifying hail sizes and tornado paths. 

## Code and Resources Used

### Previous Coursework

- Assignment 4 - Leaflet Weather Alerts Map
- Assignment 4 - Leaflet Earthquake Map
- Assignment 4 - Combined Weather and Earthquake Map - (really glad I did the extra work)
- Assignment 7 - Concatenate in excel to make the data readable for GeoJSON file.

I reused and modified code from Assignment 4 to put in the .geojson, popups, circle markers, map legends, and layer controls. 

### Leaflet References
https://leafletjs.com/index.html
https://leafletjs.com/examples/geojson/
https://leafletjs.com/examples/choropleth/
https://leafletjs.com/examples/layers-control/




