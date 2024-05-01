
//3D clip-path animation

gsap.registerPlugin(ScrollTrigger);

  let clipPaths = {
    step1: {
      initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      final: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
    },
    step2: {
      initial: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
      final: 'polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)',
    }
  };

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".l-section.is--showreel",
      start: "center center",
      end: '+=100%',
      scrub: true,
      pin: true,
      pinType: "fixed",
      pinReparent: true,
      markers: true,
      pinSpacing: false
    }
  });

  gsap.set(".content__img", { filter: 'brightness(100%) contrast(100%)' });

  timeline.to(".content__img", {
    scale: 0.4,
    ease: 'sine',
    rotationX: -35,
    rotationY: 35,
    filter: 'brightness(200%) contrast(200%)',
    clipPath: clipPaths.step1.final
  }, 0)

  .to(".content__img-inner", {
    ease: 'sine',
    skewY: 10,
    scaleY: 0.9,
  }, 0)
  

// Nested timeline for step2 of the animation
const nestedTimeline = gsap.timeline();

nestedTimeline.to(".content__img", {
	startAt: { clipPath: clipPaths.step2.initial, filter: 'brightness(200%) contrast(200%)' },
  clipPath: clipPaths.step2.final,
  rotationX: 0,
  rotationY: 0,
  filter: 'brightness(100%) contrast(100%)',
}, 0)

.to(".content__img-inner.is--hidden", { opacity: 1, duration: .001 }, 0)

.to(".content__img-inner.is--hidden", {
	startAt: { skewY: 10, scaleY: 1.2, scaleX: 1.2 },
	skewY: 0,
	scaleY: 1,
  scaleX: 1,
  }, 0)

// Add the nested tl to outer tl
timeline.add(nestedTimeline);

// Animate text

   gsap.from('.intro_heading-text', {
      y: "120%",
      opacity: 0,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '.l-container.is--intro',
        start: 'top bottom-=45%',
      	}
     });

     
// Featued tile animate-in

document.addEventListener("DOMContentLoaded", function() {

    gsap.from(".featured-tile", {
        opacity: 0,
        duration: 2,
        stagger: .2,
        xPercent: 70,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".l-section-track-h",
            start: "top center"
        },
    });
});
        
      
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
