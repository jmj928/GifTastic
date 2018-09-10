$(document).ready(function () {

    var topics = ["family guy","the simpsons","teen titans"];


    generateButtons();
    $(document).on("click", "button", displayCartoonGifs);

    function generateButtons(){

        $("#buttons").empty();

        for(var i = 0; i < topics.length; i++){
            var newButton = $("<button>");
            newButton.attr("data-name",topics[i]);
            newButton.text(topics[i]);
            $("#buttons").append(newButton);
       }          
    }

    


        function displayCartoonGifs(){

        var selectedCartoon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          selectedCartoon + "&api_key=r9MUU05qDP5SWkY29SY6fD1CXN4SUspx&limit=10";
        console.log("Query " + queryURL);
        var queryURL2 = "https://www.omdbapi.com/?t=" + selectedCartoon + "&y=&plot=short&apikey=96837c43";
        var gifDiv = $("<div class='item'>");
        console.log("Query " + queryURL2);
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
  
            for (var i = 0; i < results.length; i++) {
              
  
              var rating = results[i].rating;
              var title = results[i].title;
              var imdbRating = $("<p>");
              var totalSeasons;
  
              var p = $("<p>").text("Rating: " + rating );
  
              var cartoonImage = $("<img>");
              cartoonImage.attr("src", results[i].images.fixed_height_still.url);
              cartoonImage.attr("alt", title);
            


              $.ajax({
                url: queryURL2,
                method: "GET"
              })
                .then(function(response2) {

                
                  var results2 = response2;
                  console.log("IMDB Resutls" + results2.imdbRating);

                  if(typeof results2.totalSeasons === 'undefined'){
                    imdbRating.text("IMDB Rating : " + results2.imdbRating + " Total Seasons : Not Listed " );

                  }
                  else{
        
                    imdbRating.text("IMDB Rating : " + results2.imdbRating + " Total Seasons : " + results2.totalSeasons);
                  }                    
                    
                    
        
                    
                  
                });

                gifDiv.prepend(p);
                gifDiv.prepend(cartoonImage);
                gifDiv.prepend(imdbRating);
              
                $("#gifs-appear-here").prepend(gifDiv);
  
            
            }
          });


      }


        $("#add-cartoon").on("click", function(event) {
            event.preventDefault();
    
            var addedCartoon = $("#cartoon-input").val().trim();  

            topics.push(addedCartoon);
            $("#cartoon-input").val('');
    
            generateButtons();
    
        });

        $(document).on("click", "img", function() {
            var src = $(this).attr("src");
          if($(this).hasClass('playing')){
             //stop
             $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
             $(this).removeClass('playing');
          } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
          }
        });
    
});