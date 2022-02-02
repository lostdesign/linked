![Project Status](https://img.shields.io/badge/🏷-v1.4.1-green) ![Project downloads](https://img.shields.io/github/downloads/lostdesign/linked/total) ![discord](https://img.shields.io/discord/884747974859702352?label=discord)

![linked-banner](https://user-images.githubusercontent.com/5164617/132354376-44ba85f3-bb21-448e-8c12-4e0fe9af2543.png)


Linked allows you to write down your thoughts and ideas to link them with days. The app was originally created as a weekend project for my colleagues at work.
We needed an app to offload our brain and write down things that we may need for our daily meetings or other scrum events, things that simply did not fit inside a ticket.

**[You can download linked here for free!](https://github.com/lostdesign/linked/releases/latest)**

Make sure to follow [@uselinked](https://twitter.com/uselinked) on twitter to get the latest news about the project or feel free to check [github discussions](https://github.com/lostdesign/linked/discussions).

### Join the discord at [https://discord.gg/uNjJzZvccr](https://discord.gg/uNjJzZvccr)

## Features

- 📅 Write down anything and as much as you want per day
- 🔍 Search across all days
- ✍️ Support for various text styles as well as todo, list and code blocks
- 🖼 Linked comes in dark and light mode
- 💻 Keyboard navigation for maximum productivity
- 💾 Files are forever yours, you can find them at `~/Documents/linked`
- 🌐 Multi language support

### Coming soon

- 🔗 link days together for references (next)
- 🗓 Month overview (next)
- ⭐️ Rate your days
- 📶 sync across devices
- (📱 phone support?)

## 💖 Sponsor

The app will always be opensource and free - if you enjoy the app, please consider [becoming a sponsor or leave a tip](https://github.com/sponsors/lostdesign). 


## Keyboard Shortcuts

<details>
  <summary>Keyboard Shortcuts</summary>

  **Search** <kbd>Cmd or Ctrl</kbd> + <kbd>K.</kbd>

  **Today** <kbd>Cmd or Ctrl</kbd> + <kbd>.</kbd>

  **Next Day** <kbd>Cmd or Ctrl</kbd> + <kbd>N</kbd>

  **Previous Day** <kbd>Cmd or Ctrl</kbd> + <kbd>P</kbd>

  **Next Week** <kbd>Cmd or Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>

  **Previous Week** <kbd>Cmd or Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>

  **Settings** <kbd>Cmd or Ctrl</kbd> + <kbd>,</kbd>

  **Leave Settings** <kbd>Esc</kbd>
  
  **Exit Code Block** <kbd>Cmd or Ctrl</kbd> + <kbd>Enter</kbd>
</details>


## Contributing
Please check [Contributing.md](/CONTRIBUTING.md) first before opening a pull request please.

<details>
  <summary>How to run locally</summary>

  1. Check your node version, it must be v15 or newer
  
  ```
  node --version
  ```
  
  2. Clone the repository
  
  ```
  git clone https://github.com/lostdesign/linked.git
  ```
  
  3. Install project dependencies
  
  ```
  yarn
  ```
  
  4. Start the application
  
  ```
  yarn electron:serve
  ```
</details>
