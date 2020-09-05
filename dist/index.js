var createSequence=(function(){'use strict';const offset = 15;
const getElementById = (id) => document.getElementById(id);
const getElement = (selector) => document.querySelector(selector);
const calculatePositions = (element, description, placement) => {
  let elemBoundaries = element.getBoundingClientRect();
  let descBoundaries = description.getBoundingClientRect();
  let position = { x: 0, y: 0 };
  let factor = descBoundaries.width > elemBoundaries.width ? -1 : 1;
  const verticalX = Math.round(elemBoundaries.x + (factor * Math.abs(elemBoundaries.width - descBoundaries.width) / 2));
  switch(placement) {
    case 'top': {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y - descBoundaries.height - offset);
      break;
    }
    case 'right': {
      position.x = Math.round(elemBoundaries.x + elemBoundaries.width + offset);
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
      break;
    }
    case 'bottom': {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height + offset);
      break;
    }
    case 'left': {
      position.x = Math.round(elemBoundaries.x - descBoundaries.width - offset);
      position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
      break;
    }
    default: {
      position.x = verticalX;
      position.y = Math.round(elemBoundaries.y - descBoundaries.height - offset);
      break;
    }
  }
  return position;
};
const calculateArrowPosition = (element, placement, descPosition, active, description) => {
  let position = { x: 0, y: 0 };
  let activeBoundaries = active.getBoundingClientRect();
  let descBoundaries = description.getBoundingClientRect();
  switch(placement) {
    case 'top':{
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-down');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y + descBoundaries.height - 10);
      break;
    }
    case 'right': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-left');
      position.x = Math.round(descPosition.x - 10);
      position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
      break;
    }
    case 'bottom': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-up');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y - 10);
      break;
    }
    case 'left': {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-right');
      position.x = Math.round(descPosition.x + descBoundaries.width - 10);
      position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
      break;
    }
    default: {
      element.removeAttribute('class');
      element.classList.add('tooltip-helper-arrow', 'tooltip-helper-arrow-up');
      position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
      position.y = Math.round(descPosition.y - 10);
      break;
    }
  }
  return position;
};const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;
const footerHTML = `<div class="tooltip-helper-footer"><button id="tooltip-helper-end-sequence" class="tooltip-helper-end-sequence">Quit</button><div><button id="tooltip-helper-prev-sequence" class="tooltip-helper-prev-sequence">Previous</button><button id="tooltip-helper-next-sequence" class="tooltip-helper-next-sequence ml-2">Next</button></div></div>`;
var sequenceIndex = 0;
var tooltipData = {
  welcomeText: "Do you want to take the tour of the page?",
  confirmText: "Yes",
  cancelText: "No", 
  backdropColor: "#1b1b1b8e",
  sequence: [],
  onComplete: function() {}
};
const createActiveElement = (backdrop, elemBoundaries, styles) => {
  const { backdropColor } = tooltipData;
  let activeElement = getElement("#tooltip-helper-backdrop .tooltip-helper-active");
  if (!activeElement) {
    activeElement = document.createElement("div");
    activeElement.setAttribute("id", "tooltip-helper-active");
    activeElement.classList.add("tooltip-helper-active");
    backdrop.append(activeElement);
  }
  activeElement.style.top = Math.round(elemBoundaries.top) + "px";
  activeElement.style.left = Math.round(elemBoundaries.left) + "px";
  activeElement.style.height = elemBoundaries.height + "px";
  activeElement.style.width = elemBoundaries.width + "px";
  activeElement.style.borderRadius = styles.borderRadius;
  activeElement.style.boxShadow = "0 0 0 9999px " + backdropColor;
  return activeElement;
};
const createDescriptionElement = (backdrop, description) => {
  const { sequence } = tooltipData;
  let descriptionElement = getElement("#tooltip-helper-backdrop .tooltip-helper-active-description");
  if (!descriptionElement) {
    descriptionElement = document.createElement("div");
    descriptionElement.style.willChange = "transform";
    descriptionElement.classList.add("tooltip-helper-active-description");
    descriptionElement.innerHTML += "<p id='tooltip-helper-active-description-text'></p>";
    descriptionElement.innerHTML += footerHTML;
    backdrop.append(descriptionElement);
  }
  const prevBtn = getElementById("tooltip-helper-prev-sequence");
  const nextBtn = getElementById("tooltip-helper-next-sequence");
  if (sequenceIndex === 0) { 
    prevBtn.setAttribute('disabled', true);
    prevBtn.classList.add("tooltip-disabled-btn");
    if (sequence.length === 1) {
      nextBtn.innerText = "Finish";
    } else {
      nextBtn.innerText = "Next";
    }
  } else {
    prevBtn.removeAttribute('disabled', true);
    prevBtn.classList.remove("tooltip-disabled-btn");
    if (sequenceIndex === sequence.length - 1) {
      nextBtn.innerText = "Finish";
    } else {
      nextBtn.innerText = "Next";
    }
  }
  getElementById("tooltip-helper-active-description-text").innerHTML = description;
  return descriptionElement;
};
const createArrowElement = (backdrop) => {
  let arrowElement = getElement("#tooltip-helper-backdrop #tooltip-helper-arrow");
  if (!arrowElement) {
    arrowElement = document.createElement("div");
    arrowElement.setAttribute("id", "tooltip-helper-arrow");
    backdrop.append(arrowElement);
  }
  return arrowElement;
};
const createStage = () => {
  const { sequence } = tooltipData;
  const currentSequence = sequence[sequenceIndex];
  const { element, description } = currentSequence;
  const backdrop = getElementById("tooltip-helper-backdrop");
  let position = { x: 0, y: 0 };
  let arrowPosition = { x: 0, y: 0 };
  let placement = currentSequence.hasOwnProperty('placement') ? currentSequence.placement : 'bottom';
  if (window.innerWidth <= 400 && (placement === 'left' || placement === 'right')) placement = 'bottom'; 
  let block = 'center';

  const elem = getElement(element);
  if (!elem) return endSequence();
  getElement('body').classList.add('stop-scroll');
  elem.scrollIntoView({ behaviour: 'smooth', block });
  let styles = getComputedStyle(elem);
  let elemBoundaries = elem.getBoundingClientRect();

  let activeElement = createActiveElement(backdrop, elemBoundaries, styles);
  let descriptionElement = createDescriptionElement(backdrop, description);
  let arrowElement = createArrowElement(backdrop);

  position = calculatePositions(elem, descriptionElement, placement);
  
  let desc = descriptionElement.getBoundingClientRect();
  if (position.x + desc.width >= window.innerWidth) {
    position.x = Math.round(elemBoundaries.right - desc.width + 15);
  } else if (position.x <= 0) {
    position.x = Math.round(elemBoundaries.x - 15);
    if (desc.width >= window.innerWidth) {
      descriptionElement.style.width = (window.innerWidth - (position.x * 2)) + "px";
    }
  }
  descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
  arrowPosition = calculateArrowPosition(arrowElement, placement, position, activeElement, descriptionElement);
  arrowElement.style.transform = "translate3d(" + arrowPosition.x + "px, " + arrowPosition.y + "px, 0px)";
  if (sequence.hasOwnProperty('events') && sequence.events.hasOwnProperty('on')) { sequence.events.on(sequence); }};
const endSequence = () => {
  getElement('body').classList.remove('stop-scroll');
  const element = getElementById("tooltip-helper-backdrop");
  element.removeEventListener('click', function() {});
  element.style.background = "transparent";
  element.parentNode.removeChild(element);
  sequenceIndex = 0;
  return tooltipData.onComplete()
};
const toggleSequence = (increment) => {
  const { sequence } = tooltipData;
  sequenceIndex = sequenceIndex + increment;
  if (sequenceIndex >= 0 && sequenceIndex <= sequence.length - 1) {
    return createStage(sequence[sequenceIndex]);
  } else {
    getElement(sequence[sequenceIndex - (1 * increment)].element).classList.remove("tooltip-helper-active-element");
    getElementById("tooltip-helper-backdrop").removeEventListener("click", function(e) {});
    endSequence();
    return;
  }
};
const setupListeners = () => {
  getElementById("tooltip-helper-backdrop").addEventListener("click", (e) => {
    switch(e.target.id) {
      case 'tooltip-helper-next-sequence': return toggleSequence(1);
      case 'tooltip-helper-prev-sequence': return toggleSequence(-1);
      case 'tooltip-helper-end-sequence': 
      case 'tooltip-helper-active': 
      case 'tooltip-helper-backdrop': return endSequence();
      default: return;
    }
  });
};
const createSequence = (data) => {
  tooltipData = { ...tooltipData, ...data };
  getElement("body").innerHTML += backdropHTML;
  setupListeners();
  createStage();
};return createSequence;}());