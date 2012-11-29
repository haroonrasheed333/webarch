var nothing;
$(document).ready(function() {

    $("input").attr("autocomplete", "off");

    $("#formshortpath").keyup(function() {
        var sPath = $('#formshortpath').val();
        var longURL = $("#formurl").val();
        $("#submitButton").removeAttr('disabled');
        $("#alertShort").html("");

        $(this).removeClass('inputError');
        $(this).addClass('noError');

         if (!(sPath.match(/^[a-zA-Z]+$/)) && !(sPath == "")) {
             //alert("Please enter only letters in short path");
             $("#alertShort").html("Only letters allowed");
             $("#submitButton").attr('disabled', 'disabled');
             $(this).removeClass('noError');
             $(this).addClass('inputError');
             //$("#formshortpath").val("");
             return false;
         }

         if ( longURL == "") {
            $("#submitButton").attr('disabled', 'disabled');
        }
        else{
            $("#submitButton").removeAttr('disabled');
            $("#alert").html("");
        }

        return false;
    });

    $("#formurl").keyup(function() {
        var longURL = $("#formurl").val();
        if ( longURL == "") {
            $("#submitButton").attr('disabled', 'disabled');
        }
        else{
            $("#submitButton").removeAttr('disabled');
            $("#alert").html("");
        }

        return false;
    });

    $("#urlShortner").live('submit', function() {
        var shortPath = $("#formshortpath").val();
        var longURL = $("#formurl").val();

        /*if ( shortPath == "") {
            alert("Please enter a short path");
            $("#formshortpath").focus();
            return false;
        }*/

        if ( longURL == "") {
            $("#alert").html("Please enter an URL");
            $("#formurl").focus();
            return false;
        }

        if (!(shortPath.match(/^[a-zA-Z]+$/)) && !(shortPath == "")) {
            $("#alertShort").html("Please enter only letters in short path");
            $("#formshortpath").val("");
            return false;
        }

        if (!(longURL.slice(0,8) == "https://" || longURL.slice(0,7) == "http://")) {
            $("#formurl").val('http://' + longURL);
        }


        $("#submitButton").attr('disabled', 'disabled');
        $("#alert").html("");

var gl;
 
try {
  if (typeof navigator.geolocation === 'undefined'){
    gl = google.gears.factory.create('beta.geolocation');
  } else {
    gl = navigator.geolocation;
  }
} catch(e) {}
 
if (gl) {
  gl.getCurrentPosition(displayPosition, displayError);
  alert("haroon");
} else {
  alert("Geolocation services are not supported by your web browser.");
}
        return;
	});

    $("#check").live('click', function() {
        var check = $('#check:checked').val();
        if (check=="check"){
            $("#formshortpath").val("");
            $("#shortpath").css("display", "inline")

        }
        else
        {
            $("#formshortpath").val("");
            $("#shortpath").css("display", "none")
        }
        
    });


});

function displayPosition(position) {
  $("#lat").html(position.coords.latitude);
  $("#lon").html(position.coords.longitude);
  $("#lat").val(position.coords.latitude);
  $("#lon").val(position.coords.longitude);
}
 
function displayError(positionError) {
  alert("error");
}

function load()
{
document.urlShortner.reset();
$("#submitButton").attr('disabled', 'disabled');
}


/*function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{
    console.log("haroon");
    //x.innerHTML="Geolocation is not supported by this browser.";
    }
  }
function showPosition(position)
  {   
    alert(position.coords.latitude);
  alert(position.coords.longitude);
  $("#lat").html(position.coords.latitude);
  $("#lon").html(position.coords.longitude);
  $("#lat").val(position.coords.latitude);
  $("#lon").val(position.coords.longitude);

  
  }*/

/*function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  alert("Latitude : " + latitude + " Longitude: " + longitude);
  return "sdbdvb";
}

function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  }else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}
function getLocation(){

   if(navigator.geolocation){
      var options = {timeout:60000};
      nothing = navigator.geolocation.getCurrentPosition(showLocation);
      console.log(nothing);
   }else{
      alert("Sorry, browser does not support geolocation!");
   }
}*/