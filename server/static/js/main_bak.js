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
$(function() {
        $( "#draggable" ).draggable();
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

    $('.sidebarcontent').bind("touchstart", onTouchStart, false);
    $('.sidebarcontent').bind("touchend", onTouchEnd, false);

  //   $('.sidebarcontent').on("mouseover", function () {
  //       $('#sidebar1').css('background-color','yellow');
  //       alert("You just did mouseover");
  //  });
  //    $('.sidebarcontent').on("mouseout", function () {
  //      $('#sidebar1').css('background-color','inherit');
  // });

  $('.draggable1').bind('touchmove',function(e){
      e.preventDefault();
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      var elm = $(this).offset();
      var x = touch.pageX - elm.left;
      var y = touch.pageY - elm.top;
      if(x < $(this).width() && x > 0){
        if(y < $(this).height() && y > 0){
                  alert("touch moved");
                    console.log(touch.pageY+' '+touch.pageX);
        }
      }
  });

   


});

$.fn.draggable = function() {
        var offset = null;
        var start = function(e) {
          var orig = e.originalEvent;
          var pos = $(this).position();
          offset = {
            x: orig.changedTouches[0].pageX - pos.left,
            y: orig.changedTouches[0].pageY - pos.top
          };
        };
        var moveMe = function(e) {
          e.preventDefault();
          var orig = e.originalEvent;
          $(this).css({
            top: orig.changedTouches[0].pageY - offset.y,
            left: orig.changedTouches[0].pageX - offset.x
          });
        };
        $('.draggable').bind("touchmove", moveMe);
      };

function load()
{
  document.urlShortner.reset();
  $("#submitButton").attr('disabled', 'disabled');
}