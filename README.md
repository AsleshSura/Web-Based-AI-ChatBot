# 🤖 Web-Based AI ChatBot

A modern, feature-rich AI chatbot application powered by HackClub's AI API. This sophisticated chat interface runs entirely in the browser with no backend required, making it perfect for hosting on GitHub Pages or any static hosting service.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

## ✨ Complete Feature Overview

### 🤖 AI Integration & Conversation
- **HackClub AI API Integration**: Direct connection to powerful AI models
- **Real-time Chat**: Instant AI responses with typing indicators
- **Smart Message Formatting**: 
  - **Bold text** support (`**bold**` or `__bold__`)
  - *Italic text* support (`*italic*` or `_italic_`)
  - `Inline code` formatting (`` `code` ``)
  - Multi-line code blocks with syntax highlighting (`` ```code``` ``)
  - Numbered lists (1. item)
  - Bullet lists (- item or * item)
- **Error Handling**: Graceful handling of network errors and API failures
- **Message Timestamps**: Real-time timestamp for every message
- **Copy to Clipboard**: One-click copy functionality for AI responses

### 🎨 User Interface & Design
- **Modern Material Design**: Clean, professional interface with gradients
- **Dual Theme System**: 
  - Light mode with blue gradients
  - Dark mode with sophisticated dark palette
  - Persistent theme preference storage
- **Responsive Layout**: 
  - Desktop-optimized experience
  - Mobile-friendly responsive design
  - Adaptive viewport handling
- **Smooth Animations**: 
  - Fade-in message animations
  - Hover effects and transitions
  - Scale transforms on button interactions
- **Visual Feedback**: Loading states, button states, and interaction feedback

### 📂 Session Management System
- **Multiple Chat Sessions**: Create and manage unlimited chat sessions
- **Session Sidebar**: Collapsible sidebar with session list
- **Smart Session Titles**: Auto-generated descriptive titles based on conversation content
- **Session Persistence**: All sessions saved to localStorage
- **Session Switching**: Seamlessly switch between different conversations
- **Session Timestamps**: Track when sessions were created and last accessed
- **Session Preview**: See message previews in session list

### 💾 Advanced Data Management
- **LocalStorage Integration**: Automatic saving of all chat data
- **Cross-Session Persistence**: Data survives browser restarts
- **Real-time Auto-save**: Every message automatically saved
- **Export Functionality**:
  - **JSON Export**: Structured data with full metadata
  - **Text Export**: Clean, readable conversation format
  - **Download Management**: Automatic file downloads
- **Import/Export Modal**: Professional modal interface for data operations

### ⌨️ Keyboard Shortcuts & Accessibility
- **Enter**: Send message instantly
- **Shift+Enter**: Add line breaks in messages
- **Escape**: Clear current message and focus input
- **Ctrl/Cmd+L**: Quick focus to message input
- **Konami Code** (↑↑↓↓←→←→BA): Hidden easter egg feature
- **ARIA Labels**: Full screen reader support
- **Keyboard Navigation**: Complete keyboard accessibility
- **Focus Management**: Proper focus handling throughout app

### � Advanced Layout & Optimization
- **Dynamic Layout Optimization**: 
  - Automatic viewport height adjustment
  - Responsive container sizing
  - Flexbox-based responsive design
- **Sidebar Toggle System**: 
  - Collapsible session sidebar
  - Toggle button remains accessible when collapsed
  - Smooth transition animations
- **Auto-resizing Text Input**: 
  - Dynamic height adjustment (up to 120px)
  - Smooth resize animations
  - Character limit (500 characters)
- **Scroll Management**: Auto-scroll to latest messages

### 🎮 Interactive Features
- **Copy Button**: Hover-to-reveal copy buttons on AI messages
- **Clear Chat**: One-click chat clearing with confirmation dialog
- **Theme Toggle**: Instant theme switching with visual feedback
- **Message Hover Effects**: Interactive message highlighting
- **Button Animations**: Scale and transform effects on interactions

### � Mobile & Cross-Platform Support
- **Responsive Breakpoints**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets for mobile devices
- **Orientation Support**: Handles device rotation gracefully
- **Mobile-Optimized Layout**: Adjusted spacing and sizing for mobile
- **Cross-Browser Compatibility**: Works on all modern browsers

### 🔒 Privacy & Security
- **Client-Side Only**: No data sent to external servers (except AI API)
- **Local Data Storage**: All chat history stored locally
- **No User Tracking**: Privacy-focused design
- **Secure API Communication**: HTTPS-only API requests

### 🎯 Developer Features
- **Modern ES6+ JavaScript**: Clean, maintainable code
- **Modular Architecture**: Well-organized function structure
- **CSS Custom Properties**: Easy theming and customization
- **Debounced Functions**: Performance-optimized event handling
- **Error Logging**: Comprehensive console logging for debugging

## 🚀 Quick Start Guide

### Option 1: Direct Browser Access (Simplest)
1. Download all project files to a folder
2. Double-click `index.html` to open in your browser
3. Start chatting immediately!

### Option 2: Local Development Server (Recommended)
```bash
# Clone or download the repository
git clone [repository-url]
cd Web-based-AI-ChatBot

# Start a local server (choose one):

# Python 3
python -m http.server 8000

# Python 2  
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: GitHub Pages Deployment
1. Fork this repository to your GitHub account
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your chatbot will be live at `https://yourusername.github.io/repository-name`

## 📁 Project Structure

```
Web-based-AI-ChatBot/
├── 📄 index.html          # Main application HTML
├── 🎨 style.css           # Complete styling and themes
├── ⚡ script.js           # Full JavaScript functionality
├── 📝 README.md           # This comprehensive guide
├── 📜 LICENSE             # MIT License file
├── 🔧 app.py              # Optional Flask backend (commented)
└── 🌍 .env                # Environment variables (empty)
```

## 🎮 Complete Usage Guide

### Basic Chat Operations
1. **Send Messages**: Type in the input field and press Enter or click Send
2. **Multi-line Messages**: Use Shift+Enter for line breaks
3. **Copy AI Responses**: Hover over AI messages to reveal copy button
4. **Clear Conversations**: Click the 🗑️ button to clear current chat

### Session Management
1. **Create New Session**: Click the ➕ button in the sidebar
2. **Switch Sessions**: Click on any session in the sidebar list
3. **View Session Preview**: See conversation previews in session list
4. **Toggle Sidebar**: Click the 📁 button to show/hide sessions

### Theme & Customization
1. **Switch Themes**: Click the 🌙/☀️ button for dark/light mode
2. **Persistent Preferences**: Your theme choice is automatically saved
3. **Responsive Design**: Interface adapts to your screen size

### Data Export & Backup
1. **Export Chat**: Click the � button in the header
2. **Choose Format**: Select JSON (with metadata) or TXT (readable)
3. **Automatic Download**: Files download automatically to your device

### Keyboard Power User Features
- **Ctrl/Cmd+L**: Instantly focus message input
- **Escape**: Clear current input and focus
- **Enter**: Send message
- **Shift+Enter**: New line
- **Konami Code**: Try the classic gaming cheat code!

## 🔧 Advanced Customization

### Modifying AI Behavior
Edit the `sendMessage()` function in `script.js`:

```javascript
const response = await fetch('https://ai.hackclub.com/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        messages: [
            {role: 'user', content: message}
        ],
        // Add custom parameters:
        // model: "specific-model-name",
        // temperature: 0.7,
        // max_tokens: 150
    })
});
```

### Theme Customization
Modify CSS custom properties in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --chat-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --border-radius: 1.5vw;
    --message-spacing: 15px;
}
```

### Adding Custom Features
The modular structure supports easy feature additions:

- **Voice Input**: Integrate Web Speech API
- **File Upload**: Add document/image sharing
- **Custom Prompts**: Create quick-action buttons
- **Message Search**: Add conversation search functionality
- **User Profiles**: Multiple user support
- **Chat Rooms**: Multi-user chat capabilities

## 🛠️ Troubleshooting & Support

### Common Issues & Solutions

**❌ "Sorry, I couldn't connect to the AI"**
- ✅ Check your internet connection
- ✅ Verify HackClub AI API is accessible
- ✅ Try refreshing the page
- ✅ Check browser console for error details

**❌ Chat history not saving**
- ✅ Ensure localStorage is enabled in browser
- ✅ Exit private/incognito browsing mode
- ✅ Clear browser cache and try again
- ✅ Check available storage space

**❌ Sidebar won't reopen**
- ✅ This is now fixed! Toggle button remains accessible
- ✅ Look for floating toggle button on left side when collapsed
- ✅ Try refreshing the page if issues persist

**❌ Layout issues on mobile**
- ✅ Use a modern browser (Chrome, Firefox, Safari, Edge)
- ✅ Ensure JavaScript is enabled
- ✅ Try rotating device orientation
- ✅ Clear browser cache

**❌ Theme not switching**
- ✅ Check browser console for JavaScript errors
- ✅ Ensure localStorage is working
- ✅ Try clearing site data

### Browser Compatibility
| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 60+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Opera | 50+ | ✅ Fully Supported |

### Performance Tips
- **Regular Cleanup**: Clear old sessions periodically
- **Storage Management**: Export and clear chat history if needed
- **Browser Updates**: Keep your browser updated for best performance

## 🤝 Contributing & Development

### Areas for Contribution
- 🔌 **Additional AI Integrations** (OpenAI, Claude, Gemini)
- 🎙️ **Voice Features** (Speech-to-text, Text-to-speech)  
- 📱 **Enhanced Mobile Experience**
- 🔍 **Search & Filter Functionality**
- 🎨 **Additional Themes & Customization**
- 🌍 **Internationalization (i18n)**
- ♿ **Enhanced Accessibility Features**
- 📊 **Analytics & Usage Statistics**

### Development Setup
```bash
# Clone the repository
git clone [repository-url]
cd Web-based-AI-ChatBot

# No build process required - edit files directly
# Use any local server for development
python -m http.server 8000

# Open http://localhost:8000 for testing
```

### Code Structure
- **HTML**: Semantic structure with accessibility features
- **CSS**: Mobile-first responsive design with CSS Grid/Flexbox
- **JavaScript**: Modern ES6+ with modular function organization
- **No Dependencies**: Pure vanilla JavaScript, no frameworks required

## 📄 License & Legal

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

### Third-Party Services
- **HackClub AI API**: Used for AI responses (subject to their terms)
- **Browser APIs**: localStorage, clipboard, fetch (all standard web APIs)

## 🙏 Credits & Acknowledgments

- **🤖 AI Power**: [HackClub AI API](https://ai.hackclub.com/)
- **👨‍💻 Developer**: Aslesh Sura
- **🎨 Design Inspiration**: Modern chat interfaces and AI assistants
- **🌟 Special Thanks**: The HackClub community for the amazing AI API

## 🔗 Links & Resources

- **🌐 Live Demo**: [Try it now!](https://asleshsura.github.io/Web-Based-AI-ChatBot/)
- **📚 HackClub AI API**: [Documentation](https://ai.hackclub.com/)
- **🐙 GitHub Repository**: [Source Code](https://github.com/AsleshSura/Web-Based-AI-ChatBot)

---

## 🚀 Ready to Start?

1. **Download** or clone this repository
2. **Open** `index.html` in your browser  
3. **Start chatting** with your AI assistant!

**Experience the future of AI conversation today! 🤖✨**

---

*Made with ❤️ by Aslesh Sura | Powered by HackClub AI*