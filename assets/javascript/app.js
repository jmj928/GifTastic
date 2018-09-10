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
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            console.log(results);
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div class='item'>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var cartoonImage = $("<img>");
              cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            
              gifDiv.prepend(p);
              gifDiv.prepend(cartoonImage);
              
              
  
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