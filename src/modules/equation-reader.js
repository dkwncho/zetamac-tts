class EquationReader {
  constructor(ttsManager, uiManager) {
    this.ttsManager = ttsManager;
    this.uiManager = uiManager;
    this.lastEquation = "";
    this.mathReplacements = {
      "+": " plus ",
      "–": " minus ",
      "×": " times ",
      "÷": " divided by ",
    };
  }

  checkAndRead() {
    const equationElement = document.querySelector(".problem");
    if (!equationElement) return;

    const currentEquation = equationElement.textContent;
    if (currentEquation && currentEquation !== this.lastEquation) {
      if (this.uiManager && this.uiManager.equationCovered) {
        this.uiManager.positionOverlay();
      }

      this.lastEquation = currentEquation;
      const formattedEquation = this.formatEquation(currentEquation);
      this.ttsManager.speak(formattedEquation);
    }
  }

  formatEquation(equation) {
    let formatted = equation;
    for (const [symbol, replacement] of Object.entries(this.mathReplacements)) {
      formatted = formatted.replace(new RegExp(`\\${symbol}`, "g"), replacement);
    }

    return formatted;
  }

  reset() {
    this.lastEquation = "";
  }
}
