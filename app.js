var express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var json = { title: "", director: "", script: "",rating: "", plot: ""}

app.get('*', function(req, res){
console.log("run")
  var url = 'http://www.filmweb.pl/Gwiezdne.Wojny'
  request(url, function(error, respond, body){
    if(!error) {
      var $ = cheerio.load(body);
      var title, director, script, rating;

      // title
      $('.filmTitle a').filter(function(){
        var data = $(this);
        title = data.text()
        json.title = title;
        console.log(title)
      })
      // director
      $('div .filmInfo table tr td li[itemprop="director"]').filter(function(){
        data = $(this);
        // console.log(data);
        director = data.text()
        json.director = director;
        console.log(director)
      })
      // script
      $('div .filmInfo table tr:contains("scenariusz:") td').filter(function(){
        data = $(this);
        // console.log(data);
        script = data.text()
        json.script = script;
        console.log(script)
      })
      // 
      $('div .filmPlot').filter(function(){
        data = $(this);
        // console.log(data);
        plot = data.text()
        json.plot = plot;
        console.log(plot)
      })
      // rate 
      $("span[itemprop='ratingValue']").filter(function(){
        data = $(this);
        // console.log(data);
        rating = data.text()
        json.rating = rating;
        console.log(rating)
      })
    }
    res.send(json);
  })
})

app.listen('3000', function(){
  console.log('runing on port 3000')
})


