class UIManager {
  constructor() {
    this.equationCovered = true;
    this.coverOverlay = null;
    this.ttsButton = null;
    this.coverButton = null;
    this.onTTSToggleCallback = null;
    this.onCoverToggleCallback = null;
  }

  createButtons() {
    this.createTTSButton();
    this.createCoverButton();
  }

  createTTSButton() {
    this.ttsButton = document.createElement("button");
    this.ttsButton.id = "tts-toggle-btn";
    this.ttsButton.textContent = "Disable TTS";
    this.ttsButton.style.cssText = `
      position: fixed;
      top: 90px;
      left: 20px;
      z-index: 10000;
      padding: 8px 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
    `;

    this.ttsButton.addEventListener("click", () => {
      if (this.onTTSToggleCallback) {
        this.onTTSToggleCallback();
      }
    });

    document.body.appendChild(this.ttsButton);
  }

  createCoverButton() {
    this.coverButton = document.createElement("button");
    this.coverButton.id = "cover-equation-btn";
    this.coverButton.textContent = "Show Equation";
    this.coverButton.style.cssText = `
      position: fixed;
      top: 50px;
      left: 20px;
      z-index: 10000;
      padding: 8px 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
    `;

    this.coverButton.addEventListener("click", () => {
      if (this.onCoverToggleCallback) {
        this.onCoverToggleCallback();
      }
    });

    document.body.appendChild(this.coverButton);
  }

  updateTTSButton(isEnabled) {
    if (this.ttsButton) {
      this.ttsButton.textContent = isEnabled ? "Disable TTS" : "Enable TTS";
      this.ttsButton.style.backgroundColor = isEnabled ? "#4CAF50" : "#f44336";
    }
  }

  updateCoverButton() {
    if (this.coverButton) {
      this.coverButton.textContent = this.equationCovered ? "Show Equation" : "Hide Equation";
      this.coverButton.style.backgroundColor = this.equationCovered ? "#4CAF50" : "#f44336";
    }
  }

  showEquationCover() {
    if (!this.coverOverlay) {
      this.createCoverOverlay();
    }

    this.positionOverlay();
    this.coverOverlay.style.display = "flex";
    this.equationCovered = true;
    this.updateCoverButton();
  }

  hideEquationCover() {
    if (this.coverOverlay) {
      this.coverOverlay.style.display = "none";
    }
    this.equationCovered = false;
    this.updateCoverButton();
  }

  toggleEquationCover() {
    if (this.equationCovered) {
      this.hideEquationCover();
    } else {
      this.showEquationCover();
    }
  }

  createCoverOverlay() {
    this.coverOverlay = document.createElement("div");
    this.coverOverlay.id = "equation-cover-overlay";
    this.coverOverlay.style.cssText = `
      position: absolute;
      background-color: rgba(0, 0, 0);
      display: flex;
      z-index: 9999;
      border-radius: 4px;
    `;

    document.body.appendChild(this.coverOverlay);
  }

  positionOverlay() {
    const equationElement = document.querySelector(".problem");
    if (!equationElement || !this.coverOverlay) return;

    const rect = equationElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    this.coverOverlay.style.top = rect.top + scrollTop + "px";
    this.coverOverlay.style.left = rect.left + scrollLeft + "px";
    this.coverOverlay.style.width = rect.width + "px";
    this.coverOverlay.style.height = rect.height + "px";
  }

  onTTSToggle(callback) {
    this.onTTSToggleCallback = callback;
  }

  onCoverToggle(callback) {
    this.onCoverToggleCallback = callback;
  }
}
