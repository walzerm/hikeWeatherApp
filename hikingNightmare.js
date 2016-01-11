//Practice
//run with node --harmony hikingNightmare.js

var Nightmare = require('nightmare');
var vo = require('vo');
var fs = require('fs');

vo(run)(function(err, result) {
  if (err) throw err;
});

//nightmare.js function for collecting hike data from wta.org
function *run() {
    var textArr = [];

    //Gets the hike title, url, features, and description for each hike
    Nightmare.action('elements', function(done) {
        this.evaluate_now(function() {
            var titlesAndURL = document.getElementsByClassName('listitem-title'),
                features = document.getElementsByClassName('hike-stats grid_3 alpha'),
                descriptions = document.getElementsByClassName('listing-summary grid_6 omega show-excerpt'),
                strTitle = [],
                strURL = [],
                strFeatures = [],
                strDescription = [];
            for (var idx in titlesAndURL) {
                if (titlesAndURL[idx].href || titlesAndURL[idx].href === '') {
                    strTitle.push(titlesAndURL[idx].innerText);
                    strURL.push(titlesAndURL[idx].href)
                }
            }
            for (var idx in features) {
                if (features[idx].innerText || features[idx].innerText === '') {
                    strFeatures.push(features[idx].innerText);
                }
            }
            for (var idx in descriptions) {
                if (descriptions[idx].innerText || descriptions[idx].innerText === '') {
                    strDescription.push(descriptions[idx].innerText);
                }
            }
            return {
                titleElements: strTitle,
                urlElements: strURL,
                featuresElements: strFeatures,
                descriptionsElements: strDescription
            }
        }, done)
    })

    //runs the nightmare script
    var nightmareText = Nightmare();
    var selector = 'listitem-title'
    for (var i = 0; i <= 3330; i+=30) {
        var p = yield nightmareText
            .goto('http://www.wta.org/go-hiking/hikes?b_start:int=' + i + '&b_end:int=500')
            .elements()
            textArr.push(p);
    }
        yield nightmareText.end();

    //Writes the data to a JSON file
    fs.writeFile('./hikeData.json', JSON.stringify(textArr, null, 2), function(err, data) {
        if (err) {
            console.log(err);
        }
    })
}
