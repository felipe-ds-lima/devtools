const borderRadiusType = document.querySelector("#border-radius-type");
const borderRadiusUnit = document.querySelector("#border-radius-unit");

// Simple Border Radius
const simpleBorderRadius = document.querySelector("#simple-border-radius");
const simpleExampleBox = simpleBorderRadius.querySelector(".example-box");
const topLeftInput = simpleBorderRadius.querySelector("input.top-left");
const topRightInput = simpleBorderRadius.querySelector("input.top-right");
const bottomRightInput = simpleBorderRadius.querySelector("input.bottom-right");
const bottomLeftInput = simpleBorderRadius.querySelector("input.bottom-left");
const pullTopLeft = simpleBorderRadius.querySelector(".pull.top-left");
const pullTopRight = simpleBorderRadius.querySelector(".pull.top-right");
const pullBottomRight = simpleBorderRadius.querySelector(".pull.bottom-right");
const pullBottomLeft = simpleBorderRadius.querySelector(".pull.bottom-left");
let isDraggingTopLeft = false;
let isDraggingTopRight = false;
let isDraggingBottomRight = false;
let isDraggingBottomLeft = false;

// Advanced Border Radius
const advancedBorderRadius = document.querySelector("#advanced-border-radius");
const advancedExampleBox = advancedBorderRadius.querySelector(".example-box");
const topInput = advancedBorderRadius.querySelector("input.top-input");
const rightInput = advancedBorderRadius.querySelector("input.right-input");
const bottomInput = advancedBorderRadius.querySelector("input.bottom-input");
const leftInput = advancedBorderRadius.querySelector("input.left-input");
const pullTop = advancedBorderRadius.querySelector(".pull.top");
const pullRight = advancedBorderRadius.querySelector(".pull.right");
const pullBottom = advancedBorderRadius.querySelector(".pull.bottom");
const pullLeft = advancedBorderRadius.querySelector(".pull.left");
let isDraggingTop = false;
let isDraggingLeft = false;
let isDraggingBottom = false;
let isDraggingRight = false;

// shared
let startDraggingX = 0;
let startDraggingY = 0;

// Output
const output = document.querySelector("#output");
const copyButton = document.querySelector("#copy");
const copiedMessage = document.querySelector(".copied-message");

onTypeChange();
output.addEventListener("click", handleCopy);
copyButton.addEventListener("click", handleCopy);
borderRadiusType.addEventListener("change", onTypeChange);

function handleCopy() {
  const text = output.value;
  navigator.clipboard.writeText(text).then(() => {
    copiedMessage.classList.add("show");
    setTimeout(() => {
      copiedMessage.classList.remove("show");
    }, 2000);
  });
}

// Simple Border Radius
updateSimpleBorderRadius();
updateSimplePullButtonsByValue();

topLeftInput.addEventListener("input", updateSimpleBorderRadius);
topRightInput.addEventListener("input", updateSimpleBorderRadius);
bottomRightInput.addEventListener("input", updateSimpleBorderRadius);
bottomLeftInput.addEventListener("input", updateSimpleBorderRadius);
borderRadiusUnit.addEventListener("change", updateSimpleBorderRadius);
pullTopLeft.addEventListener("mousedown", (event) => {
  isDraggingTopLeft = true;
  startDraggingY = event.clientY - parseInt(pullTopLeft.style.top) + 8;
});
pullTopRight.addEventListener("mousedown", (event) => {
  isDraggingTopRight = true;
  startDraggingY = event.clientY - parseInt(pullTopRight.style.top) + 8;
});
pullBottomRight.addEventListener("mousedown", (event) => {
  isDraggingBottomRight = true;
  startDraggingY = event.clientY + parseInt(pullBottomRight.style.bottom) - 8;
});
pullBottomLeft.addEventListener("mousedown", (event) => {
  isDraggingBottomLeft = true;
  startDraggingY = event.clientY + parseInt(pullBottomLeft.style.bottom) - 8;
});

function updateSimpleBorderRadius() {
  if (borderRadiusUnit.value === "pixels") {
    simpleExampleBox.style.borderTopLeftRadius = `${topLeftInput.value}px`;
    simpleExampleBox.style.borderTopRightRadius = `${topRightInput.value}px`;
    simpleExampleBox.style.borderBottomRightRadius = `${bottomRightInput.value}px`;
    simpleExampleBox.style.borderBottomLeftRadius = `${bottomLeftInput.value}px`;
    output.value = `border-radius: ${topLeftInput.value}px ${topRightInput.value}px ${bottomRightInput.value}px ${bottomLeftInput.value}px;`;
  } else {
    simpleExampleBox.style.borderTopLeftRadius = `${topLeftInput.value}%`;
    simpleExampleBox.style.borderTopRightRadius = `${topRightInput.value}%`;
    simpleExampleBox.style.borderBottomRightRadius = `${bottomRightInput.value}%`;
    simpleExampleBox.style.borderBottomLeftRadius = `${bottomLeftInput.value}%`;
    output.value = `border-radius: ${topLeftInput.value}% ${topRightInput.value}% ${bottomRightInput.value}% ${bottomLeftInput.value}%;`;
  }

  updateSimplePullButtonsByValue();
}

function updateSimplePullButtonsByValue() {
  const minValue = 8;
  const maxValue = 80;
  const percentTopLeft =
    (topLeftInput.value / 100) * (maxValue - minValue) + minValue;
  const percentTopRight =
    (topRightInput.value / 100) * (maxValue - minValue) + minValue;
  const percentBottomRight =
    (bottomRightInput.value / 100) * (maxValue - minValue) + minValue;
  const percentBottomLeft =
    (bottomLeftInput.value / 100) * (maxValue - minValue) + minValue;

  pullTopLeft.style.left = `${percentTopLeft}px`;
  pullTopLeft.style.top = `${percentTopLeft}px`;

  pullTopRight.style.right = `${percentTopRight}px`;
  pullTopRight.style.top = `${percentTopRight}px`;

  pullBottomRight.style.right = `${percentBottomRight}px`;
  pullBottomRight.style.bottom = `${percentBottomRight}px`;

  pullBottomLeft.style.left = `${percentBottomLeft}px`;
  pullBottomLeft.style.bottom = `${percentBottomLeft}px`;
}
function updateAdvancedPullButtonsByValue() {
  const minValue = 0;
  const maxValue = 197;
  const percentTop = (topInput.value / 100) * (maxValue - minValue) + minValue;
  const percentRight =
    (rightInput.value / 100) * (maxValue - minValue) + minValue;
  const percentBottom =
    (bottomInput.value / 100) * (maxValue - minValue) + minValue;
  const percentLeft =
    (leftInput.value / 100) * (maxValue - minValue) + minValue;

  pullTop.style.left = `${percentTop}px`;
  pullRight.style.top = `${percentRight}px`;
  pullBottom.style.right = `${percentBottom}px`;
  pullLeft.style.bottom = `${percentLeft}px`;
}

function onTypeChange() {
  if (borderRadiusType.value === "simple") {
    simpleBorderRadius.style.display = "flex";
    advancedBorderRadius.style.display = "none";
    updateSimpleBorderRadius();
    updateSimplePullButtonsByValue();
  } else {
    simpleBorderRadius.style.display = "none";
    advancedBorderRadius.style.display = "flex";
    updateAdvancedBorderRadius();
    updateAdvancedPullButtonsByValue();
  }
}

// Advanced Border Radius
pullTop.addEventListener("mousedown", (event) => {
  isDraggingTop = true;
  startDraggingX = event.clientX - parseInt(pullTop.style.left);
});
pullRight.addEventListener("mousedown", (event) => {
  isDraggingRight = true;
  startDraggingY = event.clientY - parseInt(pullRight.style.top);
});
pullBottom.addEventListener("mousedown", (event) => {
  isDraggingBottom = true;
  startDraggingX = event.clientX + parseInt(pullBottom.style.right);
});
pullLeft.addEventListener("mousedown", (event) => {
  isDraggingLeft = true;
  startDraggingY = event.clientY + parseInt(pullLeft.style.bottom);
});

function updateAdvancedBorderRadius() {
  const top = topInput.value;
  const inverseTop = 100 - top;
  const right = rightInput.value;
  const inverseRight = 100 - right;
  const bottom = bottomInput.value;
  const inverseBottom = 100 - bottom;
  const left = leftInput.value;
  const inverseLeft = 100 - left;

  const radius = `${top}% ${inverseTop}% ${bottom}% ${inverseBottom}% / ${inverseLeft}% ${right}% ${inverseRight}% ${left}%`;
  advancedExampleBox.style.borderRadius = radius;
  output.value = `border-radius: ${radius}`;
}

// Shared

window.addEventListener("mousemove", (event) => {
  if (!startDraggingX && !startDraggingY) {
    return;
  }
  // Simple
  if (borderRadiusType.value === "simple") {
    let minValue = 8;
    let maxValue = 80;
    if (isDraggingTopLeft) {
      const y = event.clientY;
      const dy = y - startDraggingY;

      let top = minValue + dy;
      if (top < minValue) top = minValue;
      if (top > maxValue) top = maxValue;

      pullTopLeft.style.left = `${top}px`;
      pullTopLeft.style.top = `${top}px`;

      const percent = (top - minValue) / (maxValue - minValue);
      topLeftInput.value = Math.round(percent * 100);
    } else if (isDraggingTopRight) {
      const y = event.clientY;
      const dy = y - startDraggingY;

      let top = minValue + dy;
      if (top < minValue) top = minValue;
      if (top > maxValue) top = maxValue;

      pullTopRight.style.right = `${top}px`;
      pullTopRight.style.top = `${top}px`;

      const percent = (top - minValue) / (maxValue - minValue);
      topRightInput.value = Math.round(percent * 100);
    } else if (isDraggingBottomRight) {
      const y = event.clientY;
      const dy = -(y - startDraggingY);

      let top = minValue + dy;
      if (top < minValue) top = minValue;
      if (top > maxValue) top = maxValue;

      pullBottomRight.style.right = `${top}px`;
      pullBottomRight.style.bottom = `${top}px`;

      const percent = (top - minValue) / (maxValue - minValue);
      bottomRightInput.value = Math.round(percent * 100);
    } else if (isDraggingBottomLeft) {
      const y = event.clientY;
      const dy = -(y - startDraggingY);

      let top = minValue + dy;
      if (top < minValue) top = minValue;
      if (top > maxValue) top = maxValue;

      pullBottomLeft.style.left = `${top}px`;
      pullBottomLeft.style.bottom = `${top}px`;

      const percent = (top - minValue) / (maxValue - minValue);
      bottomLeftInput.value = Math.round(percent * 100);
    }
    updateSimpleBorderRadius();
  } else {
    // Advanced
    let minValue = 0;
    let maxValue = 197;
    if (isDraggingTop) {
      const x = event.clientX;
      const dx = x - startDraggingX;

      let left = dx;
      if (left < minValue) left = minValue;
      if (left > maxValue) left = maxValue;

      pullTop.style.left = `${left}px`;

      const percent = Math.round(
        ((left - minValue) / (maxValue - minValue)) * 100
      );
      topInput.value = percent;
    } else if (isDraggingRight) {
      const y = event.clientY;
      const dy = y - startDraggingY;

      let top = dy;
      if (top < minValue) top = minValue;
      if (top > maxValue) top = maxValue;

      pullRight.style.top = `${top}px`;

      const percent = Math.round(
        ((top - minValue) / (maxValue - minValue)) * 100
      );
      rightInput.value = percent;
    } else if (isDraggingBottom) {
      const x = event.clientX;
      const dx = -(x - startDraggingX);

      let right = dx;
      if (right < minValue) right = minValue;
      if (right > maxValue) right = maxValue;

      pullBottom.style.right = `${right}px`;

      const percent = Math.round(
        ((right - minValue) / (maxValue - minValue)) * 100
      );
      bottomInput.value = percent;
    } else if (isDraggingLeft) {
      const y = event.clientY;
      const dy = -(y - startDraggingY);

      let bottom = dy;
      if (bottom < minValue) bottom = minValue;
      if (bottom > maxValue) bottom = maxValue;

      pullLeft.style.bottom = `${bottom}px`;

      const percent = Math.round(
        ((bottom - minValue) / (maxValue - minValue)) * 100
      );
      leftInput.value = percent;
    }

    updateAdvancedBorderRadius();
  }
});
window.addEventListener("mouseup", (e) => {
  isDraggingTopLeft = false;
  isDraggingTopRight = false;
  isDraggingBottomRight = false;
  isDraggingBottomLeft = false;
  isDraggingTop = false;
  isDraggingRight = false;
  isDraggingBottom = false;
  isDraggingLeft = false;
  startDraggingX = 0;
  startDraggingY = 0;
});
