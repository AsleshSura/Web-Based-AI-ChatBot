# 🤖 Web-Based AI ChatBot

A modern, responsive AI chatbot powered by HackClub's AI API. Clean interface, persistent chat sessions, and no backend required - perfect for static hosting.

## 🌐 [Try It Live!](https://asleshsura.github.io/Web-based-AI-ChatBot/)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=white)

## ✨ Key Features

- 🤖 **AI-Powered Chat** - Real-time conversations with HackClub's AI
- 📂 **Multiple Sessions** - Create and manage separate chat conversations  
- 🎨 **Dark/Light Themes** - Toggle between beautiful themes
- 💾 **Auto-Save** - Chat history persists across browser sessions
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 📥 **Export Chats** - Download conversations as JSON or text
- ⌨️ **Keyboard Shortcuts** - Efficient navigation and controls
- 🔒 **Privacy-First** - All data stored locally in your browser

## 🚀 Quick Start

### Option 1: Direct Browser Use
1. Download the project files
2. Double-click `index.html` to open in your browser
3. Start chatting!

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

### Option 3: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in Settings
3. Your chatbot will be live at `https://yourusername.github.io/repository-name`

## 🎮 How to Use

### Basic Chat
- Type messages and press **Enter** to send
- Use **Shift+Enter** for new lines
- Hover over AI messages to copy them
- Click 🗑️ to clear the current chat

### Sessions
- Click ➕ to create a new chat session
- Click 📁 to toggle the sessions sidebar
- Switch between sessions by clicking on them
- Each session saves automatically

### Themes & Export
- Click 🌙/☀️ to switch between dark/light themes
- Click 📥 to export your chat history
- Choose JSON (with metadata) or TXT (readable) format

### Keyboard Shortcuts
- **Ctrl/Cmd+L** - Focus message input
- **Escape** - Clear current input
- **Enter** - Send message
- **Shift+Enter** - New line

## 📁 Project Structure

```
Web-based-AI-ChatBot/
├── index.html    # Main application
├── style.css     # Styling and themes
├── script.js     # JavaScript functionality
├── app.py        # Optional Flask backend (unused)
└── README.md     # This guide
```

## 🔧 Customization

### Change AI Behavior
Edit the API call in `script.js`:

```javascript
// In sendMessage() function
body: JSON.stringify({
    messages: [{role: 'user', content: message}],
    // Add custom parameters:
    temperature: 0.7,
    max_tokens: 150
})
```

### Modify Themes
Update CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --chat-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| AI not responding | Check internet connection, try refreshing |
| Chat history not saving | Enable localStorage, exit private browsing |
| Layout issues | Use modern browser, clear cache |
| Theme not switching | Check console for errors, clear site data |

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Supported |
| Firefox | 60+ | ✅ Supported |
| Safari | 12+ | ✅ Supported |
| Edge | 79+ | ✅ Supported |

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

*Made with ❤️ by Aslesh Sura | Powered by HackClub AI*