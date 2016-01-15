var knex = require('../../db/knex');
var fs = require('fs');

fs.readFile('../rawData/latLongData.json', 'utf8', function(err, data) {

    var latLongData = JSON.parse(data);
    var numberRegEx = /-?[0-9]\d*(\.\d+)?/g;


    for (var i = 0; i < latLongData.length; i++) {
        var insertObj = {};
        var found = latLongData[i][0].match(numberRegEx);
        insertObj.latitude = parseFloat(found[0]);
        insertObj.longitude = parseFloat(found[1]);
        var urlString = latLongData[i][1];
        knex('hikesinfo').where('url', urlString).first().update(insertObj).then(function() {
            console.log('done');
        });
    }

})
