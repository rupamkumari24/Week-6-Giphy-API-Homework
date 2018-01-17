$( document ).ready(function() {

// An array of nature gifs, new nature gifs will be pushed into this array;
var natureList = ["Clouds", "Forest", "Lava", "Ocean", "Snow", "Sunrise", "Waterfall", "Stars", "Mist","Beach", "Trees"];

// Creating Functions & Methods
// Function that displays all gif buttons
function displayGifButtons()
{
    // erasing anything in this div id so that it doesnt duplicate the results
    $("#gifButtonsView").empty();

    // Creating buttons for all the elements present in the array and appending it to Div for display
    for (var i = 0; i < natureList.length; i++)
    {
        var gifButton = $("<button>");
        gifButton.addClass("nature");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", natureList[i]);
        gifButton.text(natureList[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// Function to add a new nature button
function addNewButton(){
    $("#addGif").on("click", function()
    {
        var nature = $("#nature-input").val().trim();
        if (nature == ""){
        return false; // added so user cannot add a blank button
        }
        natureList.push(nature);
        
        displayGifButtons();
        return false;
    });
}
// Function to remove last action button    
function removeLastButton()
{
    $("removeGif").on("click", function(){
        if (nature != "")
        {
            natureList.pop(nature);
        }
    
    displayGifButtons();
    return false;
    });
}
// Function that displays all of the gifs
function displayGifs()
{
    var nature = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + nature + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); // displays the constructed url
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

        // erasing anything in this div id so that it doesnt keep any from the previous click
        $("#gifsView").empty();

        //shows results of gifs
        var results = response.data; 
        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            //div for the gifs to go inside
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Calling Functions & Methods
displayGifButtons(); // displays list of nature already created
addNewButton();

removeLastButton();
// Document Event Listeners
$(document).on("click", ".nature", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
