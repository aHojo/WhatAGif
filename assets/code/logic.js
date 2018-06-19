//Cache the Dom
const searchBtn = $("#search-button");
const input = $("#search-input");
const buttonsDiv = $('#starting-buttons');
const displayGif = $("#printed-gifs");
var searchArray = ["Naruto", "Bleach", "To Aru", "Skyrim", "Kingdom Hearts"];


function createButtons() {
    
    //empty the buttons before creating more. 
    buttonsDiv.empty();
    //loop through the array and make buttons for each element in the array
    for (let i = 0; i < searchArray.length; i++){
        console.log(searchArray[i]);
        var buttons = $('<button>');
        buttons.addClass("gif-button btn btn-primary");
        buttons.attr('data-gif', searchArray[i].toLowerCase());
        buttons.text(searchArray[i]);
        buttonsDiv.append(buttons);
    }
}

function addButtons() {
    //grab the input from the 
    var tempSearchValue = input.val().trim();

    //if the value isn't seen, and there is input in the box
    if(searchArray.indexOf(tempSearchValue) === -1 && tempSearchValue !== ""){
    searchArray.push(tempSearchValue);
    }

    createButtons();
}

//this function displays the gifs on our page.

function displayTheGifs() {
    var search = $(this).attr('data-gif'); 
    console.log(search);
    var queryAPI = "https://api.giphy.com/v1/gifs/search?api_key=" + 'Mr2U0TOc7cAFm4bGLu9Vvefvd7Xd9Wdw'+ '&q='+ search + '&limit=10'; 

    $.ajax({
        url: queryAPI,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        displayGif.empty();
        for(let x = 0; x < response.data.length; x++){
            var holder = $('<img>');
            holder.attr('src', response.data[x].images.fixed_width.url);
            holder.attr('data-animated', response.data[x].images.fixed_width.url);
            holder.attr('data-current', 'animated');
            holder.attr('data-still', response.data[x].images.fixed_width_still.url);
            holder.addClass('gifs');
            displayGif.append(holder);

        }

    });
}

function playPause() {
    var current = $(this).attr('data-current');
    var still = $(this).attr('data-still');
    var animated = $(this).attr('data-animated');

    if(current === 'animated'){
        $(this).attr('src', still);
        $(this).attr('data-current', 'still');
    } else {
        $(this).attr('src', animated);
        $(this).attr('data-current', 'animated');
    }
}

//initially create all of the buttons
createButtons();
//Create a click event to add a button
searchBtn.on("click", addButtons)

//click a button to search for gifs
$(document).on("click", ".gif-button", displayTheGifs);

//clicking a gif changes it to be still
$(document).on("click", ".gifs", playPause);
