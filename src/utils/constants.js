const backdropHTML = `<div id="tooltip-helper-backdrop" class="tooltip-helper-backdrop"></div>`;

const confirmationHTML = `<div id="tooltip-helper-confirmation" class="tooltip-helper-confirmation">
  <div id="tour-desc" class="tour-desc"></div>
  <div class="tour-buttons">
    <button id="tooltip-helper-confirmation-yes" class="tooltip-helper-confirmation-yes">Yes</button>
    <button id="tooltip-helper-confirmation-no" class="tooltip-helper-confirmation-no">No</button>
  </div>
</div>`;

const nextButtonHTML = `<button id="tooltip-helper-next-sequence" class="btn btn-sm btn-primary mt-2 float-right">Next</button>`;

export {
  backdropHTML,
  confirmationHTML,
  nextButtonHTML
}