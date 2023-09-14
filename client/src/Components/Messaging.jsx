import React, { useState, useEffect,useContext } from 'react';
import context from '../Context/context';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:5000'); 

const Chat = () => {
    const {
        state:receiverID
    }=useLocation()
    const {AllMessage,sendMessage}=useContext(context);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sent,setSent]=useState(false)
  const [senderId, setSenderId] = useState(localStorage.getItem('sender')); // Replace with actual user ID
  const [receiverId, setReceiverId] = useState(receiverID); // Replace with actual user ID
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AllMessage(senderId,receiverId)
        if (response.length>0) {
            console.log(response.length,messages.length)
            if(messages.length===response.length){
                return
            }
          setMessages(response);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Fetch initial messages
    fetchMessages();

    // Listen for incoming messages via Socket.io
    socket.on('message', (message) => {
      console.log("message",message)
        setSent(!sent)
    });

    return () => {
      // Clean up Socket.io listeners when the component unmounts
      socket.off('message');
    };
  }, [senderId, receiverId,sent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMessage(senderId,receiverId,message)
      if (response) {
     console.log('Message sent:', message);
        socket.emit('message', message);
        setMessage('');

        // Emit the message via Socket.io
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  return (
    <div>
      <h1>Chat App</h1>
      <div className="message-container">
        {messages.map((msg,i) => (
          <div key={i} className="message">
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
