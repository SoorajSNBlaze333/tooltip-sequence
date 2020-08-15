var bundle = (function () {
  'use strict';

  const getElementById = (id) => document.getElementById(id);
  const getElement = (selector) => document.querySelector(selector);

  const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

  const confirmationHTML = `<div id="tooltip-helper-confirmation" class="tooltip-helper-confirmation">
  <div id="tour-desc" class="tour-desc"></div>
  <div class="tour-buttons">
    <button id="tooltip-helper-confirmation-yes" class="tooltip-helper-confirmation-yes">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="tooltip-helper-confirmation-no">No</button>
  </div>
</div>`;

  const nextButtonHTML = `<button id="tooltip-helper-next-sequence" class="btn btn-sm btn-primary mt-2 float-right">Next</button>`;

  const offset = 10;
  var sequenceIndex = 0;

  const createStage = (sequence) => {
    const { element, description } = sequence;
    const backdrop = getElementById("tooltip-helper-backdrop");
    // backdrop.removeChild(backdrop.firstChild);

    let elem = getElement(element);
    let styles = getComputedStyle(elem);
    let elemBoundaries = elem.getBoundingClientRect();

    let activeElement = document.createElement("div");
    activeElement.classList.add("tooltip-helper-active");
    activeElement.style.top = elemBoundaries.top + "px";
    activeElement.style.left = elemBoundaries.left + "px";
    activeElement.style.height = elemBoundaries.height + "px";
    activeElement.style.width = elemBoundaries.width + "px";
    activeElement.style.borderRadius = styles.borderRadius;

    let descriptionElement = document.createElement("div");
    descriptionElement.classList.add("tooltip-helper-active-description");
    descriptionElement.style.left = elemBoundaries.left + "px";
    descriptionElement.style.top = elemBoundaries.top + elemBoundaries.height + offset + "px";
    descriptionElement.style.zIndex = 999;
    descriptionElement.innerHTML = "<p class='m-0'>" + description + "</p>";
    descriptionElement.innerHTML += nextButtonHTML;

    let wrapperElement = document.createElement("div");
    wrapperElement.append(activeElement);
    wrapperElement.append(descriptionElement);

    backdrop.append(wrapperElement);
  };

  const startSequence = (sequence) => {
    let currentSequence = sequence[sequenceIndex];
    getElementById("tooltip-helper-backdrop").style.background = "transparent";
    return createStage(currentSequence);
  };

  const endSequence = () => {
    getElementById("tooltip-helper-backdrop").style.background = "transparent";
    const element = getElementById("tooltip-helper-backdrop");
    element.parentNode.removeChild(element);
  };

  const createSequence = (data) => {
    const { welcomeText, confirmText, cancelText, sequence } = data;

    getElement("body").innerHTML += backdropHTML;
    getElementById("tooltip-helper-backdrop").innerHTML = confirmationHTML;
    getElementById("tour-desc").innerText = welcomeText;
    getElementById("tooltip-helper-confirmation-yes").innerText = confirmText;
    getElementById("tooltip-helper-confirmation-no").innerText = cancelText;
    getElementById("tooltip-helper-confirmation-yes").addEventListener("click", startSequence.bind(window, sequence));
    getElementById("tooltip-helper-confirmation-no").addEventListener("click", endSequence);
    getElement('body').addEventListener("click", function (e) {
      if (e.target.id === "tooltip-helper-next-sequence") {
        sequenceIndex += 1;
        if (sequenceIndex <= sequence.length - 1) {
          return createStage(sequence[sequenceIndex]);
        } else {
          getElement(sequence[sequenceIndex - 1].element).classList.remove("tooltip-helper-active-element");
          endSequence();
          getElement("body").removeEventListener("click", function(e) {});
          return;
        }
      }
    });
  };

  var index = { createSequence };

  return index;

}());
