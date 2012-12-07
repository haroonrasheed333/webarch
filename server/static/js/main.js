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
        navigator.geolocation.getCurrentPosition( 
          function (position) {  
            $("#lat").html(position.coords.latitude);
            $("#lon").html(position.coords.longitude);
            $("#lat").val(position.coords.latitude);
            $("#lon").val(position.coords.longitude);
          }, 
          function (error) {
            console.log(error);
            //alert(error);
          }
        );
      }
      var conf = confirm("Would you like to share your Geolocation?");
      if (conf == true)
      {
        $("#confirm").html("true");
        $("#confirm").val("true");
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

  $('.sidebarcontent').bind('touchstart', onTouchStart);
  $('.sidebarcontent').bind('touchend', onTouchEnd);

  $('.sidebarcontent1').bind('touchstart', onTouchStart1);
  $('.sidebarcontent1').bind('touchend', onTouchEnd1);

  $('.myform').bind('touchstart', onTouchStart2);
  $('.myform').bind('touchend', onTouchEnd2);

  var offset;
  $('.sidebarcontent').bind('touchmove', onTouchMove);

  function onTouchStart(event){
    event.stopPropagation();
    event.preventDefault();
    $('#sidebar1').css('background-color',"blue");
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

  function onTouchStart2(event){
    event.stopPropagation();
    event.preventDefault();
    $('.myform').css('background-color','yellow');
  }
  
  function onTouchEnd2(event) {
    event.stopPropagation();
    event.preventDefault();
    $('.myform').css('background-color','inherit');
  }

  $('#check').on('click',function(e){
    $("sidebar1").css("font-family", "'Trebuchet MS', Arial, Helvetica, sans-serif");
  });
  
  function onTouchMove(event) {
    event.preventDefault();
    var touchmove = event.originalEvent.changedTouches[0];
    if (!offset)
    {
      pos = $(this).position();
      offset = {
        left: touchmove.pageX - pos.left,
        top: touchmove.pageY - pos.top
      };
    }
    var x = touchmove.pageX - offset.left;
    var y = touchmove.pageY - offset.top;
    $(this).css({
      top: y,
      left: x
    });
  }

  // Function to get details of URLS
  function getComments(){
    var commentURL = document.URL+'urllog';  
    console.log(document.URL);  
    console.log(commentURL)   
    $.getJSON(commentURL, function(json){
      var urls = json;
      console.log(json);
      mosturls = urls["most"];
      console.log(mosturls.length)
      if(mosturls.length == 0)
      {
          console.log("No data");
          return;
      }
      else 
      {  
        for(var i = 0; i < mosturls.length; i++) 
        {
          $('#mostfoll').append('<li class="term">'+ mosturls[i][0] +' ('+mosturls[i][1]+')</li>');

        }  
      };

      browserActions = urls["browser"];
      console.log(browserActions.length)
      if(browserActions.length == 0)
      {
        console.log("No data");
        return;
      }
      else 
      {  
        for(var i = 0; i < browserActions.length; i++) 
        {
          $('#browsercount').append('<li class="term">'+ browserActions[i][0] +' ('+browserActions[i][1]+')</li>');

        }  
      };

      trendingURLs = urls["trend"];
      console.log(trendingURLs.length)
      if(trendingURLs.length == 0)
      {
        console.log("No data");
        return;
      }
      else 
      {  
        for(var i = 0; i < trendingURLs.length; i++) 
        {
          $('#trendingurls').append('<li class="term">'+ trendingURLs[i][0] +' ('+trendingURLs[i][1]+')</li>');

        }  
      };
    });
  }
  getComments();
});

function load()
{
  document.urlShortner.reset();
  $("#submitButton").attr('disabled', 'disabled');
  getComments();
}

