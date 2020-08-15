import { getElementById, getElement } from './src/utils/helpers';
import { backdropHTML, nextButtonHTML, confirmationHTML } from './src/utils/constants';

const offset = 10;
var sequenceIndex = 0;

const createStage = (sequence) => {
  const { element, description } = sequence;
  const backdrop = getElementById("tooltip-helper-backdrop");
  backdrop.removeChild(backdrop.firstChild);

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
  getElementById("tooltip-helper-confirmation-yes").addEventListener("click", startSequence.bind(this, sequence));
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
}

export default createSequence;