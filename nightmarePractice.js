//Practice

var Nightmare = require('nightmare');
var vo = require('vo');

vo(run)(function(err, result) {
  if (err) throw err;
});


function *run() {
    var textArr = [];

    var nightmareText = Nightmare();
    var selector = 'a'
    var p = yield nightmareText
        .goto('http://www.search-seo-engine-optimization.com/')
        .evaluate(function(selector) {
            //Only a representation can be passed out of evaluate()
            //all processing must be done in the function
            var elements =  document.getElementsByTagName(selector);
            var str = [];
            for(idx in elements) {
                str.push(elements[idx].innerText);
            }
            return str;
        }, selector);
        console.log(p);
        yield nightmareText.end();
}
