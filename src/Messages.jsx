"use client"

import { useState, useRef, useEffect } from "react"
import "./Messages.css"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Aakriti Arya",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "Hey, I saw we matched! Would love to chat about potentially being roommates.",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Nishtha Sood",
    image: "/assets/nish.jpg",
    lastMessage: "What time would work for you to meet up and discuss the apartment?",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Alok Rathore",
    image: "/placeholder.svg?height=100&width=100",
    lastMessage: "I think we'd be great roommates! Let me know what you think.",
    timestamp: "Monday",
    unread: false,
  },
  {
    id: 4,
    name: "Mansi Bhandari",
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
    text: "Hi bro! Thanks for reaching out. I'd love to chat about it too.",
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
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredConversations, setFilteredConversations] = useState(conversations)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredConversations(conversations)
    } else {
      const filtered = conversations.filter(
        (conversation) =>
          conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredConversations(filtered)
    }
  }, [searchQuery])

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

    // Simulate response
    setTimeout(() => {
      const responses = [
        "That sounds perfect! When would be a good time to meet?",
        "I completely agree with that approach. Let's discuss more details.",
        "Great! I'm excited to learn more about your lifestyle and preferences.",
        "That works for me too! Should we schedule a video call or meet in person?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const responseMessage = {
        id: messages.length + 2,
        senderId: selectedConversation,
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, responseMessage])
    }, 1500 + Math.random() * 1000)
  }

  const handleAIAssist = async () => {
    setIsGeneratingAI(true)
    try {
      setTimeout(() => {
        const aiSuggestions = [
          "That sounds great! I'd love to learn more about your preferences and schedule a time to meet.",
          "I appreciate you reaching out! Could we set up a time to discuss living arrangements in more detail?",
          "Thanks for the message! I'm interested in learning more about your lifestyle and compatibility.",
          "I'd be happy to chat more about this! What would be the best way to continue our conversation?",
        ]
        const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
        setNewMessage(randomSuggestion)
        setIsGeneratingAI(false)
      }, 1200)
    } catch (error) {
      console.error("Error generating AI response:", error)
      setIsGeneratingAI(false)
    }
  }

  const handleProfileClick = (userId, userName) => {
    // Navigate to user profile - you can implement your routing logic here
    console.log(`Navigating to profile of ${userName} (ID: ${userId})`)
    // For now, just show an alert
    alert(`Opening ${userName}'s profile...`)
    // In a real app, you might use: 
    // router.push(`/profile/${userId}`)
    // or window.location.href = `/profile/${userId}`
  }

  const selectedUser = conversations.find((conv) => conv.id === selectedConversation)

  return (
    <div className="messages-container">
      <h1 className="messages-title">💬 Messages</h1>

      <div className="messages-layout">
        {/* Conversations List */}
        <div className="conversations-panel">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search conversations..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="conversations-list">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`conversation-item ${selectedConversation === conversation.id ? "active" : ""}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="conversation-content">
                  <div 
                    className="avatar profile-clickable" 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleProfileClick(conversation.id, conversation.name)
                    }}
                    title={`View ${conversation.name}'s profile`}
                  >
                    <img src={conversation.image || "/placeholder.svg"} alt={conversation.name} />
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <h3 
                        className="conversation-name profile-clickable"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProfileClick(conversation.id, conversation.name)
                        }}
                        title={`View ${conversation.name}'s profile`}
                      >
                        {conversation.name}
                      </h3>
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
                <div 
                  className="chat-user-info"
                  onClick={() => handleProfileClick(selectedUser?.id, selectedUser?.name)}
                  title={`View ${selectedUser?.name}'s profile`}
                >
                  <div className="avatar">
                    <img src={selectedUser?.image || "/placeholder.svg"} alt={selectedUser?.name} />
                  </div>
                  <div className="user-details">
                    <h3 className="user-name">{selectedUser?.name}</h3>
                    <p className="user-status">
                      <span className="status-dot"></span>
                      Online
                    </p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn" title="More options">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
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
                      <div 
                        className="message-avatar profile-clickable" 
                        onClick={() => handleProfileClick(selectedUser?.id, selectedUser?.name)}
                        title={`View ${selectedUser?.name}'s profile`}
                      >
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
                  <button 
                    type="button" 
                    className="ai-assist-btn" 
                    onClick={handleAIAssist} 
                    disabled={isGeneratingAI}
                    title="AI Assist - Generate smart reply"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder={isGeneratingAI ? "✨ AI is crafting a response..." : "Type your message..."}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                    disabled={isGeneratingAI}
                  />
                  <button 
                    type="submit" 
                    className="send-btn" 
                    disabled={isGeneratingAI || newMessage.trim() === ""}
                    title="Send message"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <h2 className="empty-chat-title">🏠 Start Your Roommate Journey</h2>
                <p className="empty-chat-subtitle">
                  Select a conversation to begin chatting with potential roommates and find your perfect living companion!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages