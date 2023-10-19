// src/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
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
