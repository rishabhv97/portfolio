// Grab all the cards
const cards = document.querySelectorAll('.deck-card');
let activeIndex = -1; // -1 means no card is currently selected

// 1. Define the coordinates for the "Fanned Out" state
const fanPositions = [
  { rotation: -12, x: -180, y: 40, zIndex: 1 },
  { rotation: -4, x: -60, y: 10, zIndex: 2 },
  { rotation: 4, x: 60, y: 10, zIndex: 3 },
  { rotation: 12, x: 180, y: 40, zIndex: 4 }
];

// 2. Define the coordinates for the "Stacked at the bottom" state
const stackPositions = [
  { rotation: 0, x: -100, y: 240, scale: 0.35, zIndex: 1 },
  { rotation: 0, x: -33, y: 240, scale: 0.35, zIndex: 2 },
  { rotation: 0, x: 33, y: 240, scale: 0.35, zIndex: 3 },
  { rotation: 0, x: 100, y: 240, scale: 0.35, zIndex: 4 }
];

// Initialize the cards instantly into their fanned positions
cards.forEach((card, i) => {
  gsap.set(card, { 
    ...fanPositions[i], 
    scale: 1, 
    autoAlpha: 1 // Makes them visible
  });
});

// The main click function
function handleCardClick(clickedIndex) {
  
  if (activeIndex === clickedIndex) {
    // SCENARIO A: Clicking the active card closes it. Return all to fan.
    activeIndex = -1;
    
    cards.forEach((card, i) => {
      gsap.to(card, {
        duration: 0.8,
        ease: "power3.out", // Smooth deceleration
        rotation: fanPositions[i].rotation,
        x: fanPositions[i].x,
        y: fanPositions[i].y,
        scale: 1,
        zIndex: fanPositions[i].zIndex,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      });
    });

  } else {
    // SCENARIO B: Opening a card. Center it, stack the rest.
    activeIndex = clickedIndex;
    let stackIdx = 0;

    cards.forEach((card, i) => {
      if (i === clickedIndex) {
        // Animate the clicked card to the center
        gsap.to(card, {
          duration: 0.8,
          ease: "back.out(1.2)", // Adds a tiny, premium "bounce" at the end
          rotation: 0,
          x: 0,
          y: -60,
          scale: 1.1,
          zIndex: 10,
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)"
        });
      } else {
        // Animate the un-clicked cards to the bottom stack
        gsap.to(card, {
          duration: 0.8,
          ease: "power3.out",
          rotation: stackPositions[stackIdx].rotation,
          x: stackPositions[stackIdx].x,
          y: stackPositions[stackIdx].y,
          scale: stackPositions[stackIdx].scale,
          zIndex: stackPositions[stackIdx].zIndex,
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
        });
        stackIdx++;
      }
    });
  }
}