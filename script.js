
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const loadingIndicator = document.getElementById('loadingIndicator');

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

});

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

    if (sender === 'ai') {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '📋';
        copyButton.title = 'Copy message';
        copyButton.addEventListener('click', function(){
            copyMessageToClipboard(message, copyButton);
        });
        messageContent.appendChild(copyButton);
    }

    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function copyMessageToClipboard(message, button) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';

    navigator.clipboard.writeText(cleanText).then(function(){
        const originalText = button.innerHTML;
        button.innerHTML = '✅';
        button.style.color = '#28a745';

        setTimeout(function(){
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

function showLoading(show) {
    if (show) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
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
        addMessageToChat(' Konami code activated! You found the secret!', 'ai');
        konamiCode = [];
    }
});