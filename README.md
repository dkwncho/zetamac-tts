# Zetamac TTS

A Chrome extension that adds automated text-to-speech and equation cover to [Zetamac arithmetic practice](https://arithmetic.zetamac.com/), reading problems aloud to train auditory mental math.

<img width="3104" height="1810" src="https://github.com/user-attachments/assets/e18b986a-c67f-4538-825d-2ac545ad2a9d" />

## Installation

### From CRX File
1. Download the `zetamac-tts.crx` file
2. Open Chrome and navigate to `chrome://extensions/`
3. Drag and drop the `.crx` file onto the extensions page

### From Source
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the project directory

##

**Important Note**: Due to Chrome's autoplay policy, the browser prevents audio from playing until the user has interacted with the page. This means that <ins>the first equation will not be read aloud automatically</ins>. 

**Workaround**: After the page loads, immediately perform any user interaction such as:
- Pressing any key (arrow keys work well and don't interfere with the game)
- Clicking anywhere on the page

Once you've interacted with the page, TTS will work as expected for all subsequent equations.
