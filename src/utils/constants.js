const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

const confirmationHTML = `<div id="tooltip-helper-confirmation" class="tooltip-helper-confirmation">
  <div id="tour-desc" class="tour-desc"></div>
  <div class="tour-buttons">
    <button id="tooltip-helper-confirmation-yes" class="tooltip-helper-confirmation-yes">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="tooltip-helper-confirmation-no">No</button>
  </div>
</div>`;

const prevButtonHTML = `<button id="tooltip-helper-prev-sequence" class="tooltip-helper-prev-sequence mt-2">Previous</button>`;

const nextButtonHTML = `<button id="tooltip-helper-next-sequence" class="tooltip-helper-next-sequence mt-2 ml-2">Next</button>`;

export {
  backdropHTML,
  confirmationHTML,
  prevButtonHTML,
  nextButtonHTML
}