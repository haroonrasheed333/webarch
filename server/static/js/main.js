//updating the content and sidebar height on resize
$(window).resize(function(){
  pageHeight = $(window).height();
  pageWidth = $(window).width();
  
  if(pageWidth > 767){
    $('#content').css('height', pageHeight - 200);
    $('#sidebar').css('height', pageHeight - 60);
  }
  else {
    $('#content').css('height', 'auto');
    $('#sidebar').css('height', 'auto');
  }
  
});

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
      $("#alertShort").html("Only letters allowed");
      $("#submitButton").attr('disabled', 'disabled');
      $(this).removeClass('noError');
      $(this).addClass('inputError');
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
      } 
      else {
        gl = navigator.geolocation;
      }
    } 
    catch(e) {}
         
    if (gl) {
      gl.getCurrentPosition(displayPosition, displayError);
      alert("haroon");
    } 
    else {
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

  function onTouchStart(event){
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar').css('color','blue');
  }
  
  function onTouchEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar').css('color','white');
  }

  $('#check').on('click',function(e){
    $("sidebar1").css("font-family", "'Trebuchet MS', Arial, Helvetica, sans-serif");
  });

  $('.sidebarcontent').bind("touchstart", onTouchStart, false);
  $('.sidebarcontent').bind("touchend", onTouchEnd, false);
});

function load()
{
  document.urlShortner.reset();
  $("#submitButton").attr('disabled', 'disabled');
}

function displayPosition(position) {
  $("#lat").html(position.coords.latitude);
  $("#lon").html(position.coords.longitude);
  $("#lat").val(position.coords.latitude);
  $("#lon").val(position.coords.longitude);
}
 
function displayError(positionError) {
  alert("error");
}