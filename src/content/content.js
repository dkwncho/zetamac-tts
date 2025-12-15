class ZetamacTTS {
  constructor() {
    this.ttsManager = new TTSManager();
    this.storageManager = new StorageManager();
    this.uiManager = new UIManager();
    this.equationReader = new EquationReader(this.ttsManager, this.uiManager);
    this.updateInterval = null;
  }

  async initialize() {
    await this.ttsManager.initialize();
    await this.storageManager.initialize();

    this.setupEventListeners();
    this.uiManager.createButtons();
    this.uiManager.updateTTSButton(this.storageManager.getTTSEnabled());
    this.uiManager.updateReplayButton(this.storageManager.getTTSEnabled());

    if (this.storageManager.getCoverEnabled()) {
      this.uiManager.showEquationCover();
    } else {
      this.uiManager.hideEquationCover();
    }

    this.startEquationReading();
  }

  setupEventListeners() {
    this.storageManager.onSettingsChange((settings) => {
      if (settings.ttsEnabled !== undefined) {
        this.uiManager.updateTTSButton(settings.ttsEnabled);
        this.uiManager.updateReplayButton(settings.ttsEnabled);
        if (!settings.ttsEnabled) {
          this.ttsManager.stop();
        }
      }

      if (settings.coverEnabled !== undefined) {
        if (settings.coverEnabled) {
          this.uiManager.showEquationCover();
        } else {
          this.uiManager.hideEquationCover();
        }
      }
    });

    this.uiManager.onTTSToggle(() => {
      const newState = !this.storageManager.getTTSEnabled();
      this.storageManager.setTTSEnabled(newState);
    });

    this.uiManager.onCoverToggle(() => {
      const newState = !this.storageManager.getCoverEnabled();
      this.storageManager.setCoverEnabled(newState);
    });

    this.uiManager.onReplay(() => {
      if (!this.storageManager.getTTSEnabled()) return;

      const currentEquation = this.equationReader.lastEquation || document.querySelector(".problem")?.textContent;
      if (!currentEquation) return;

      const formattedEquation = this.equationReader.formatEquation(currentEquation);
      this.ttsManager.speak(formattedEquation);
    });
  }

  startEquationReading() {
    this.updateInterval = setInterval(() => {
      if (this.storageManager.getTTSEnabled()) {
        this.equationReader.checkAndRead();
      }
    }, 100);
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.ttsManager.stop();
  }
}

const zetamacTTS = new ZetamacTTS();
zetamacTTS.initialize();
