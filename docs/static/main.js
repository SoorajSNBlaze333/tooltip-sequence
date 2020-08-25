var createSequence = (function () {
  'use strict';

  const offset = 15;

  const getElementById = (id) => document.getElementById(id);
  const getElement = (selector) => document.querySelector(selector);

  const calculatePositions = (element, active, description, placement) => {
    let elemBoundaries = element.getBoundingClientRect();
    let activeBoundaries = active.getBoundingClientRect();
    let descBoundaries = description.getBoundingClientRect();
    let position = { x: 0, y: 0 };
    switch(placement) {
      case 'top': {
        position.x = descBoundaries.width > elemBoundaries.width
        ? Math.round(elemBoundaries.x - Math.abs(elemBoundaries.width - descBoundaries.width) / 2)
        : Math.round(elemBoundaries.x + Math.abs(elemBoundaries.width - descBoundaries.width) / 2);
        position.y = Math.round(elemBoundaries.y - descBoundaries.height - offset);
        break;
      }
      case 'right': {
        position.x = Math.round(elemBoundaries.x + elemBoundaries.width + offset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      case 'bottom': {
        position.x = descBoundaries.width > elemBoundaries.width
        ? Math.round(elemBoundaries.x - Math.abs(elemBoundaries.width - descBoundaries.width) / 2)
        : Math.round(elemBoundaries.x + Math.abs(elemBoundaries.width - descBoundaries.width) / 2);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height + offset);
        break;
      }
      case 'left': {
        position.x = Math.round(elemBoundaries.x - descBoundaries.width - offset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      default: {
        position.x = descBoundaries.width > elemBoundaries.width
        ? Math.round(elemBoundaries.x - Math.abs(elemBoundaries.width - descBoundaries.width) / 2)
        : Math.round(elemBoundaries.x + Math.abs(elemBoundaries.width - descBoundaries.width) / 2);
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
        element.classList.add('tooltip-helper-arrow-down');
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
        position.y = Math.round(descPosition.y + descBoundaries.height - 10);
        break;
      }
      case 'right': {
        element.removeAttribute('class');
        element.classList.add('tooltip-helper-arrow-left');
        position.x = Math.round(descPosition.x - 10);
        position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
        break;
      }
      case 'bottom': {
        element.removeAttribute('class');
        element.classList.add('tooltip-helper-arrow-up');
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
        position.y = Math.round(descPosition.y - 10);
        break;
      }
      case 'left': {
        element.removeAttribute('class');
        element.classList.add('tooltip-helper-arrow-right');
        position.x = Math.round(descPosition.x + descBoundaries.width - 10);
        position.y = Math.round(activeBoundaries.y + (activeBoundaries.height / 2) - 20);
        break;
      }
      default: {
        element.removeAttribute('class');
        element.classList.add('tooltip-helper-arrow-up');
        position.x = Math.round(activeBoundaries.x + (activeBoundaries.width / 2) - 20);
        position.y = Math.round(descPosition.y - 10);
        break;
      }
    }
    return position;
  };

  const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

  const confirmationHTML = `<div id="tooltip-helper-confirmation" class="tooltip-helper-confirmation">
  <div id="tour-desc" class="tour-desc"></div>
  <div class="tour-buttons">
    <button id="tooltip-helper-confirmation-yes" class="tooltip-helper-confirmation-yes">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="tooltip-helper-confirmation-no">No</button>
  </div>
</div>`;

  const footerHTML = `<div class="tooltip-helper-footer">
  <button id="tooltip-helper-end-sequence" class="tooltip-helper-end-sequence">Quit</button>
  <div>
    <button id="tooltip-helper-prev-sequence" class="tooltip-helper-prev-sequence">Previous</button>
    <button id="tooltip-helper-next-sequence" class="tooltip-helper-next-sequence ml-2">Next</button>
  </div>
</div>`;

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

    if (sequence.hasOwnProperty('events') && events.hasOwnProperty('on')) { events.on(sequence); }};

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
    element.removeEventListener('click', function() {});
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
  };

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
  };

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
  };

  return createSequence;

}());
