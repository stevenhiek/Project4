// Use d3 to read the JSON file.
// The data from the JSON file is arbitrarily named importedData as the argument.
d3.json("/static/data/az_yelp_restaurants.json").then(function (importedData) {
  var data = importedData;
  y = [1, 2, 3, 4, 5]


  // names = data.map(function (row){
  //     return row.city
  //   });

  //   var groupBy = function (xs, key1, key2) {
  //     return xs.reduce(function (rv, x) {
  //         (rv[x[key1] + ',' + x[key2]] = rv[x[key1] + ',' + x[key2]] || []).push(x);

  //         return rv;
  //     }, {});
  // };
  //   var grouped_data = groupBy(data,'city','stars')

  var sorted_data = data.sort(function (a, b) {
    return b.review_count - a.review_count;
  })

  // Trace1 for the Stars data.
  var trace1 = {
    y: sorted_data.map(row => row.name).slice(0,10).reverse(),
    x: sorted_data.map(row => row.stars).slice(0,10).reverse(),

    type: "bar",
    orientation: "h"
  };

  // Data
  var chartData = [trace1];

  // Apply the group bar mode to the layout.
  var layout = {
    title: "Top Ten Reviewed Restaurants by Star Rating",
    xaxis: {
      title: 'Star Rating',
    },
    yaxis: {

      // title: 'Star Ratings',

    },
    // autosize: true,
    // width: 1000,
    // height: 800,
    margin: {
      l: 150,
      // r: 50,
      // b: 200,
      // t: 200,
      // pad: 4
    },

  };

  // Render the plot to the div tag with the id of "plot".
  Plotly.newPlot("plotk", chartData, layout);
});