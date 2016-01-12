var knex = require('knex');
var fs = require('fs');

fs.readFile('./hikesData.json', 'utf8', function(err, data) {
    var hikeData = JSON.parse(data);
    var insert = {};

    //Regular expressions to test for hike features
    var numbers = /\d+(\.\d{1,2})?/;
    var trailLength = /roundtrip/;
    var trailGain = /Gain/;
    var trailHighpoint = /Highest/;

    for (var i = 0; i < hikeData.length; i++) {
        for (var j = 0; j < hikeData[i]['titleElements'].length; j++) {
            insert.title = hikeData[i]['titleElements'][j];
            insert.url = hikeData[i]['urlElements'][j];
            insert.desciption = hikeData[i]['descriptionsElements'][j];

            var features = hikeData[i]['featuresElements'][j].split('\n');
            //Filtering out empty values for features
            var filteredFeatures = features.filter(function(str) {
                return /\S/.test(str);
            });

            //If there are no features, set each value to null
            if (filteredFeatures.length === 0) {
                insert.length = null;
                insert.elevation = null;
                insert.highPoint = null;
            } else {
                //Else check each feature against the regular expression to get the appropriate number
                for (var k = 0; k < filteredFeatures.length; k++) {
                    if (trailLength.test(filteredFeatures[k])) {
                        var lengthArr = numbers.exec(filteredFeatures[k]);
                        insert.length = parseFloat(lengthArr[0]);
                    } else if (trailGain.test(filteredFeatures[k])) {
                        var elevationArr = numbers.exec(filteredFeatures[k]);
                        insert.elevation = parseFloat(elevationArr[0]);
                    } else if (trailHighpoint.test(filteredFeatures[k])) {
                        var highPointArr = numbers.exec(filteredFeatures[k]);
                        insert.highPoint = parseFloat(highPointArr[0]);
                    }
                }
            }
            console.log(insert);
        }
    }
})
