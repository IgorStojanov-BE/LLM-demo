import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { ScrollToBottom } from 'react-scroll-to-bottom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input) {
      const newMessage = {
        text: input,
        role: 'user',
      };
      setMessages([...messages, newMessage]);

      try {
        const response = await axios.post('/api/chat', { message: input });
        const botMessage = { text: response.data.choices[0].text, role: 'bot' };
        setMessages([...messages, botMessage]);
      } catch (error) {
        console.error(error);
      }

      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <ScrollToBottom className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.text}
          </div>
        ))}
      </ScrollToBottom>
      <InputGroup className="chat-input">
        <FormControl
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} variant="primary">
          Send
        </Button>
      </InputGroup>
    </div>
  );
};

export default Chat;
