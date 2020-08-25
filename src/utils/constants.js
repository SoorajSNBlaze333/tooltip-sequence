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

export {
  backdropHTML,
  confirmationHTML,
  footerHTML
}