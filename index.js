import { getElementById, getElement, calculateCenter, calculatePositions, calculateArrowPosition } from './src/utils/helpers';
import { backdropHTML, confirmationHTML, footerHTML } from './src/utils/constants';

var sequenceIndex = 0;
var backdropFade = "#1b1b1b8e";

const createStage = (sequence, originalSequence) => {
  const { element, description } = sequence;
  const backdrop = getElementById("tooltip-helper-backdrop");

  let elem = getElement(element);
  if (!elem) return endSequence();
  getElement('body').classList.add('stop-scroll');
  elem.scrollIntoView({ behaviour: 'smooth', block: 'center' });
  let styles = getComputedStyle(elem);
  let elemBoundaries = elem.getBoundingClientRect();
  let position = { x: 0, y: 0 };
  let arrowPosition = { x: 0, y: 0 };

  let activeElement = getElement("#tooltip-helper-backdrop .tooltip-helper-active");
  if (!activeElement) {
    activeElement = document.createElement("div");
    activeElement.classList.add("tooltip-helper-active");
    backdrop.append(activeElement);
  }
  activeElement.style.top = Math.round(elemBoundaries.top) + "px";
  activeElement.style.left = Math.round(elemBoundaries.left) + "px";
  activeElement.style.height = elemBoundaries.height + "px";
  activeElement.style.width = elemBoundaries.width + "px";
  activeElement.style.borderRadius = styles.borderRadius;
  activeElement.style.boxShadow = "0 0 0 9999px " + backdropFade;

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
    if (originalSequence.length === 1) {
      nextBtn.innerText = "Finish";
    } else {
      nextBtn.innerText = "Next";
    }
  } else {
    prevBtn.removeAttribute('disabled', true);
    prevBtn.classList.remove("tooltip-disabled-btn");
    if (sequenceIndex === originalSequence.length - 1) {
      nextBtn.innerText = "Finish";
    } else {
      nextBtn.innerText = "Next";
    }
  }
  getElementById("tooltip-helper-active-description-text").innerHTML = description;

  let arrowElement = getElement("#tooltip-helper-backdrop #tooltip-helper-arrow");
  if (!arrowElement) {
    arrowElement = document.createElement("div");
    arrowElement.setAttribute("id", "tooltip-helper-arrow");
    backdrop.append(arrowElement);
  }

  let placement;
  if (sequence.hasOwnProperty('placement')) {
    placement = sequence.placement;
  } else {
    placement = 'bottom-center';
  }
  position = calculatePositions(elem, activeElement, descriptionElement, placement);
  
  let desc = descriptionElement.getBoundingClientRect();
  if (position.x + desc.width >= window.innerWidth) {
    position.x = Math.round(elemBoundaries.right - desc.width);
  } else if (position.x <= 0) {
    position.x = Math.round(elemBoundaries.x);
    if (desc.width >= window.innerWidth) {
      descriptionElement.style.width = (window.innerWidth - (position.x * 2)) + "px";
    }
  }

  descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
  arrowPosition = calculateArrowPosition(arrowElement, placement, position, activeElement, descriptionElement);
  arrowElement.style.transform = "translate3d(" + arrowPosition.x + "px, " + arrowPosition.y + "px, 0px)";

  if (sequence.hasOwnProperty('events') && events.hasOwnProperty('on')) { events.on(sequence) };
};

const startSequence = (sequence) => {
  let currentSequence = sequence[sequenceIndex];
  const backdrop = getElementById("tooltip-helper-backdrop");
  backdrop.style.background = "transparent";
  backdrop.removeChild(backdrop.firstChild);
  return createStage(currentSequence, sequence);
};

const endSequence = () => {
  getElement('body').classList.remove('stop-scroll');
  const element = getElementById("tooltip-helper-backdrop");
  element.removeEventListener('click', function() {})
  element.style.background = "transparent";
  element.parentNode.removeChild(element);
  sequenceIndex = 0;
};

const next = (sequence) => {
  // eventAfter(sequence[sequenceIndex]);
  sequenceIndex += 1;
  if (sequenceIndex <= sequence.length - 1) {
    return createStage(sequence[sequenceIndex], sequence);
  } else {
    getElement(sequence[sequenceIndex - 1].element).classList.remove("tooltip-helper-active-element");
    getElementById("tooltip-helper-backdrop").removeEventListener("click", function(e) {});
    endSequence();
    return;
  }
}

const prev = (sequence) => {
  sequenceIndex -= 1;
  // eventBefore(sequence[sequenceIndex]);
  if (sequenceIndex >= 0) {
    return createStage(sequence[sequenceIndex], sequence);
  } else {
    getElement(sequence[sequenceIndex + 1].element).classList.remove("tooltip-helper-active-element");
    getElementById("tooltip-helper-backdrop").removeEventListener("click", function(e) {});
    endSequence();
    return;
  }
}

const createSequence = (data) => {
  const { welcomeText, confirmText, cancelText, sequence } = data;
  if (data.hasOwnProperty('backdropColor')) backdropFade = data.backdropColor;
  getElement("body").innerHTML += backdropHTML;
  getElementById("tooltip-helper-backdrop").innerHTML = confirmationHTML;
  getElementById("tour-desc").innerText = welcomeText;
  getElementById("tooltip-helper-confirmation-yes").innerText = confirmText;
  getElementById("tooltip-helper-confirmation-no").innerText = cancelText;
  getElementById("tooltip-helper-backdrop").addEventListener("click", (e) => {
    switch(e.target.id) {
      case 'tooltip-helper-confirmation-yes': return startSequence(sequence);
      case 'tooltip-helper-next-sequence': return next(sequence);
      case 'tooltip-helper-prev-sequence': return prev(sequence);
      case 'tooltip-helper-end-sequence': return endSequence();
      case 'tooltip-helper-confirmation-no': return endSequence();
      default: return;
    }
  });
}

export default createSequence;