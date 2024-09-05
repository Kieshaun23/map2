// Initialize the map and set view to Fresno
var map = L.map('map').setView([36.7378, -119.7871], 12);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to get color based on AQI
function getColor(aqi) {
    return aqi <= 50 ? 'green' :
           aqi <= 100 ? 'yellow' :
           aqi <= 150 ? 'orange' :
           aqi <= 200 ? 'red' :
           aqi <= 300 ? 'purple' :
                        'maroon';
}

// Function to calculate cigarette equivalent from PM2.5 level
function getCigaretteEquivalent(pm25) {
    return (pm25 / 22).toFixed(2);  // Calculate cigarette equivalent and round to 2 decimals
}

// Function to add a marker with AQI, PM2.5 levels, and cigarette equivalent
function addMarker(lat, lon, aqi, pm25, location) {
    var color = getColor(aqi);
    var cigaretteEquivalent = getCigaretteEquivalent(pm25);
    var markerIcon = L.circleMarker([lat, lon], {
        radius: 8,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
    markerIcon.addTo(map).bindPopup(location + '<br>AQI: ' + aqi + '<br>PM2.5: ' + pm25 + ' µg/m³ (' + cigaretteEquivalent + ' cigarettes/day)');
    return markerIcon;
}

// Store markers in an array for updating
var markers = [];

// Function to randomly change AQI and PM2.5 levels and update markers
function updateMarkers() {
    for (var i = 0; i < markers.length; i++) {
        var newAQI = Math.floor(Math.random() * 400);  // Generate random AQI
        var newPM = Math.floor(Math.random() * 400);   // Generate random PM2.5
        var color = getColor(newAQI);
        var cigaretteEquivalent = getCigaretteEquivalent(newPM);
        markers[i].setStyle({ fillColor: color });  // Update color
        markers[i].bindPopup(markers[i].getPopup().getContent().split('<br>')[0] + '<br>AQI: ' + newAQI + '<br>PM2.5: ' + newPM + ' µg/m³ (' + cigaretteEquivalent + ' cigarettes/day)');
    }
}

// Add initial markers with fake AQI and PM2.5 levels
markers.push(addMarker(36.80126, -119.84080, 45, 100, 'Slater Elementary School'));
markers.push(addMarker(36.81714, -119.81054, 90, 200, 'Bullard High School'));
markers.push(addMarker(36.84048, -119.79199, 135, 150, 'Pinedale Elementary School'));
markers.push(addMarker(36.81617, -119.82756, 175, 180, 'Northwest Church'));
markers.push(addMarker(36.73843, -119.79569, 210, 120, 'Cornerstone Church'));
markers.push(addMarker(36.85090, -119.73419, 180, 140, 'CrossCity Christian Church'));
markers.push(addMarker(36.73847, -119.77292, 120, 130, 'First Armenian Presbyterian Church'));
markers.push(addMarker(36.84124, -119.75347, 60, 70, 'Peoples Church'));
markers.push(addMarker(36.73380, -119.71707, 50, 90, 'Sunnyside High School'));
markers.push(addMarker(36.72459, -119.75711, 190, 210, 'Sequoia Middle School'));
markers.push(addMarker(36.77527, -119.75495, 170, 160, 'McLane High School'));
markers.push(addMarker(36.82229, -119.79862, 145, 130, 'St. Anthony of Padua Catholic Church'));
markers.push(addMarker(36.82079, -119.75476, 80, 95, 'University Presbyterian Church'));
markers.push(addMarker(36.85312, -119.74112, 110, 180, 'Family Community Church'));
markers.push(addMarker(36.85264, -119.75085, 160, 170, 'New Covenant Community Church'));
markers.push(addMarker(36.52086, -119.54806, 190, 150, 'Holy Trinity Armenian Apostolic Church'));
markers.push(addMarker(36.69515, -119.79417, 90, 100, 'West Fresno Elementary School'));
markers.push(addMarker(36.71982, -119.80571, 75, 80, 'Edison High School'));
markers.push(addMarker(36.71535, -119.78688, 140, 190, 'Kirk Elementary School'));
markers.push(addMarker(36.72910, -119.80747, 135, 110, 'Saint Alphonsus Church'));
markers.push(addMarker(36.77183, -119.81400, 115, 170, 'Mount Olive Missionary Baptist Church'));
markers.push(addMarker(36.71766, -119.79399, 100, 130, 'Second Baptist Church'));
markers.push(addMarker(36.74073, -119.78236, 165, 160, 'St. John\'s Cathedral'));
markers.push(addMarker(36.72825, -119.75447, 120, 90, 'True Vine Missionary Baptist Church'));

// Update markers every 60 seconds
setInterval(updateMarkers, 60000);  // 60000 milliseconds = 1 minute
