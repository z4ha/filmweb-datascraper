var express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var json = { title: "", director: "", script: "",rating: "", plot: ""}

var domSelectors = {
  title: '.filmTitle a',
  director: 'div .filmInfo table tr td li[itemprop="director"]',
  script: 'div .filmInfo table tr:contains("scenariusz:") td',
  rating: "span[itemprop='ratingValue']",
  plot: 'div .filmPlot'
}

function dataSelector(domSelector, jsonAtrybute){
  $(domSelector).filter(function(){
  var data = $(this);
  jsonAtrybute = data.text();
  json.jsonAtrybute = jsonAtrybute;
  console.log(jsonAtrybute);
  })
}

app.get('/:id', function(req, res){
console.log("run")
var id = req.params.id;
console.log(id)
  var url = 'http://www.filmweb.pl/' + id;
  request(url, function(error, respond, body){
    if(!error) {
      var $ = cheerio.load(body);
      var title, director, script, rating;

      // title
      dataSelector(domSelectors.title, title);

      // director
      dataSelector(domSelectors.director, director);

      // script
      dataSelector(domSelectors.script, script);

      // plot
      dataSelector(domSelectors.plot, plot);

      // rate 
      dataSelector(domSelectors.script, script);
    }
    res.send(json);
  })
})

app.listen('3000', function(){
  console.log('runing on port 3000')
})


