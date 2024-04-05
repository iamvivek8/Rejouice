gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var page1Con = document.querySelector(".page1-contant");
var cursor = document.querySelector(".cursor");

// page1Con.addEventListener("mousemove", function (dets) {
//   gsap.to(cursor,{
//       x.dets.x,
//       y.dets.y
//   })
// });

page1Con.addEventListener("mousemove", function (dets) {
  gsap.to(cursor, {
    x: dets.x,
    y: dets.y,
  });
});

page1Con.addEventListener("mouseenter", function () {
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
  });
});
page1Con.addEventListener("mouseleave", function () {
  gsap.to(cursor, {
    scale: 0,
    opacity: 0,
  });
});

function page2ani() {
  gsap.from(".elem h1", {
    y: 120,
    stagger: 0.2,
    duration: 1,
    ScrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 47%",
      end: "top 46%",
      //   markesrs: true,
      scrub: 2,
    },
  });
}
page2ani();

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
});

var tl = gsap.timeline();
tl.from(".loder h3", {
  x: 40,
  opacity: 0,
  duration: 2,
  stagger: 0.1,
});
tl.to(".loder h3", {
  opacity: 0,
  x: -10,
  stagger: 0.1,
});
tl.to(".loder", {
  opacity: 0,
});
tl.to(".loder", {
  display: "none",
});
tl.from(".page1-contant h1 span", {
y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  delay:-0.5
});