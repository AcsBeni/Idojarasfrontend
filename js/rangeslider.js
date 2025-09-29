document.addEventListener('DOMContentLoaded', () => {
    const rangeMin = document.getElementById('rangeMin');
    const rangeMax = document.getElementById('rangeMax');
    const minVal = document.getElementById('minVal');
    const maxVal = document.getElementById('maxVal');
    const sliderTrack = document.getElementById('sliderTrack');
    
    if (!rangeMin || !rangeMax) {
      console.error('Range inputs not found. Make sure IDs match and the script runs after the DOM.');
      return;
    }
  
    const minGap = 1;
    const min = Number(rangeMin.min);
    const max = Number(rangeMin.max);
  
    // bring the active thumb to the front so it receives pointer events when overlapping
    function bringToFront(target) {
      if (target === rangeMin) {
        rangeMin.style.zIndex = 4;
        rangeMax.style.zIndex = 3;
      } else {
        rangeMax.style.zIndex = 4;
        rangeMin.style.zIndex = 3;
      }
    }
  
    function updateTrack() {
      const p1 = ((Number(rangeMin.value) - min) / (max - min)) * 100;
      const p2 = ((Number(rangeMax.value) - min) / (max - min)) * 100;
      sliderTrack.style.background =
        `linear-gradient(to right, #ddd ${p1}%, #0d6efd ${p1}%, #0d6efd ${p2}%, #ddd ${p2}%)`;
    }
  
    function updateSlider(e) {
      // defensive: ensure we have an event
      if (!e) e = { target: rangeMin };
  
      // ensure thumbs don't cross
      const vMin = Number(rangeMin.value);
      const vMax = Number(rangeMax.value);
  
      if (vMax - vMin <= minGap) {
        if (e.target === rangeMin) {
          rangeMin.value = vMax - minGap;
        } else {
          rangeMax.value = vMin + minGap;
        }
      }
  
      minVal.textContent = rangeMin.value;
      maxVal.textContent = rangeMax.value;
  
      updateTrack();
      // put active thumb on top to avoid the top slider swallowing events when thumbs overlap
      bringToFront(e.target);
      // small debug
      // console.log('updated', rangeMin.value, rangeMax.value);
    }
  
    // events
    rangeMin.addEventListener('input', updateSlider);
    rangeMax.addEventListener('input', updateSlider);
  
    // pointerdown helps on touch/mouse so we can raise the active thumb BEFORE dragging
    rangeMin.addEventListener('pointerdown', (e) => bringToFront(rangeMin));
    rangeMax.addEventListener('pointerdown', (e) => bringToFront(rangeMax));
  
    // initialize visuals
    updateSlider({ target: rangeMin });
  });