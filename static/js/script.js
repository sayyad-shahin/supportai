async function sendMessage() {

    const input = document.getElementById('user-input');
    const message = input.value;

    if (message.trim() === '') return;

    const chatBox = document.getElementById('chat-box');

    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerText = message;

    chatBox.appendChild(userDiv);

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message';
    botDiv.innerText = data.response;

    chatBox.appendChild(botDiv);

    input.value = '';

    chatBox.scrollTop = chatBox.scrollHeight;
}