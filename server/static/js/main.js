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
$function(){
	$('#sidebarcontent').addEventListener("touchstart", onTouchStart, false);
		$('#sidebarcontent').addEventListener("touchend", onTouchEnd, false);

	function touchstart(event){
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

		var ctr = document.getElementById('ctr');
		ctr.addEventListener('touchstart', onTouchStart, false);
		ctr.addEventListener('touchend', onTouchEnd, false);
		}

	}