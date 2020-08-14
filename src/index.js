const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

const confirmationHTML = `<div id="tooltip-helper-confirmation" class="tooltip-helper-confirmation">
  <div id="tour-desc" class="tour-desc"></div>
  <div class="tour-buttons">
    <button id="tooltip-helper-confirmation-yes" class="tooltip-helper-confirmation-yes">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="tooltip-helper-confirmation-no">No</button>
  </div>
</div>`;

const nextButtonHTML = `<button id="tooltip-helper-next-sequence" class="btn btn-sm btn-primary mt-2 float-right">Next</button>`;

var sequenceIndex = 0;

const createStage = (sequence) => {
  const { element, description } = sequence;
  const backdrop = document.getElementById("tooltip-helper-backdrop");
  backdrop.removeChild(backdrop.firstChild);

  let elem = document.querySelector(element);
  let styles = getComputedStyle(elem);
  let elemBoundaries = elem.getBoundingClientRect();

  let activeElement = document.createElement('div');
  activeElement.classList.add("tooltip-helper-active");
  activeElement.style.top = elemBoundaries.top + 'px';
  activeElement.style.left = elemBoundaries.left + 'px';
  activeElement.style.height = elemBoundaries.height + 'px';
  activeElement.style.width = elemBoundaries.width + 'px';
  activeElement.style.borderRadius = styles.borderRadius;

  let descriptionElement = document.createElement('div');
  descriptionElement.classList.add("tooltip-helper-active-description");
  descriptionElement.style.left = (elemBoundaries.left + 'px');
  descriptionElement.style.top = (elemBoundaries.top + elemBoundaries.height + 10) + 'px';
  descriptionElement.style.zIndex = 999;
  descriptionElement.innerHTML = '<p class="m-0">' + description + '</p>';
  descriptionElement.innerHTML += nextButtonHTML;

  let wrapperElement = document.createElement('div');
  wrapperElement.append(activeElement);
  wrapperElement.append(descriptionElement);

  backdrop.append(wrapperElement);
}

const startSequence = (sequence) => {
  let currentSequence = sequence[sequenceIndex];
  document.getElementById('tooltip-helper-backdrop').style.background = 'transparent';
  return createStage(currentSequence);
}

const endSequence = () => {
  document.getElementById('tooltip-helper-backdrop').style.background = 'transparent';
  const element = document.getElementById("tooltip-helper-backdrop");
  element.parentNode.removeChild(element);
}

exports.createSequence = (data) => {
  const { 
    welcomeText, 
    confirmText, 
    cancelText, 
    sequence 
  } = data;
  
  document.body.innerHTML += backdropHTML;
  document.getElementById('tooltip-helper-backdrop').innerHTML = confirmationHTML;
  document.getElementById('tour-desc').innerText = welcomeText;
  document.getElementById('tooltip-helper-confirmation-yes').innerText = confirmText;
  document.getElementById('tooltip-helper-confirmation-no').innerText = cancelText;
  document.getElementById('tooltip-helper-confirmation-yes').addEventListener('click', startSequence.bind(this, sequence));
  document.getElementById('tooltip-helper-confirmation-no').addEventListener('click', endSequence);
  document.body.addEventListener('click', function(e) {
    if (e.target.id === 'tooltip-helper-next-sequence') {
      sequenceIndex += 1;
      if (sequenceIndex <= (sequence.length - 1)) {
        return createStage(sequence[sequenceIndex]);
      } else {
        document.querySelector(sequence[sequenceIndex - 1].element).classList.remove('tooltip-helper-active-element');
        return endSequence();
      }
    }
  })
}