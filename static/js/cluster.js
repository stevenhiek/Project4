var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var map = L.map("map-restaurants", {
    center: [33.485685442692514, -112.051555006106],
    zoom: 11,
    
});

streetmap.addTo(map);


d3.csv()