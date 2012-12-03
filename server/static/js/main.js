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

    if (navigator.geolocation) {
      var location_timeout = setTimeout("geolocFail()", 10000);

      navigator.geolocation.getCurrentPosition(function(position) {
        clearTimeout(location_timeout);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $("#lat").html(lat);
        $("#lon").html(lng);
        $("#lat").val(lat);
        $("#lon").val(lng);
      }, function(error) {
        clearTimeout(location_timeout);
        alert("error");
      });
      alert("Would you like to share your Geolocation?");
    }
    function geolocFail(){
      console.log("fail");
    }
    return;
  });

  $('.sidebarcontent')[0].addEventListener("touchstart", onTouchStart, false);
  $('.sidebarcontent')[0].addEventListener("touchend", onTouchEnd, false);

  $('.sidebarcontent1')[0].addEventListener("touchstart", onTouchStart1, false);
  $('.sidebarcontent1')[0].addEventListener("touchend", onTouchEnd1, false);

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
    $('#sidebar1').css('background-color','blue');
  }
  
  function onTouchEnd(event) {
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar1').css('background-color','inherit');
  }

  function onTouchStart1(event){
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar2').css('background-color','red');
  }
  
  function onTouchEnd1(event) {
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar2').css('background-color','inherit');
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