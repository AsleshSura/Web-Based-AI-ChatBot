const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');

let currentSessionId = null;
let chatSessions = {};

document.addEventListener('DOMContentLoaded', function(){
    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', function(event){
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                return;
            } else {
                event.preventDefault();
                sendMessage();
            }
        }
    });
    messageInput.addEventListener('input', function(){
        autoResizeTextArea(this);
    });

    messageInput.focus();

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    const clearChatButton = document.getElementById('clearChatButton');
    const exportChatButton = document.getElementById('exportChatButton');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const exportJSONBtn = document.getElementById('exportJSON');
    const exportTXTBtn = document.getElementById('exportTXT');
    
    const newSessionBtn = document.getElementById('newSessionBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sessionsSidebar = document.getElementById('sessionsSidebar');
    const sessionsList = document.getElementById('sessionsList');

    newSessionBtn.addEventListener('click', createNewSession);
    sidebarToggle.addEventListener('click', toggleSidebarAndAdjustLayout);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function(){
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    clearChatButton.addEventListener('click', function(){
        clearChat();
    });

    exportChatButton.addEventListener('click', function(){
        exportModal.classList.add('show');
    });

    closeExportModal.addEventListener('click', function(){
        exportModal.classList.remove('show');
    });

    exportModal.addEventListener('click', function(e){
        if (e.target === exportModal) {
            exportModal.classList.remove('show');
        }
    });

    exportJSONBtn.addEventListener('click', function(){
        exportChatAsJSON();
        exportModal.classList.remove('show');
    });

    exportTXTBtn.addEventListener('click', function(){
        exportChatAsText();
        exportModal.classList.remove('show');
    });


    // Load chat history and add welcome message if no history exists
    loadChatSessions();
    
    // Initialize layout optimization
    initializeLayoutOptimization();
});

// Layout optimization functions
function initializeLayoutOptimization() {
    adjustLayoutToFullViewport();
    optimizeChatContainer();
    
    // Listen for window resize
    window.addEventListener('resize', debounce(adjustLayoutToFullViewport, 100));
    
    // Listen for orientation change on mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(adjustLayoutToFullViewport, 100);
    });
}

function adjustLayoutToFullViewport() {
    const body = document.body;
    const chatContainer = document.querySelector('.chat-container');
    const sidebar = document.querySelector('.sessions-sidebar');
    
    // Ensure body uses full viewport
    body.style.height = '100vh';
    body.style.margin = '0';
    body.style.padding = '0';
    body.style.overflow = 'hidden';
    
    // Force sidebar to full height
    if (sidebar) {
        sidebar.style.height = '100vh';
        sidebar.style.margin = '0';
        sidebar.style.maxHeight = '100vh';
    }
    
    // Force chat container to full height and available width
    if (chatContainer) {
        chatContainer.style.height = '100vh';
        chatContainer.style.margin = '0';
        chatContainer.style.maxHeight = '100vh';
        
        // If sidebar is collapsed, take full width
        if (sidebar && sidebar.classList.contains('collapsed')) {
            chatContainer.style.width = '100vw';
        } else {
            // Calculate available width
            const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
            chatContainer.style.width = `calc(100vw - ${sidebarWidth}px)`;
        }
    }
}

function optimizeChatContainer() {
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.getElementById('chatMessages');
    const chatHeader = document.querySelector('.chat-header');
    const inputContainer = document.querySelector('.chat-input-container');
    
    if (chatContainer && chatMessages && chatHeader && inputContainer) {
        // Calculate available height for messages
        const headerHeight = chatHeader.offsetHeight;
        const inputHeight = inputContainer.offsetHeight;
        const availableHeight = window.innerHeight - headerHeight - inputHeight;
        
        // Set messages container to fill available space
        chatMessages.style.height = `${availableHeight}px`;
        chatMessages.style.maxHeight = `${availableHeight}px`;
        chatMessages.style.overflowY = 'auto';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Update sidebar toggle to include layout adjustment
function toggleSidebarAndAdjustLayout() {
    const sessionsSidebar = document.getElementById('sessionsSidebar');
    const chatContainer = document.querySelector('.chat-container');
    
    sessionsSidebar.classList.toggle('collapsed');
    chatContainer.classList.toggle('full-width');
    
    // Adjust layout after toggle
    setTimeout(() => {
        adjustLayoutToFullViewport();
        optimizeChatContainer();
    }, 300); // Wait for CSS transition
}

async function sendMessage() {
    const message = messageInput.value.trim();

    if (message === '') {
        return;
    }

    addMessageToChat(message, 'user');

    messageInput.value = '';
    messageInput.disabled = true;
    messageInput.placeholder = 'AI is thinking...';
    sendButton.disabled = true;
    

    try {
        const response = await fetch('https://ai.hackclub.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [
                    {role: 'user', content: message}
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error response:', data);
            throw new Error(`HTTP ${response.status}: ${JSON.stringify(data)}`);
        } 

        if (data.choices && data.choices[0] && data.choices[0].message) {
            addMessageToChat(data.choices[0].message.content, 'ai');
        } else {
            console.error('Unexpected response format:', data);
            addMessageToChat('Sorry, I received an unexpected response format.', 'ai');
        }

    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, I couldn\'t connect to the AI. Please check your connection and try again.', 'ai');
    }

    messageInput.disabled = false;
    messageInput.placeholder = 'Type your message here... (Shift+Enter for new line)';
    sendButton.disabled = false;

    messageInput.style.height = 'auto';
    messageInput.focus();
}

function addMessageToChat(message, sender) {
    console.log('Adding message:', sender, message); // Debug line

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const messageText = document.createElement('div');

    const formattedMessage = formatAIMessage(message);
    messageText.innerHTML = formattedMessage;

    const timeSpan = document.createElement('span');
    timeSpan.className = 'timestamp';
    timeSpan.textContent = getCurrentTime();

    messageContent.appendChild(messageText);
    messageContent.appendChild(timeSpan);

    messageDiv.appendChild(messageContent);

    if (sender === 'ai') {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        copyButton.title = 'Copy message';
        copyButton.addEventListener('click', function() {
            copyMessageToClipboard(message, copyButton);
        });
        messageDiv.appendChild(copyButton);
    }
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Optimize layout after adding message
    optimizeChatContainer();

    // Save chat history after adding message
    saveChatHistory();

    if (currentSessionId && sender == 'ai') {
        const session = chatSessions[currentSessionId];
        console.log('Checking title generation:', {
            sessionId: currentSessionId,
            messageCount: session?.messages?.length,
            sessionName: session?.name
        });
        if (session && session.messages.length >=2 && session.name.startsWith('Chat ')) {
            console.log('Triggering title generation for session:', currentSessionId);
            setTimeout(() => generateSessionTitle(currentSessionId), 1000);
        }
    }
}

function copyMessageToClipboard(message, button) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';

    navigator.clipboard.writeText(cleanText).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✅';
        button.style.color = '#28a745';

        setTimeout(function() {
            button.innerHTML = originalText;
            button.style.color = '';
        }, 1500);
    }).catch(function(err) {
        const textArea = document.createElement('textarea');
        textArea.value = cleanText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalText = button.innerHTML;
        button.innerHTML = '✅';
        button.style.color = '#28a745';

        setTimeout(function() {
            button.innerHTML = originalText;
            button.style.color = '';
        }, 1500);
    });
}

function formatAIMessage(text) {
    // Replace bold formatting
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Replace italic formatting (simplified to avoid lookbehind issues)
    text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
    text = text.replace(/_([^_\n]+)_/g, '<em>$1</em>');
    
    // Replace code blocks and inline code
    text = text.replace(/```(.*?)```/gs, '<div class="code-block">$1</div>');
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Replace line breaks
    text = text.replace(/\n/g, '<br>');
    
    // Replace numbered lists
    text = text.replace(/^(\d+)\.\s(.+)$/gm, '<div class="list-item numbered">$1. $2</div>');
    
    // Replace bullet lists
    text = text.replace(/^[-*]\s(.+)$/gm, '<div class="list-item bullet">• $1</div>');
    
    return text;
} 


function autoResizeTextArea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}


function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}


document.addEventListener('keydown', function(event){
    if (event.key === 'Escape') {
        messageInput.value = '';
        messageInput.focus();
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        messageInput.focus();
    }
});

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(event) {

    konamiCode.push(event.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        addMessageToChat('🎮 Konami code activated! You found the secret!', 'ai');
        konamiCode = [];
    }
});

// Chat history functions
function saveChatHistory() {
    if (currentSessionId) {
        saveCurrentSession();
        saveChatSessions();
    }
}

function addMessageToHistory(message, sender, timestamp) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const messageText = document.createElement('div');
    messageText.innerHTML = message; // Already formatted

    const timeSpan = document.createElement('span');
    timeSpan.className = 'timestamp';
    timeSpan.textContent = timestamp;

    messageContent.appendChild(messageText);
    messageContent.appendChild(timeSpan);

    messageDiv.appendChild(messageContent);

    if (sender === 'ai') {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        copyButton.title = 'Copy message';
        
        // Extract plain text from formatted message for copying
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = message;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        copyButton.addEventListener('click', function() {
            copyMessageToClipboard(plainText, copyButton);
        });
        messageDiv.appendChild(copyButton);
    }
    chatMessages.appendChild(messageDiv);
}

function clearChat() {
    if (confirm('Are you sure you want to clear this chat session? This cannot be undone.')) {
        if (currentSessionId) {
            chatSessions[currentSessionId].messages = [];
            chatMessages.innerHTML = '';
            addMessageToChat('Hello! I\'m your AI assistant. How can I help you today?', 'ai');
            saveChatSessions();
            renderSessionsList();
        }
    }
}

function exportChatAsJSON() {
    const messages = getChatData();

    const exportData = {
        exportDate: new Date().toISOString(),
        chatTitle: "AI Chat Conversation",
        messageCount: messages.length,
        messages:messages
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    downloadFile(jsonString, 'chat-export.json', 'application/json');
}

function exportChatAsText() {
    const messages = getChatData();

    let textContent = `AI Chat Conversation\n`;
    textContent += `Exported: ${new Date().toLocaleString()}\n`;
    textContent += `Total Messages: ${messages.length}\n`;
    textContent += `${'='.repeat(50)}\n\n`;

    messages.forEach((msg, index) => {
       const sender = msg.sender === 'ai' ? 'AI Assistant' : 'You';
       const cleanContent = stripHTML(msg.content);
       textContent += `[${msg.timestamp}] ${sender}:\n${cleanContent}\n\n`; 
    });

    downloadFile(textContent, 'chat-export.txt', 'text/plain');
}

function getChatData() {
    const messages = [];
    const messageElements = chatMessages.querySelectorAll('.message');

    messageElements.forEach(messageEl => {
        const messageContent = messageEl.querySelector('.message-content > div');
        const timestamp = messageEl.querySelector('.timestamp');
        const isAI = messageEl.classList.contains('ai-message');

        if (messageContent && timestamp) {
            messages.push({
                content: messageContent.innerHTML,
                sender: isAI ? 'ai' : 'user',
                timestamp: timestamp.textContent,
                plainText: stripHTML(messageContent.innerHTML)
            });
        }
    });
    return messages;
}

function stripHTML(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    const exportMessage = `Chat exported successfully as ${filename}!`;
    addMessageToChat(`📥 ${exportMessage}`, 'ai');
}

async function generateSessionTitle(sessionId) {
    const session = chatSessions[sessionId];
    if (!session || session.messages.length < 2) {
        return;
    }

    try {
        const messagesToSummarize = session.messages.slice(0,6);
        let conversationContext = '';

        messagesToSummarize.forEach(msg => {
            const sender = msg.sender == 'user' ? 'User' : 'AI';
            const content = stripHTML(msg.content).substring(0, 200);
            conversationContext += `${sender}: ${content}\n`;
        });

        const titlePrompt = `Based on this conversation, generate a short, descriptive title (max 4 words) that captures the main topic or question. Only respond with the title, nothing else:\n\n${conversationContext}`;

        const response = await fetch('https://ai.hackclub.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {role: 'user', content: titlePrompt}
                ]
            })
        });

        const data = await response.json();

        if (response.ok && data.choices[0] && data.choices[0].message) {
            let newTitle = data.choices[0].message.content.trim();

            newTitle = newTitle.replace(/['"]/g, '').substring(0,30);

            chatSessions[sessionId].name = newTitle;
            saveChatSessions();
            renderSessionsList();

            console.log(`Generated title for session ${sessionId}: ${newTitle}`);
        }
    } catch (error) {
        console.error('Error generating session title:', error);
    }
}

function createNewSession() {
    const sessionId = 'session_' + Date.now();
    const sessionName = `Chat ${Object.keys(chatSessions).length + 1}`;

    chatSessions[sessionId] = {
        id: sessionId,
        name: sessionName,
        messages: [],
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
    };

    switchToSession(sessionId);
    saveChatSessions();
    renderSessionsList();
}

function switchToSession(sessionId) {
    if (currentSessionId) {
        saveCurrentSession();
    }

    currentSessionId = sessionId;

    chatMessages.innerHTML = '';
    const session = chatSessions[sessionId];

    if (session.messages.length === 0) {
        addMessageToChat('Hello! I\'m your AI assistant. How can I help you today?', 'ai');
    } else {
        session.messages.forEach(msg => {
            addMessageToHistory(msg.content, msg.sender, msg.timestamp);
        });
    }

    updateActiveSession();

    chatSessions[sessionId].lastActive = new Date().toISOString();
    saveChatSessions();
    
    // Optimize layout after switching sessions
    setTimeout(() => {
        optimizeChatContainer();
    }, 100);
}

function saveCurrentSession() {
    if (!currentSessionId) return;

    const messages = [];
    const messageElements = chatMessages.querySelectorAll('.message');

    messageElements.forEach(messageEl => {
        const messageContent = messageEl.querySelector('.message-content > div');
        const timestamp = messageEl.querySelector('.timestamp');
        const isAI = messageEl.classList.contains('ai-message');

        if (messageContent && timestamp) {
            messages.push({
                content: messageContent.innerHTML,
                sender: isAI ? 'ai': 'user',
                timestamp: timestamp.textContent
            });
        }
    });

    chatSessions[currentSessionId].messages = messages;
    chatSessions[currentSessionId].lastActive = new Date().toISOString();
}

function renderSessionsList() {
    sessionsList.innerHTML = '';

    const sortedSessions = Object.values(chatSessions).sort((a,b) => new Date(b.lastActive) - new Date(a.lastActive));

    sortedSessions.forEach(session => {
        const sessionEl = document.createElement('div');
        sessionEl.className = 'session-item';
        sessionEl.dataset.sessionId = session.id;

        if (session.id === currentSessionId) {
            sessionEl.classList.add('active');
        }

        const preview = session.messages.length > 0 ? stripHTML(session.messages[session.messages.length - 1].content).substring(0, 50) + '...' : 'New conversation';

        sessionEl.innerHTML = `
            <div class="session-title">${session.name}</div>
            <div class="session-preview">${preview}</div>
            <div class="session-date">${new Date(session.lastActive).toLocaleDateString()}</div>
        `;

        sessionEl.addEventListener('click', () => switchToSession(session.id));
        sessionsList.appendChild(sessionEl);
    });
}

function updateActiveSession() {
    document.querySelectorAll('.session-item').forEach(item => {
        item.classList.remove('active');
    });

    const activeItem = document.querySelector(`[data-session-id="${currentSessionId}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

function loadChatSessions() {
    const saved = localStorage.getItem('chatSessions');

    if (saved) {
        chatSessions = JSON.parse(saved);

        if (Object.keys(chatSessions).length > 0) {
            const lastSession = Object.values(chatSessions).sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive))[0];
            switchToSession(lastSession.id);
        } else {
            createNewSession();
        }
    } else {
        createNewSession();
    }

    renderSessionsList();
}

function saveChatSessions() {
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
}