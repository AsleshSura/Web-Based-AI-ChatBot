# Web-based AI ChatBot

A modern, feature-rich AI chatbot powered by HackClub's AI API. This chatbot runs entirely in the browser with no backend required, making it perfect for hosting on GitHub Pages or any static hosting service.

## ✨ Features

### 🤖 AI Conversation
- **Smart AI responses** powered by HackClub AI API
- **Message formatting** with support for:
  - **Bold text** (`**bold**` or `__bold__`)
  - *Italic text* (`*italic*` or `_italic_`)
  - `Inline code` (`code`)
  - Code blocks (```code```)
  - Numbered and bullet lists
- **Real-time message timestamps**
- **Copy message functionality** for AI responses

### 🎨 User Interface
- **Dark/Light mode toggle** with persistent theme storage
- **Modern gradient design** with smooth animations
- **Responsive layout** that works on desktop and mobile
- **Auto-resizing text input** (up to 120px height)
- **Smooth hover effects** and transitions

### ⌨️ Keyboard Shortcuts & Controls
- **Enter** - Send message
- **Shift+Enter** - New line in message
- **Escape** - Clear current message and focus input
- **Ctrl/Cmd+L** - Focus message input
- **Konami Code** (↑↑↓↓←→←→BA) - Secret easter egg!

### 💾 Data Management
- **Auto-save chat history** using localStorage
- **Persistent across sessions** - your conversations are saved
- **Clear chat button** with confirmation dialog
- **Theme preference memory** - remembers your dark/light mode choice

### 🔧 Technical Features
- **No backend required** - runs entirely in the browser
- **CORS-friendly** API integration
- **Error handling** with user-friendly messages
- **Modern ES6+ JavaScript**
- **CSS Grid and Flexbox** for responsive layout
- **Accessibility features** with proper ARIA labels

## 🚀 Getting Started

### Option 1: Direct File Access
1. Download all files to a folder
2. Open `index.html` in any modern web browser
3. Start chatting!

### Option 2: Local Server (Recommended)
1. Clone or download the repository
2. Start a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have http-server installed)
   npx http-server
   ```
3. Open `http://localhost:8000` in your browser

### Option 3: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your chatbot will be available at `https://yourusername.github.io/repository-name`

## 📁 File Structure

```
Web-based-AI-ChatBot/
├── index.html          # Main HTML file
├── style.css           # All styling and themes
├── script.js           # JavaScript functionality
├── test.html           # Testing page (optional)
├── README.md           # This file
├── LICENSE             # MIT License
└── requirements.txt    # Python dependencies (legacy, not needed)
```

## 🎮 Usage Guide

### Basic Chat
1. Type your message in the input field at the bottom
2. Press **Enter** or click **Send** to send your message
3. The AI will respond automatically
4. Use **Shift+Enter** to add line breaks in your message

### Message Features
- **Copy AI messages**: Hover over AI messages to see the copy button (📋)
- **Timestamps**: All messages show the time they were sent
- **Formatting**: The AI can respond with formatted text, code blocks, and lists

### Theme Toggle
- Click the **🌙/☀️** button in the top-right to switch between light and dark modes
- Your preference is automatically saved and restored on next visit

### Chat Management
- **Clear Chat**: Click the **🗑️** button to clear all message history
- **Auto-save**: All conversations are automatically saved to your browser
- **Persistent**: Your chat history persists between browser sessions

### Keyboard Shortcuts
- **Enter**: Send message
- **Shift+Enter**: New line
- **Escape**: Clear input and focus
- **Ctrl/Cmd+L**: Focus input
- **Konami Code**: Try the classic cheat code for a surprise!

## 🔧 Customization

### Changing the AI Model
Edit the `sendMessage()` function in `script.js` to modify the API endpoint or add parameters:

```javascript
const response = await fetch('https://ai.hackclub.com/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        messages: [
            {role: 'user', content: message}
        ]
        // Add model parameters here if needed
    })
});
```

### Styling Changes
All styles are in `style.css`. Key customizable sections:
- **Colors**: Gradient backgrounds and theme colors
- **Fonts**: Font families and sizes
- **Layout**: Spacing and component sizes
- **Animations**: Transition timing and effects

### Adding Features
The modular JavaScript structure makes it easy to add new features:
- **Message reactions**: Add emoji reactions to messages
- **Export chat**: Download conversations as JSON/text
- **Custom prompts**: Add quick-action buttons
- **Voice input**: Integrate speech-to-text APIs

## 🛠️ Troubleshooting

### Common Issues

**"Sorry, I couldn't connect to the AI"**
- Check your internet connection
- Verify the HackClub AI API is accessible
- Try refreshing the page

**Chat history not saving**
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode
- Try clearing browser cache and cookies

**Layout issues on mobile**
- The app is responsive, but very old browsers may have issues
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

**Dark mode not working**
- Check browser console for JavaScript errors
- Ensure localStorage is working
- Try clearing site data and refreshing

### Browser Compatibility
- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 12+
- **Edge**: 79+

## 🤝 Contributing

Feel free to contribute to this project! Areas for improvement:
- Additional AI model integrations
- More keyboard shortcuts
- Enhanced mobile experience
- Voice input/output
- Message search functionality
- Export/import chat history

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **AI**: Powered by [HackClub AI](https://ai.hackclub.com/)
- **Author**: Aslesh Sura
- **Inspiration**: Modern chat interfaces and AI assistants

## 🔗 Links

- [HackClub AI API](https://ai.hackclub.com/)
- [GitHub Repository](https://github.com/yourusername/Web-based-AI-ChatBot)
- [Live Demo](https://yourusername.github.io/Web-based-AI-ChatBot)

---

**Enjoy chatting with your AI assistant! 🤖✨**