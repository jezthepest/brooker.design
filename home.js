
// Optional - Set sticky section heights based on inner content width
// Makes scroll timing feel more natural

function setTrackHeights() {
  $(".l-section-track-h").each(function (index) {
    let trackWidth = $(this).find(".track-h").outerWidth();
    $(this).height(trackWidth);
  });
}
setTrackHeights();
window.addEventListener("resize", function () {
  setTrackHeights();
});


// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".l-section-track-h",
      start: "top top",
      end: "bottom bottom",
      scrub: .75
    }
  })
  .to(".track-h", {
    xPercent: -100,
    ease: "none",
  });


	
document.addEventListener("DOMContentLoaded", function() {

  window.scrollTo(0, 0);  
  document.body.style.overflowY = "hidden";   // Disable vertical scrolling
  textRevealLoad(); // Execute text reveal animation
 
  var getLoader = document.querySelectorAll('.loader_container');
  
  // Loop through each element and change its display to fixed
  getLoader.forEach(function(element) {
    element.style.display = 'flex';
  });
});

  // Loader animation
  function textRevealLoad() {
    gsap.from(".counter_text", { opacity: 0, y: "100%", duration: 1.2, ease: "power3.out" });
    gsap.from(".loader_progress-container", { scaleX: 0, duration: 1.2, ease: "power3.out", onComplete: playLoadingAnimation });
  }

  function playLoadingAnimation() {
    let customEase = "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
    let counter = { value: 0 };
    let loaderDuration = 10;

    if (sessionStorage.getItem("visited") !== null) {
      loaderDuration = 3;
      counter = { value: 75 };
    }
    sessionStorage.setItem("visited", "true");

    function updateLoaderText() {
      let progress = Math.round(counter.value);
      document.querySelector(".counter_text").textContent = progress;
    }

    let tl = gsap.timeline({ onComplete: endLoaderAnimation });
    tl.to(counter, {
      value: 100,
      onUpdate: updateLoaderText,
      duration: loaderDuration,
      ease: customEase
    });
    tl.to(".loader_progress.is--current", {
      width: "100%",
      duration: loaderDuration,
      ease: customEase 
    }, 0);
  }

  // Text counter-reveal animation 
  const ltext = document.querySelectorAll('.loader_text');
  const tl = gsap.timeline();
  gsap.set(ltext, { y: "-100%", opacity: 0 });
  tl.to(ltext[0], { y: 0, duration: 1.3, opacity: 1, ease: "power3.inOut" })
    .to(ltext[0], { y: "100%", duration: 1.3, opacity: 0, ease: "power3.inOut" })
    .to(ltext[1], { y: 0, duration: 1.3, opacity: 1, ease: "power3.inOut" }, "-=0.95")
    .to(ltext[1], { y: "100%", duration: 1.3, opacity: 0, ease: "power3.inOut" })
    .to(ltext[2], { y: 0, duration: 1.3, opacity: 1, ease: "power3.inOut" }, "-=0.95")
    .to(ltext[2], { y: "100%", duration: 1.3, opacity: 0, ease: "power3.inOut" });

  // Animation to play after loader animation is complete
  function endLoaderAnimation() {
  
    gsap.to(".counter_text", { opacity: 0, y: "100%", duration: 0.7, delay: 0.5, ease: "power3.out" });
    gsap.to(".loader_progress-container", { scaleX: 0, duration: 0.7, delay: 0.5, ease: "power3.out" });
       
    // Remove elements with class 'section1' from the DOM
    const loader_containerElements = document.querySelectorAll('.loader_container');
    setTimeout(() => {
      loader_containerElements.forEach(element => {
        element.parentNode.removeChild(element);
      });
    }, 2000); // Delay of 1 second (1000 milliseconds)
  }


// Homepage load animation

function homeLoadAnimate() {
gsap.set(".l-container.is--nav", { y: "-150%", opacity: 0 });
gsap.to(".l-container.is--nav", { y: 0, duration: 1, opacity: 1, ease: "power3.out" });
  
    // Split text into words and characters
  const heading2 = new SplitType('.hero-parent_heading.is--1', { types: 'chars' });

  // Animate characters into view with a stagger effect

  gsap.from(heading2.chars, {
    opacity: 0,
    y: 60,
    rotateX: 40,
    transformOrigin: "20% 100%",
    ease: "power3.out",
    duration: 3,
    stagger: { amount: 0.2 },
  });
  
  console.log("homeLoadAnimate init");
  
}

// Function to execute when loader container is removed from the DOM
function lenisInit() {
  const lenis = new Lenis()

  lenis.on('scroll', (e) => {
    console.log(e)
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

}

function handleLoaderContainerRemoved(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (let removedNode of mutation.removedNodes) {
        if (removedNode.classList && removedNode.classList.contains('loader_container')) {
          
          lenisInit();
          homeLoadAnimate();  
          console.log("Loader container removed, executing another function...");
        }
      }
    }
  }
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(handleLoaderContainerRemoved);

// Start observing the document for changes
observer.observe(document.body, { childList: true, subtree: true });
  

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
  

// Nested timeline for step2
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
