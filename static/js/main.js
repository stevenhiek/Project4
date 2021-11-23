var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var layers = {
    ONE_STAR: new L.LayerGroup(),
    ONE_HALF_STAR: new L.LayerGroup(),
    TWO_STAR: new L.LayerGroup(),
    TWO_HALF_STAR: new L.LayerGroup(),
    THREE_STAR: new L.LayerGroup(),
    THREE_HALF_STAR: new L.LayerGroup(),
    FOUR_STAR: new L.LayerGroup(),
    FOUR_HALF_STAR: new L.LayerGroup(),
    FIVE_STAR: new L.LayerGroup()
  };

var map = L.map("map-restaurants", {
    center: [33.485685442692514, -112.051555006106],
    zoom: 11,
    layers: [
        layers.ONE_STAR,
    ]
});

streetmap.addTo(map);

var overlays = {
    "1 Star": layers.ONE_STAR,
    "1.5 Star": layers.ONE_HALF_STAR,
    "2 Star": layers.TWO_STAR,
    "2.5 Star": layers.TWO_HALF_STAR,
    "3 Star": layers.THREE_STAR,
    "3.5 Star": layers.THREE_HALF_STAR,
    "4 Star": layers.FOUR_STAR,
    "4.5 Star": layers.FOUR_HALF_STAR,
    "5 Star": layers.FIVE_STAR
};

L.control.layers(null, overlays).addTo(map);

var info = L.control({
    position: "bottomright"
});

info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

info.addTo(map);

var icons = {
    ONE_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "black",
        shape: "circle"
    }),
    ONE_HALF_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    TWO_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "orange-dark",
        shape: "circle"
    }),
    TWO_HALF_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    }),
    THREE_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle"
    }),
    THREE_HALF_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "green-light",
        shape: "circle"
    }),
    FOUR_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    }),
    FOUR_HALF_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "cyan",
        shape: "circle"
    }),
    FIVE_STAR: L.ExtraMarkers.icon({
        icon: "ion-minus-circled",
        iconColor: "white",
        markerColor: "blue",
        shape: "circle"
    })
};

const file = "/static/data/az_yelp_restaurants.json"

d3.json(file).then(function(data) {
    var markerCount = {
        ONE_STAR: 0,
        ONE_HALF_STAR: 0,
        TWO_STAR: 0,
        TWO_HALF_STAR: 0,
        THREE_STAR: 0,
        THREE_HALF_STAR: 0,
        FOUR_STAR: 0,
        FOUR_HALF_STAR: 0,
        FIVE_STAR: 0
    };

    var starRatingCode;
    var single_data = data;

    for (var index = 0; index < 10586; index++) {
        var restaurants = single_data[index];
        
        if (restaurants.stars == 5) {
            starRatingCode = "FIVE_STAR";
        }
        else if (restaurants.stars == 4.5) {
            starRatingCode = "FOUR_HALF_STAR";
        }
        else if (restaurants.stars == 4) {
            starRatingCode = "FOUR_STAR";
        }
        else if (restaurants.stars == 3.5) {
            starRatingCode = "THREE_HALF_STAR";
        }
        else if (restaurants.stars == 3) {
            starRatingCode = "THREE_STAR";
        }
        else if (restaurants.stars == 2.5) {
            starRatingCode = "TWO_HALF_STAR";
        }
        else if (restaurants.stars == 2) {
            starRatingCode = "TWO_STAR";
        }
        else if (restaurants.stars == 1.5) {
            starRatingCode = "ONE_HALF_STAR";
        }
        else {
            starRatingCode = "ONE_STAR";
        }

        markerCount[starRatingCode]++;

        var newMarker = L.marker([restaurants.latitude, restaurants.longitude], {
            icon: icons[starRatingCode]
        });

        newMarker.addTo(layers[starRatingCode]);

        newMarker.bindPopup("<h3>" + restaurants.name + "<h3><h3>Address: " + restaurants.address +", " + restaurants.city + ", " + restaurants.state + " " + restaurants.postal_code + "</h3>" + "<h3>Review Count: " + restaurants.review_count + "</h3>" + "<h3>Categories: " + restaurants.categories + "</h3>");
    }
    updateLegend(markerCount);
});

function updateLegend(markerCount) {
    document.querySelector(".legend").innerHTML = [
        "<p class='one-star'>1 Star Restaurant: " + markerCount.ONE_STAR + "</p>",
        "<p class='one-half-star'>1.5 Star Restaurant: " + markerCount.ONE_HALF_STAR + "</p>",
        "<p class='two-star'>2 Star Restaurant: " + markerCount.TWO_STAR + "</p>",
        "<p class='two-half-star'>2.5 Star Restaurant: " + markerCount.TWO_HALF_STAR + "</p>",
        "<p class='three-star'>3 Star Restaurant: " + markerCount.THREE_STAR + "</p>",
        "<p class='three-half-star'>3.5 Star Restaurant: " + markerCount.THREE_HALF_STAR + "</p>",
        "<p class='four-star'>4 Star Restaurant: " + markerCount.FOUR_STAR + "</p>",
        "<p class='four-half-star'>4.5 Star Restaurant: " + markerCount.FOUR_HALF_STAR + "</p>",
        "<p class='five-star'>5 Star Restaurant: " + markerCount.FIVE_STAR + "</p>",
    ].join("");
}