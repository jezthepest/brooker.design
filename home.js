// Function to execute additional action

var element = document.getElementById( 'logo_text' );
var scrambleText = new ScrambleText( element ).play();

// you can start the effect whenever you want

function startFx() {
    scrambleText.start();
		console.log('text scrambled');
}


// Code that runs on click of a link

$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
    	$(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank") {
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".transition_wrapper", { display: "grid" });
        gsap.fromTo(
          ".transition_panel",
          {
             scaleY: 0,
          },
          {
            scaleY: 1,
            transformOrigin: "bottom",
            stagger: 0.1,
            duration: 1.5,
            ease: "power4.out"
          } 
        );
        gsap.from(".transition_logo", {
          yPercent: 140,
          duration: 1,
          delay: 0.25,
          ease: "power4.out",
          onComplete: () => {
              window.location = destination;
          } 
        });
       
	var scrambleText = new ScrambleText( document.getElementById( 'logo_text' ) ).start();

      }
    });
  
  // On click of the back button
  window.onpageshow = function(event){
  	if (event.persisted) {
    	window.location.reload();
    }
  }
});
