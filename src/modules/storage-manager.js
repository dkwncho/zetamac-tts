class StorageManager {
  constructor() {
    this.ttsEnabled = true;
    this.coverEnabled = true;
    this.changeListeners = [];
  }

  async initialize() {
    await this.loadSettings();
    this.setupStorageListener();
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(["ttsEnabled", "coverEnabled"], (data) => {
        this.ttsEnabled = data.ttsEnabled ?? true;
        this.coverEnabled = data.coverEnabled ?? true;
        resolve();
      });
    });
  }

  setupStorageListener() {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.ttsEnabled) {
        this.ttsEnabled = changes.ttsEnabled.newValue;
        this.notifyListeners({ ttsEnabled: this.ttsEnabled });
      }

      if (changes.coverEnabled) {
        this.coverEnabled = changes.coverEnabled.newValue;
        this.notifyListeners({ coverEnabled: this.coverEnabled });
      }
    });
  }

  setTTSEnabled(enabled) {
    this.ttsEnabled = enabled;
    chrome.storage.sync.set({ ttsEnabled: enabled });
  }

  getTTSEnabled() {
    return this.ttsEnabled;
  }

  setCoverEnabled(enabled) {
    this.coverEnabled = enabled;
    chrome.storage.sync.set({ coverEnabled: enabled });
  }

  getCoverEnabled() {
    return this.coverEnabled;
  }

  onSettingsChange(callback) {
    this.changeListeners.push(callback);
  }

  notifyListeners(settings) {
    this.changeListeners.forEach((callback) => callback(settings));
  }
}
