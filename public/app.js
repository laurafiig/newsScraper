//when scrape button is fixed
$("#scraper").on("click", function() {
  //scrape!!
  $.ajax({
    method: "GET",
    url: "/scrape",
  })  // end GET
  .done(function(data) {
    // Log the response
    console.log(data);
    // Empty the placeholder or existing table
    $("#empty").empty();
    $("#showArticle").empty();
    // Grab the articles as a json
    $.getJSON("/articles", function(data) {
    // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the information on the page
        $("#showArticle").append('<div class="panel panel-primary"><div class="panel-heading"><a href="'+data[i].link+'" target="_blank"><h3>'+data[i].title+'</h3></a></div><div class="panel-body"><h4>'+data[i].description+'</h4><a class="btn btn-info" id="save">Save</a></div></div>');
      }  // end for
    });  // end getJSON
  });  // end done
});  // end click

 
//saved articles
$(document).on("click", ".showArticle", function() {
  //set selected article to saved
  //getJson /saved (where saved = true)
  //display
});

