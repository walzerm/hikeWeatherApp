//Practice
//run with node --harmony nightmarePractice.js

var Nightmare = require('nightmare');
var vo = require('vo');

vo(run)(function(err, result) {
  if (err) throw err;
});


function *run() {
    var textArr = [];

    var nightmareText = Nightmare();
    var selector = 'listitem-title'
    for (var i = 0; i < 3330; i+=30) {
        var p = yield nightmareText
        .goto('http://www.wta.org/go-hiking/hikes?b_start:int=' + i + '&b_end:int=500')
        .evaluate(function(selector) {
            //Only a representation can be passed out of evaluate()
            //all processing must be done in the function
            var elements =  document.getElementsByClassName(selector);
            str = [];
            for(idx in elements) {
                str.push(elements[idx].innerText);
            }
            return str;
        }, selector);
        textArr.push(p);
    }

        //console.log(p);

        console.log(textArr);
        yield nightmareText.end();
}
