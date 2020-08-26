const offset = 15;
export const getElementById = (id) => document.getElementById(id);
export const getElement = (selector) => document.querySelector(selector);
export const getElements = (selector) => document.querySelectorAll(selector);
export const calculatePositions = (element, description, placement) => {
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
export const calculateArrowPosition = (element, placement, descPosition, active, description) => {
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
};
