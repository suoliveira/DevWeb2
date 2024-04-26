const chat = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');

const eventSource = new EventSource('/events');

eventSource.onmessage = function(event) {
  const message = JSON.parse(event.data);
  displayMessage(message);
};


function displayMessage(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chat.appendChild(messageElement);
}


function sendMessage() {
    const message = messageInput.value;
    fetch('/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao enviar mensagem:', error));
  }
  