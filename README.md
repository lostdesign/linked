![Project Status](https://img.shields.io/badge/🏷-v1.3.4-green)

![linked-german-header-linkedin](https://user-images.githubusercontent.com/5164617/123394709-b8b02500-d59f-11eb-9d2a-5d9a133d4659.png)

Linked allows you to write down your thoughts and ideas to link them with days. The app was originally created as a weekend project for my colleagues at work.
We needed an app to offload our brain and write down things that we may need for our daily meetings or other scrum events, things that simply did not fit inside a ticket.

**[You can download linked here for free!](https://github.com/lostdesign/linked/releases/latest)**

Make sure to follow [@uselinked](https://twitter.com/uselinked) on twitter to get the latest news about the project or feel free to check [github discussions](https://github.com/lostdesign/linked/discussions).

## Features

- 📅 Write down anything and as much as you want per day
- ✍️ Support for various text styles as well as todo, list and code blocks
- 🖼 Linked comes in dark and light mode
- 💻 Keyboard navigation for maximum productivity
- 💾 Files are forever yours, you can find them at `~/Documents/linked`
- 🌐 Multi language support

### Coming soon

- ⭐️ Rate your days
- 🗓 Month overview (WIP)
- 🔍 Search across all days (WIP)
- 🔗 link days together for references
- 📶 sync across devices
- (📱 phone support?)
- 🏷 tagging for more refined search

## 💖 Sponsor

The app will always be opensource and free - if you enjoy the app, please consider [becoming a sponsor or leave a tip](https://github.com/sponsors/lostdesign). 


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
