"use client"

import { useState, useRef, useEffect } from "react"
import "./messages.css"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "Hey, I saw we matched! Would love to chat about potentially being roommates.",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Jamie Smith",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "What time would work for you to meet up and discuss the apartment?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Taylor Wilson",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "I think we'd be great roommates! Let me know what you think.",
    timestamp: "Monday",
    unread: false,
  },
  {
    id: 4,
    name: "Jordan Lee",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "Thanks for the chat! Looking forward to meeting in person.",
    timestamp: "Last week",
    unread: false,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hey, I saw we matched! Would love to chat about potentially being roommates.",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi Alex! Thanks for reaching out. I'd love to chat about it too.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    senderId: 1,
    text: "Great! So I noticed we have a lot of compatible preferences. I especially like that you're also a night owl since I often work late.",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    senderId: "me",
    text: 'Yes, that\'s definitely important! I also noticed we both listed "quiet" as a preferred quality. What are your thoughts on having guests over?',
    timestamp: "10:38 AM",
  },
  {
    id: 5,
    senderId: 1,
    text: "I'm fine with occasional guests, but I prefer advance notice. I'm not big on parties or large gatherings at home. How about you?",
    timestamp: "10:40 AM",
  },
]

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    const message = {
      id: messages.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: messages.length + 2,
        senderId: selectedConversation,
        text: "That sounds good! Let's discuss more details when we meet.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 2000)
  }

  const handleAIAssist = async () => {
    setIsGeneratingAI(true)
    try {
      // Simulate AI response generation
      setTimeout(() => {
        setNewMessage("That sounds great! I'd love to learn more about your preferences and schedule a time to meet.")
        setIsGeneratingAI(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setIsGeneratingAI(false)
    }
  }

  const selectedUser = conversations.find((conv) => conv.id === selectedConversation)

  return (
    <div className="messages-container">
      <h1 className="messages-title">Messages</h1>

      <div className="messages-layout">
        {/* Conversations List */}
        <div className="conversations-panel">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" placeholder="Search conversations" className="search-input" />
            </div>
          </div>

          <div className="conversations-list">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedConversation === conversation.id ? "active" : ""}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="conversation-content">
                  <div className="avatar">
                    <img src={conversation.image || "/placeholder.svg"} alt={conversation.name} />
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <h3 className="conversation-name">{conversation.name}</h3>
                      <span className="conversation-timestamp">{conversation.timestamp}</span>
                    </div>
                    <p className="conversation-preview">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && <div className="unread-indicator"></div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-panel">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="avatar">
                    <img src={selectedUser?.image || "/placeholder.svg"} alt={selectedUser?.name} />
                  </div>
                  <div className="user-details">
                    <h3 className="user-name">{selectedUser?.name}</h3>
                    <p className="user-status">Online</p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                  </button>
                  <button className="action-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-area">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message-wrapper ${message.senderId === "me" ? "sent" : "received"}`}
                  >
                    {message.senderId !== "me" && (
                      <div className="message-avatar">
                        <img src={selectedUser?.image || "/placeholder.svg"} alt={selectedUser?.name} />
                      </div>
                    )}
                    <div className="message-content">
                      <div className={`message-bubble ${message.senderId === "me" ? "sent" : "received"}`}>
                        <p>{message.text}</p>
                      </div>
                      <p className="message-timestamp">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="message-input-container">
                <form onSubmit={handleSendMessage} className="message-form">
                  <button type="button" className="ai-assist-btn" onClick={handleAIAssist} disabled={isGeneratingAI}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder={isGeneratingAI ? "Generating response with AI..." : "Type a message..."}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                    disabled={isGeneratingAI}
                  />
                  <button type="submit" className="send-btn" disabled={isGeneratingAI || newMessage.trim() === ""}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                    </svg>
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="empty-chat">
              <div className="empty-chat-content">
                <p className="empty-chat-title">Select a conversation to start messaging</p>
                <p className="empty-chat-subtitle">Or find new matches to connect with</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
