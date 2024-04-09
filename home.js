<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.23/bundled/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/CustomEase.min.js"></script>
<script src="https://unpkg.com/split-type"></script>

<script>
// Optional - Set sticky section heights based on inner content width
// Makes scroll timing feel more natural
function setTrackHeights() {
  $(".l-section-track").each(function (index) {
    let trackWidth = $(this).find(".track").outerWidth();
    $(this).height(trackWidth);
  });
}
setTrackHeights();
window.addEventListener("resize", function () {
  setTrackHeights();
});
</script>


<script>
// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".l-section-track",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  })
  .to(".track", {
    xPercent: -100,
    ease: "slow(0.7,0.7,false)"
  });

</script>


<script>
	
document.addEventListener("DOMContentLoaded", function() {

  window.scrollTo(0, 0);  // Disable vertical scrolling
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
      ease: customEase // Use the CustomEase directly
    });
    tl.to(".loader_progress.is--current", {
      width: "100%",
      duration: loaderDuration,
      ease: customEase // Use the CustomEase directly
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
</script>

<script>

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

function handleLoaderContainerRemoved(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      for (let removedNode of mutation.removedNodes) {
        if (removedNode.classList && removedNode.classList.contains('loader_container')) {
          
          // Call another function here after loader container is removed
          let lenis;
            if (Webflow.env("editor") === undefined) {
              lenis = new Lenis({
                lerp: 0.1,
                wheelMultiplier: 0.6,
                gestureOrientation: "vertical",
                normalizeWheel: false,
                smoothTouch: false
              });
              function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
              }
              requestAnimationFrame(raf);
            }
            $("[data-lenis-start]").on("click", function () {
              lenis.start();
            });
            $("[data-lenis-stop]").on("click", function () {
              lenis.stop();
            });
            $("[data-lenis-toggle]").on("click", function () {
              $(this).toggleClass("stop-scroll");
              if ($(this).hasClass("stop-scroll")) {
                lenis.stop();
              } else {
                lenis.start();
              }
            });
            
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

</script>

   
