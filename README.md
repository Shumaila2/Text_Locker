<div align="center">

# 🔐 Text Locker

**Password-protected notes that live only in your browser** 🗝️

![HTML](https://img.shields.io/badge/HTML%20%2F%20CSS%20%2F%20JS-no%20server-1f6f78?logo=html5&logoColor=white)
![Platform](https://img.shields.io/badge/Phone%20%2B%20PC-browser-1f6f78?logo=googlechrome&logoColor=white)
![Status](https://img.shields.io/badge/Status-v1.0%20working-2f7a16)

</div>

A small web app for keeping private text, like passwords or things you want to remember, behind one password.

It started as a Python script that locked text into a data file and opened a temporary file for editing. It was rebuilt as a single web page, so it works on phones too, and there is no file to open, move or delete.

**Current Version: v1.0 — Working**

🔗 **Try it:** [spiffy-banoffee-de305b.netlify.app](https://spiffy-banoffee-de305b.netlify.app/)

---

## ✨ Features

* 🔒 Everything is locked with **one password** you choose
* 📝 Starts with a single note, so there is nothing to organize
* 🗂️ **Add your own notes** with your own names, like "passwords" or "remember"
* 💾 Save with the button or **Ctrl+S**
* 👁️ A **Show password** box on the create and unlock screens
* 🚫 **No readable file** is ever created, the notes are stored locked inside the browser
* 🔐 The password and your text **never leave your device**
* 📋 **Back up** copies your locked data as text, and **Restore** puts it back
* 📴 Works offline once it has been opened
* 📲 Can be installed like an app on a computer, with its own icon
* 🌗 Follows your light or dark mode
* 📱 Made for phones first, and works on desktop too

---

## 🧠 How It Works

```text
Your password + a random salt
   ↓
PBKDF2 (600,000 rounds) → a strong key, kept in memory only
   ↓
Each note is locked with the key (AES-GCM)
   ↓
Locked text is stored in the browser, never plain text
   ↓
Lock the page, and the key is thrown away
```

When you create the locker, the app also locks a known word. When you unlock, it tries to open that word with your password. If it opens, the password is right. If not, you see "Wrong password".

Everything runs in the browser with its built-in encryption tools (the Web Crypto API). There is no server and no account, and nothing is sent anywhere.

---

## 📁 Project Structure

```text
text-locker/
│
├── index.html
├── manifest.webmanifest
├── sw.js
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
└── README.md
```

| File                    | Purpose                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `index.html`            | The whole locker: the page, the styling, and the JavaScript        |
| `manifest.webmanifest`  | Tells the browser the app's name, colors and icons                 |
| `sw.js`                 | The offline helper that saves the app files for use without internet |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | The app icons               |

> Keep `index.html` at the top level next to the other files. The page, the manifest and the helper all find each other by their file names.

---

## 🔄 Version History

### Python version — Command-Line Vault

The first version: a Python script that locked text with a password and kept it in a data file. A second script opened the text in a temporary file for editing, then locked it again and deleted the temporary file. It was made only for personal use.

### v1.0 — Web Version *(current)*

Rebuilt as a single web page so it could work on phones. The temporary file was replaced by a text box on the page. The password now goes through a slow, salted key process (PBKDF2) instead of a single hash, and the page can be installed like an app and used offline.

---

## 🛠️ Technologies Used

* 🌐 HTML, CSS and JavaScript
* 🔐 Web Crypto API (PBKDF2 with SHA-256, and AES-GCM)
* 💽 `localStorage` for the locked notes
* 📴 Service worker and web manifest (for install and offline use)
* ☁️ Netlify (hosting)

---

## ⚙️ Setup

### Just use it

Open the link above in any browser. On first use, create a password. There is nothing to install.

### Run it yourself

Download the files and open `index.html` in a browser. To test installing and offline use, serve the folder instead, because those features need a secure address:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

<details>
<summary>☁️ Host your own copy</summary>

Upload the folder to any static host, such as Netlify, GitHub Pages or Cloudflare Pages. No build step is needed.

> Every web address keeps its own separate notes. If you move to a new address, back up first and restore there.

</details>

## 📲 Install as an app

On a computer in Chrome or Edge, use the install button in the address bar. On a phone, open the browser menu and choose **Add to Home screen**.

> Installing is optional. The page works the same in a normal browser tab.

---

## 🛡️ What it protects

* ✅ Someone who finds your stored data or your backup text cannot read it without the password
* ✅ Each save uses a fresh random value, so saving the same note twice gives different locked text
* ❌ It cannot help if someone watches you type the password, or if your device has malware
* ❌ A short or common password is still easy to guess, so pick a long one

---

## 🎨 Customizing

| What to change         | Where                                                         |
| ---------------------- | ------------------------------------------------------------- |
| Colors                 | The `:root { ... }` block at the top of the `<style>` section |
| App name and icon name | `manifest.webmanifest` (`name` and `short_name`)              |
| Force everyone to refresh | Change `text-locker-v1` in `sw.js` to a new number         |
| Password strength setting | `ITERATIONS` near the top of the script in `index.html`    |

---

## ⚠️ Current Limitations

* 🔑 **There is no password recovery.** If you forget it, the notes cannot be opened by anyone
* 🧹 Notes live in the browser, so clearing the browser's site data deletes them. Use **Back up** now and then
* 📱 Notes stay on one device and one web address. They do not sync between your phone and your computer, unless you restore a backup
* 🔁 The password can't be changed from inside the app yet
* ⏱️ It does not lock itself automatically after a while. Press **Lock** when you are done
* 📲 Installing as an app did not work on one older phone, where the installed app closed right after opening. The page itself works fine in the browser

---

## 🔮 Future Improvements

> Features listed here are **not part of v1.0 unless they are actually implemented.**

* 🔁 **Change password** from inside the app
* ⏱️ **Auto-lock** after a few minutes without activity
* 📝 Rename notes
* 📤 A download option for the backup, as well as copying it

---

## 🏁 v1.0 — Working

v1.0 is the current working version of the project.

It will only need changes when there is a **real bug, a browser change that affects it, or a practical reason to change how it works.**
