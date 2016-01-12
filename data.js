var knex = require('knex');
var fs = require('fs');

fs.readFile('./hikesData.json', 'utf8', function(err, data) {
    var hikeData = JSON.parse(data);
    var insert = {};
    var numbers = /\d+(\.\d{1,2})?/;

    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < hikeData[i]['titleElements'].length; j++) {
            insert.title = hikeData[i]['titleElements'][j];
            insert.url = hikeData[i]['urlElements'][j];
            insert.desciption = hikeData[i]['descriptionsElements'][j];

            var features = hikeData[i]['featuresElements'][j].split('\n');

            var length = numbers.exec(features[0]);
            if (length) {
                insert.length = parseFloat(length[0]);
            } else {
                insert.length = null;
            }

            var elevation = numbers.exec(features[1]);
            if (elevation) {
                insert.elevation = parseFloat(elevation[0]);
            } else {
                insert.elevation = null;
            }

            var highPoint = numbers.exec(features[2]);
            if (highPoint) {
                insert.highPoint = parseFloat(highPoint[0]);
            } else {
                insert.highPoint = null;
            }

            console.log(insert);
        }
    }

    //console.log(hikeData[103]['titleElements'].length);


})
