class TooltipSequence {
  #references = {
    // classes
    target: "body",
    next: "tooltip-helper-next-sequence",
    prev: "tooltip-helper-prev-sequence",
    end: "tooltip-helper-end-sequence",
    quit: "tooltip-helper-quit-sequence",
    backdrop: "tooltip-helper-backdrop",
    arrow: "tooltip-helper-arrow",
    arrow_hide: "tooltip-helper-arrow-hide",
    arrow_down: "tooltip-helper-arrow-down",
    arrow_left: "tooltip-helper-arrow-left",
    arrow_up: "tooltip-helper-arrow-up",
    arrow_right: "tooltip-helper-arrow-right",
    active: "tooltip-helper-active",
    active_description: "tooltip-helper-active-description",
    active_description_animate: "tooltip-helper-active-description-animate",
    active_description_text: "tooltip-helper-active-description-text",
    header: "tooltip-helper-header",
    footer: "tooltip-helper-footer",
    disabled_button: "tooltip-disabled-btn",
    stop_scroll: "stop-scroll",
    step_count: "tooltip-helper-sequence-count",
    // text
    next_text: "Next",
    prev_text: "Prev",
    quit_text: "x",
    end_text: "Finish",
  };
  #data = {
    backdropColor: "#1414147e",
    sequence: [],
    onComplete: function() {}
  };
  #index = 0;
  #elementOffset = 15;
  #startPosition = { x: 0, y: 0 };
  #bodyElement = null;
  #backdropElement = null;
  static resizeEventHandler = null;
  static keystrokeEventHandler = null;
  constructor(data) {
    this.#data = { ...this.#data, ...data };
  };
  #getElement(selector) { return document.querySelector(selector) || null };
  #getElementById(id) { return this.#getElement('#' + id) };
  #getBoundingClientRect(element) { return element.getBoundingClientRect() };
  #calculatePositions(element, descBoundaries, placement) {
    const elemBoundaries = element.getBoundingClientRect();
    const position = this.#startPosition;
    const factor = descBoundaries.width > elemBoundaries.width ? -1 : 1;
    const verticalX = Math.round(elemBoundaries.x + (factor * Math.abs(elemBoundaries.width - descBoundaries.width) / 2));
    switch(placement) {
      case 'top': {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y - descBoundaries.height - this.#elementOffset);
        break;
      }
      case 'right': {
        position.x = Math.round(elemBoundaries.x + elemBoundaries.width + this.#elementOffset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      case 'bottom': {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height + this.#elementOffset);
        break;
      }
      case 'left': {
        position.x = Math.round(elemBoundaries.x - descBoundaries.width - this.#elementOffset);
        position.y = Math.round(elemBoundaries.y + elemBoundaries.height / 2 - descBoundaries.height / 2);
        break;
      }
      default: {
        position.x = verticalX;
        position.y = Math.round(elemBoundaries.y - descBoundaries.height - this.#elementOffset);
        break;
      }
    }
    return position;
  };
  #handleEvent(e) {
    if (!e.target || !e.target.id) return;
    const targetId = e.target.id;
    switch(targetId) {
      case this.#references.next: return this.#handleNextStep();
      case this.#references.prev: return this.#handlePreviousStep();
      case this.#references.end: return this.#handleFinalStep();
      case this.#references.quit: return this.#handleFinalStep();
      case this.#references.backdrop: return this.#handleFinalStep();
      default: return;
    }
  };
  #handleResize() {
    try {
      this.#renderSequenceStep();
    } catch (err) {
      throw new Error('Oops something went wrong while resizing!');
    }
  };
  #handleKey(e) {
    const { keyCode, which } = e;
    const keyPressed = which || keyCode || 0;

    if (keyPressed === 39 && this.#index < this.#data.sequence.length - 1) {
      return this.#handleNextStep();
    } else if (keyPressed === 37 && this.#index > 0) {
      return this.#handlePreviousStep();
    } else if (keyPressed === 81) {
      return this.#handleFinalStep();
    }
  };
  #handleNextStep() {
    this.#index += 1;
    return this.#renderSequenceStep();
  };
  #handlePreviousStep() {
    this.#index -= 1;
    return this.#renderSequenceStep();
  };
  #handleFinalStep() {
    const body = this.#getElement(this.#references.target);
    if (!body) return;
    body.classList.remove(this.#references.stop_scroll);
    this.#attachListeners(true);
    this.#index = 0;
    if (this.#data.onComplete) return this.#data.onComplete();   
  };
  #attachListeners(off = false) {
    if (!this.#backdropElement) return;
    try {
      if (off) {
        window.removeEventListener("resize", TooltipSequence.resizeEventHandler);
        TooltipSequence.resizeEventHandler = null;
        window.removeEventListener("keydown", TooltipSequence.keystrokeEventHandler);
        TooltipSequence.resizeEventHandler = null;
        this.#backdropElement.removeEventListener("click", this.#handleEvent.bind(this));
        if (this.#backdropElement.parentNode) this.#backdropElement.parentNode.removeChild(this.#backdropElement);
      } else {
        TooltipSequence.resizeEventHandler = this.#handleResize.bind(this);
        window.addEventListener("resize", TooltipSequence.resizeEventHandler);
        TooltipSequence.keystrokeEventHandler = this.#handleKey.bind(this);
        window.addEventListener("keydown", TooltipSequence.keystrokeEventHandler);
        this.#backdropElement.addEventListener("click", this.#handleEvent.bind(this));
      }
      return true;
    } catch (err) {
      console.log(err)
      return false;
    }
  };
  #createActive(backdrop, elemBoundaries, styles) {
    function addStyles(element) {
      element.style.height = elemBoundaries.height + "px";
      element.style.width = elemBoundaries.width + "px";
      element.style.backgroundColor = "transparent";
      element.style.boxShadow = "0 0 0 9999px " + backdropColor;
      element.style.transform = `translate3d(${elemBoundaries.x}px, ${elemBoundaries.y}px, 0px)`;
      return element;
    }
    const { backdropColor } = this.#data;
    const activeElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active}`);
    const targetEl = this.#getElement(this.#data.sequence[this.#index].element);
    if (!activeElement) {
      const activeElement = document.createElement("div");
      activeElement.setAttribute("id", this.#references.active);
      activeElement.classList.add(this.#references.active);
      backdrop.append(activeElement);
      return addStyles(activeElement, targetEl.className);
    }
    activeElement.removeAttribute("class");
    activeElement.classList.add(this.#references.active);
    return addStyles(activeElement, targetEl.className);
  };
  #createDescription(elem, backdrop, description, active, plcmt) {
    try {

      let descriptionElement = this.#getElement(`#${this.#references.backdrop} .${this.#references.active_description}`);
      let placement = plcmt;
      if (!descriptionElement) {
        descriptionElement = document.createElement("div");
        descriptionElement.style.willChange = "transform";
        descriptionElement.classList.add(this.#references.active_description);
        descriptionElement.innerHTML += `<div class=${this.#references.header}>
          <svg id=${this.#references.quit} class=${this.#references.quit} xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
        </div>`
        descriptionElement.innerHTML += `<p id=${this.#references.active_description_text}></p>`;
        descriptionElement.innerHTML += `<div class=${this.#references.footer}>
          <button id=${this.#references.prev} class=${this.#references.prev}>${this.#references.prev_text}</button>
          <div id=${this.#references.step_count} class=${this.#references.step_count}></div>
          <button id=${this.#references.next} class=${this.#references.next}>${this.#references.next_text}</button>
        </div>`;
        backdrop.append(descriptionElement);
      }
      this.#updateButtons();
  
      const descTextElem = this.#getElement(`#${this.#references.active_description_text}`);
      if (!descTextElem) return;
      if (typeof description === "string") descTextElem.innerHTML = description;
      else descTextElem.appendChild(description);
  
      const countElem = this.#getElementById(this.#references.step_count);
      countElem.innerText = `${this.#index + 1} / ${this.#data.sequence.length}`;
      
      const descBoundaries = this.#getBoundingClientRect(descriptionElement);
      const activeBoundaries = this.#getBoundingClientRect(active);
      const elemBoundaries = this.#getBoundingClientRect(elem);
  
      const constraints = {
        left: activeBoundaries.x,
        right: window.innerWidth - (activeBoundaries.x + activeBoundaries.width)
      }
  
      if (placement === 'top') {
        descriptionElement.style.width = "100%";
      } else if (placement === 'right' && constraints.right < descBoundaries.width) {
        descriptionElement.style.height = "auto";
        const newWidth = constraints.right - 20;
        if (newWidth < 200) placement = 'bottom';
        else descriptionElement.style.width = newWidth + "px";
      } else if (placement === 'bottom') {
        descriptionElement.style.width = "100%";
      } else if (placement === 'left' && constraints.left - 40 < descBoundaries.width) {
        descriptionElement.style.height = "auto";
        const newWidth = constraints.right - 20;
        if (newWidth < 200) placement = 'top';
        else descriptionElement.style.width = newWidth + "px";
      }
  
      // if (window.innerWidth < 480 && window.innerWidth > 20) { 
      //   descriptionElement.style.width = window.innerWidth - 20 + "px";
      // } else {
      //   descriptionElement.style.width = "100%";
      // }
  
      const descDimensions = getComputedStyle(descriptionElement);
      const height = +descDimensions.getPropertyValue('height').replace('px', '');
      const width = +descDimensions.getPropertyValue('width').replace('px', '');
  
      const position = { x: 0, y: 0 };
      position.x = elemBoundaries.x + (elemBoundaries.width / 2) - (width / 2);
      position.y = elemBoundaries.y + (elemBoundaries.height / 2) - (height / 2);
  
      if (placement === 'top') {
        position.y = position.y - (height / 2) - 20;
        const moveX = (width + position.x) - window.innerWidth;
        if (moveX > 0) position.x = position.x - moveX;
      }
      else if (placement === 'right') position.x = position.x + (width / 2) + 45;
      else if (placement === 'bottom') position.y = position.y + (height / 2) + 20;
      else if (placement === 'left') position.x = position.x - (width / 2) - 45;
  
      descriptionElement.style.transform = "translate3d(" + position.x + "px, " + position.y + "px, 0px)";
      return { descBoundaries, descriptionElement }
    } catch (err) {
      console.log(err);
    }
  };
  // #renderArrow(description, newPlacement, desc) {
  //   let arrowElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow}`);
  //   let arrowHideElement = this.#getElement(`#${this.#references.backdrop} #${this.#references.arrow_hide}`);
  //   if (!arrowElement) {
  //     arrowElement = document.createElement("div");
  //     arrowElement.setAttribute("id", this.#references.arrow);
  //     description.append(arrowElement);
  //     // arrowElement.classList.add(this.#references.arrow_hidden);
  //   }
  //   arrowElement.removeAttribute('class');
  //   arrowElement.classList.add(this.#references.arrow);
  //   const transform = { x: 0, y: 0, rotation: -45 };
  //   if (newPlacement === 'top') {
  //     transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
  //     transform.y = transform.y + (this.#arrowSize / 2);
  //   } else if (newPlacement === 'right') {
  //     transform.x = transform.x - (this.#arrowSize / 2);
  //     transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
  //     transform.rotation = 45;
  //   } else if (newPlacement === 'bottom') {
  //     transform.x = transform.x + (desc.width / 2) - (this.#arrowSize / 2);
  //     transform.y = transform.y - (desc.height) + (this.#arrowSize / 2) + 2;
  //     transform.rotation = 135;
  //   } else {
  //     transform.x = transform.x + desc.width - (this.#arrowSize / 2) - 2;
  //     transform.y = transform.y - (desc.height / 2) + (this.#arrowSize / 2);
  //     transform.rotation = 225;
  //   }
  //   arrowElement.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateZ(${transform.rotation}deg)`;
  //   if (!arrowHideElement) {
  //     arrowHideElement = document.createElement("div");
  //     arrowHideElement.setAttribute("id", this.#references.arrow_hide);
  //     description.append(arrowHideElement);
  //     // arrowHideElement.classList.add(this.#references.arrow_hidden);
  //   }
  //   arrowHideElement.removeAttribute('class');
  //   arrowHideElement.classList.add(this.#references.arrow_hide);
  //   transform.x = 0;
  //   transform.y = 0;
  //   transform.rotation = -45;
  //   if (newPlacement === 'top') {
  //     transform.x = transform.x + (desc.width / 2) - (this.#arrowHideSize / 2);
  //     transform.y = transform.y + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
  //   } else if (newPlacement === 'right') {
  //     transform.x = transform.x - (this.#arrowHideSize / 2);
  //     transform.y = transform.y - (desc.height / 2) + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
  //     transform.rotation = 45;
  //   } else if (newPlacement === 'bottom') {
  //     transform.x = transform.x + (desc.width / 2) - (this.#arrowHideSize / 2);
  //     transform.y = transform.y - (desc.height) + (this.#arrowHideSize / 2) + 2 - this.#arrowSize + 2;
  //     transform.rotation = 135;
  //   } else {
  //     transform.x = transform.x + desc.width - (this.#arrowHideSize / 2) - 2;
  //     transform.y = transform.y - (desc.height / 2) + (this.#arrowHideSize / 2) - this.#arrowSize + 2;
  //     transform.rotation = 225;
  //   }
  //   arrowHideElement.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateZ(${transform.rotation}deg)`
  // };
  #updateButtons() {
    const { sequence } = this.#data;
    const prevBtn = this.#getElementById(this.#references.prev);
    const nextBtn = this.#getElementById(this.#references.next);
    const finishBtn = this.#getElementById(this.#references.end);
    if (prevBtn) {
      if (this.#index === 0) {
        prevBtn.setAttribute('disabled', 'true');
        prevBtn.classList.add(this.#references.disabled_button);
      } else {
        prevBtn.removeAttribute('disabled');
        prevBtn.classList.remove(this.#references.disabled_button);
      }
    };
    if (nextBtn) {
      if (sequence.length === 1 || this.#index === sequence.length - 1) {
        nextBtn.innerText = this.#references.end_text;
        nextBtn.setAttribute('id', this.#references.end);
      } else nextBtn.innerText = this.#references.next_text;
    };
    if (finishBtn && this.#index < sequence.length - 1) {
      finishBtn.innerText = this.#references.next_text;
      finishBtn.setAttribute('id', this.#references.next);
    }
    return { prevBtn, nextBtn, finishBtn };
  };
  #renderBackdrop() {
    this.#backdropElement = document.createElement("div");
    this.#backdropElement.id = this.#references.backdrop;
    this.#backdropElement.classList.add(this.#references.backdrop);
    this.#bodyElement.appendChild(this.#backdropElement);
    return this.#backdropElement;
  };
  #renderBodyElement() {
    this.#bodyElement = this.#getElement(this.#references.target);
    return this.#bodyElement;
  };
  #renderSequenceStep() {
    // get the data from the sequence
    try {
      const { element = null, description = "", placement = "bottom" } = this.#data.sequence[this.#index];
      if (!element) return;
  
      const backdrop = this.#backdropElement;
      if (!backdrop) return;
      let block = 'center';
      let newPlacement = placement;
      // for mobile devices
      // if (window.innerWidth <= 480 && (placement === 'left' || placement === 'right')) newPlacement = 'bottom'; 
  
      const elem = this.#getElement(element);
      if (!elem) return this.end();
      const body = this.#bodyElement;
      if (!body) return;
      body.classList.add(this.#references.stop_scroll);
      elem.scrollIntoView({ behavior: 'smooth', block });
  
      const styles = getComputedStyle(elem);
      const elemBoundaries = this.#getBoundingClientRect(elem);
      const activeElement = this.#createActive(backdrop, elemBoundaries, styles);
      const { descriptionElement } = this.#createDescription(elem, backdrop, description, activeElement, newPlacement);
      if (!descriptionElement) return; 
    } catch (err) {
      console.log(err);
    }
  };
  createSequence() {
    try {
      const body = this.#renderBodyElement();
      if (!body) return;
      const backdrop = this.#renderBackdrop();
      if (!backdrop) return;
      const haveAttachedListeners = this.#attachListeners();
      if (!haveAttachedListeners) return;
      this.#renderSequenceStep();
    } catch (err) {
      console.log(err);
      throw new Error('Oops, something went wrong while creating the sequence');
    }
  };
}

function createSequence(config) {
  const ts = new TooltipSequence(config);
  return ts.createSequence();
}

export default createSequence;