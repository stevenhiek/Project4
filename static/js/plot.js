let rest_title = `Top Ten Restaurants by Review Counts`

let restaurants = ["Pizzeria Bianco", "Four Peaks Brewing", "Bobby Q", "Lux Central", "Rehab Burger Therapy", "Cibo", "La Santisima",
    "The Mission Old Town", "Joe's Farm Grill", "Citizen Public House"
]

let reviews = [2035, 1965, 1940, 1770, 1724, 1698, 1694, 1659, 1644, 1550]

let trace2 = {
    x: restaurants,
    y: reviews,
    type: 'bar'
};

let data2 = [trace2];

let layout2 = {
    title: rest_title
};

Plotly.newPlot("plot1", data2, layout2);