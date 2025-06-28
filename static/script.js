
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const loadingIndicator = document.getElementById('loadingIndicator');

document.addEventListener('DOMContentLoaded', function(){
    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', function(event){
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
    messageInput.focus();
});

async function sendMessage() {
    const message = messageInput.value.trim();

    if (message === '') {
        return;
    }

    addMessageToChat(message, 'user');

    messageInput.value = '';
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    showLoading(true);

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message})
        });

        const data = await response.json();

        if (data.status === 'success') {
            addMessageToChat(data.response, 'ai');
        } else {
            addMessageToChat('Sorry, something went wrong. Please try again.', 'ai');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('Sorry, I couldn\'t connect to the AI. Please check your connection and try again.', 'ai');
    }

    messageInput.disabled = false;
    sendButton.disabled = false;
    showLoading(false);

    messageInput.focus();
}

function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = message;

    messageContent.appendChild(messageParagraph);
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoading(show) {
    if (show) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}


document.addEventListener('keydown', function(event){
    if (event.key == 'Escape') {
        messageInput.value = '';
        messageInput.focus()
    }

    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        messageInput.focus()
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