let title = `Top Ten Categories by Counts`

let categories = ["American", "Italian", "Mexican", "Chinese", "Japanese", "Mediterranean", "Thai", "Indian", "Vietnamese", "Hawaiian "]

let counts = [5154, 1427, 1390, 567, 353, 259, 142, 114, 111, 56]

let trace1 = {
    x: categories,
    y: counts,
    type: 'bar'
};

let data = [trace1];

let layout = {
    title: title
};

Plotly.newPlot("plot", data, layout);