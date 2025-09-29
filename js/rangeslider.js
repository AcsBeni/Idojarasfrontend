function updateTrack() {
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const minVal = document.getElementById("minVal");
  const maxVal = document.getElementById("maxVal");
  const sliderTrack = document.getElementById("sliderTrack");

  const min = parseInt(minRange.min);
  const max = parseInt(maxRange.max);

  let minValue = parseInt(minRange.value);
  let maxValue = parseInt(maxRange.value);

  if (minValue >= maxValue) {
    minValue = maxValue - 1;
    minRange.value = minValue;
  }
  if (maxValue <= minValue) {
    maxValue = minValue + 1;
    maxRange.value = maxValue;
  }

  minVal.textContent = minValue;
  maxVal.textContent = maxValue;

  
  
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  sliderTrack.style.left = minPercent + "%";
  sliderTrack.style.width = (maxPercent - minPercent) + "%";
}

updateTrack(); // initialize
