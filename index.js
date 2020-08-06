const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

const confirmationHTML = `<div id="tooltip-helper-confirmation" class="p-3 tooltip-helper-confirmation">
  <div>Do you want to take a tour?</div>
  <div class="mt-2 d-flex justify-content-end align-items-center">
    <button id="tooltip-helper-confirmation-yes" class="btn btn-light btn-sm mr-2">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="btn btn-danger btn-sm">No</button>
  </div>
</div>`;

const nextButtonHTML = `<button id="tooltip-helper-next-sequence" class="btn btn-sm btn-primary ml-2">Next</button>`;

var sequenceIndex = 0;

const createStage = (sequence) => {
  const { element, description } = sequence;
  const backdrop = document.getElementById("tooltip-helper-backdrop");
  backdrop.removeChild(backdrop.firstChild);

  let elem = document.querySelector(element);
  let elemBoundaries = elem.getBoundingClientRect();

  let activeElement = document.createElement('div');
  activeElement.classList.add("tooltip-helper-active");
  activeElement.style.left = (elemBoundaries.left + (elemBoundaries.width/2) - 10) + 'px';
  activeElement.style.top = (elemBoundaries.top + (elemBoundaries.height/2) - 10) + 'px';
  activeElement.style.zIndex = 1000;
  activeElement.style.height = '20px';
  activeElement.style.width = '20px';
  activeElement.style.borderRadius = '10px';

  let descriptionElement = document.createElement('div');
  descriptionElement.classList.add("tooltip-helper-active-description");
  descriptionElement.style.left = (elemBoundaries.left + 'px');
  descriptionElement.style.top = (elemBoundaries.top + elemBoundaries.height + 10) + 'px';
  descriptionElement.style.zIndex = 999;
  descriptionElement.innerHTML = description;

  descriptionElement.innerHTML += nextButtonHTML;

  let wrapperElement = document.createElement('div');
  wrapperElement.append(activeElement);
  wrapperElement.append(descriptionElement);

  backdrop.append(wrapperElement);
}

const startSequence = (sequence) => {
  document.getElementById('tooltip-helper-backdrop').style.background = 'transparent';
  return createStage(sequence);
}

const endSequence = () => {
  document.getElementById('tooltip-helper-backdrop').style.background = 'transparent';
  const element = document.getElementById("tooltip-helper-backdrop");
  element.parentNode.removeChild(element);
}

exports.createSequence = (sequence) => {
  document.body.innerHTML += backdropHTML;
  document.getElementById('tooltip-helper-backdrop').innerHTML = confirmationHTML;
  document.getElementById('tooltip-helper-confirmation-yes').addEventListener('click', function(e) {
    let currentSequence = sequence[sequenceIndex];
    return startSequence(currentSequence);
  });
  document.getElementById('tooltip-helper-confirmation-no').addEventListener('click', endSequence);
  document.body.addEventListener('click', function(e) {
    if (e.target.id === 'tooltip-helper-next-sequence') {
      sequenceIndex += 1;
      if (sequenceIndex <= (sequence.length - 1)) {
        return createStage(sequence[sequenceIndex]);
      } else {
        return endSequence();
      }
    }
  })
}