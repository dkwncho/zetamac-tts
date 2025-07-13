class TTSManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.preferredVoice = null;
    this.voiceName = "Aaron";
    this.speechConfig = {
      lang: "en-US",
      rate: 0.9,
      pitch: 0.9,
      volume: 0.9,
    };
  }

  async initialize() {
    this.loadVoices();
    this.setupVoiceChangeListener();
  }

  loadVoices() {
    const voices = this.synth.getVoices();
    this.preferredVoice = voices.find((voice) => voice.name === this.voiceName);
  }

  setupVoiceChangeListener() {
    if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  speak(text) {
    if (!text) return;

    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    Object.assign(utterance, this.speechConfig);

    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
