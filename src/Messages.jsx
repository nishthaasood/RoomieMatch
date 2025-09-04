import { useState, useRef, useEffect } from 'react';
import {
    Search,
    Send,
    MoreVertical,
    Phone,
    Video,
    Info,
    ArrowLeft,
    Smile,
    Paperclip,
    Check,
    CheckCheck,
    Star,
    MapPin,
    Clock,
    Users,
    Heart
} from 'lucide-react';
import './Messages.css'; // Import the CSS file

const Messages = ({ setCurrentPage }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    // Mock data for conversations
    const [conversations] = useState([
        {
            id: 1,
            name: 'Aakriti Arya',
            avatar: '👩‍💼',
            lastMessage: 'That sounds perfect! When can we schedule a viewing?',
            time: '2m',
            unread: 2,
            online: false,
            location: 'PitamPura',
            compatibility: 95,
            verified: true
        },
        {
            id: 2,
            name: 'Nishtha Sood',
            avatar: '👨‍💻',
            lastMessage: 'I love cooking too! We should definitely meet up.',
            time: '1h',
            unread: 0,
            online: true,
            location: 'Rohini',
            compatibility: 88,
            verified: true
        },
        {
            id: 3,
            name: 'Mansi Bhandari',
            avatar: '👩‍🎓',
            lastMessage: 'Thanks for sharing those apartment links!',
            time: '3h',
            unread: 1,
            online: false,
            location: 'Institute Area',
            compatibility: 92,
            verified: true
        },
        {
            id: 4,
            name: 'Alok',
            avatar: '👨‍🎨',
            lastMessage: 'The rent split sounds fair to me',
            time: '1d',
            unread: 0,
            online: false,
            location: 'Near DTU',
            compatibility: 85,
            verified: true
        }
    ]);

    // Mock messages for selected chat
    const [messages, setMessages] = useState({
        1: [
            { id: 1, sender: 'other', text: 'Hi! I saw your profile and we seem like a great match!', time: '10:30 AM', status: 'read' },
            { id: 2, sender: 'me', text: 'Hey Sarah! I agree, your profile looks amazing. I love that you are also into sustainable living!', time: '10:32 AM', status: 'read' },
            { id: 3, sender: 'other', text: 'Yes! It is so important to me. I saw you are looking in the downtown area too?', time: '10:35 AM', status: 'read' },
            { id: 4, sender: 'me', text: 'Exactly! I found a few great places. Would you like me to send you the links?', time: '10:40 AM', status: 'read' },
            { id: 5, sender: 'other', text: 'That sounds perfect! When can we schedule a viewing?', time: '2m ago', status: 'delivered' }
        ],
        2: [
            { id: 1, sender: 'other', text: 'Hey! I noticed we both love cooking. What is your favorite cuisine?', time: '2:00 PM', status: 'read' },
            { id: 2, sender: 'me', text: 'I love Italian and Thai food! What about you?', time: '2:05 PM', status: 'read' },
            { id: 3, sender: 'other', text: 'I love cooking too! We should definitely meet up.', time: '1h ago', status: 'delivered' }
        ],
        3: [
            { id: 1, sender: 'other', text: 'Hi there! I love your apartment links, they look perfect!', time: '9:15 AM', status: 'read' },
            { id: 2, sender: 'me', text: 'Thanks Mansi! I spent a lot of time researching the best neighborhoods.', time: '9:20 AM', status: 'read' },
            { id: 3, sender: 'other', text: 'That really shows! I especially like the one near the university. The rent seems reasonable too.', time: '9:25 AM', status: 'read' },
            { id: 4, sender: 'me', text: 'Yes! Plus it has great public transport connections. Are you a student?', time: '9:30 AM', status: 'read' },
            { id: 5, sender: 'other', text: 'PhD student actually! Working on environmental science. What about you?', time: '9:35 AM', status: 'read' },
            { id: 6, sender: 'me', text: 'That is so cool! I work in renewable energy consulting.', time: '9:40 AM', status: 'read' },
            { id: 7, sender: 'other', text: 'Thanks for sharing those apartment links!', time: '3h ago', status: 'delivered' }
        ],
        4: [
            { id: 1, sender: 'me', text: 'Hi Alok! I see you are in the Library. I love that area!', time: '11:00 AM', status: 'read' },
            { id: 2, sender: 'other', text: 'Hey! Yeah it is amazing here. So much creativity and energy around.', time: '11:05 AM', status: 'read' },
            { id: 3, sender: 'me', text: 'I can imagine! What kind of art do you do?', time: '11:10 AM', status: 'read' },
            { id: 4, sender: 'other', text: 'Mainly digital art and some photography. I have a small studio space here.', time: '11:15 AM', status: 'read' },
            { id: 5, sender: 'me', text: 'That sounds incredible! I would love to see your work sometime.', time: '11:20 AM', status: 'read' },
            { id: 6, sender: 'other', text: 'Definitely! Speaking of living arrangements, I found a great 2BR place nearby.', time: '11:25 AM', status: 'read' },
            { id: 7, sender: 'me', text: 'Really? What is the rent split like?', time: '11:30 AM', status: 'read' },
            { id: 8, sender: 'other', text: 'The rent split sounds fair to me', time: '1d ago', status: 'delivered' }
        ]
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChat, messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedChat) return;

        const newMsg = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages(prev => ({
            ...prev,
            [selectedChat]: [...(prev[selectedChat] || []), newMsg]
        }));
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedContact = conversations.find(c => c.id === selectedChat);

    return (
        <div className="messaging-wrapper">
            <div className="messaging-container">
                <div className="messaging-sidebar">
                    <div className="sidebar-header">
                        <div className="header-top">
                            <button
                                className="back-button"
                                onClick={() => setCurrentPage('home')}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="sidebar-title">Messages</h2>
                            <div className="header-badge">
                                <span>{conversations.reduce((acc, conv) => acc + conv.unread, 0)}</span>
                            </div>
                        </div>

                        <div className="search-container">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>

                    <div className="conversations-list">
                        {filteredConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''}`}
                                onClick={() => setSelectedChat(conversation.id)}
                            >
                                <div className="conversation-avatar">
                                    <span className="avatar-emoji">{conversation.avatar}</span>
                                    {conversation.online && <div className="online-indicator"></div>}
                                    {conversation.verified && (
                                        <div className="verified-badge">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>

                                <div className="conversation-content">
                                    <div className="conversation-header">
                                        <span className="conversation-name">{conversation.name}</span>
                                        <div className="conversation-meta">
                                            <span className="conversation-time">{conversation.time}</span>
                                            {conversation.unread > 0 && (
                                                <div className="unread-badge">{conversation.unread}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="conversation-preview">
                                        <p className="last-message">{conversation.lastMessage}</p>
                                        <div className="conversation-details">
                                            <div className="match-score">
                                                <Star className="w-3 h-3" />
                                                <span>{conversation.compatibility}%</span>
                                            </div>
                                            <div className="location">
                                                <MapPin className="w-3 h-3" />
                                                <span>{conversation.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="chat-area">
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="chat-header">
                                <div className="chat-contact-info">
                                    <div className="contact-avatar">
                                        <span className="avatar-emoji">{selectedContact.avatar}</span>
                                        {selectedContact.online && <div className="online-indicator"></div>}
                                    </div>
                                    <div className="contact-details">
                                        <div className="contact-header">
                                            <h3 className="contact-name">{selectedContact.name}</h3>
                                            {selectedContact.verified && (
                                                <div className="verified-badge">
                                                    <Check className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="contact-status">
                                            <div className="status-item">
                                                <Star className="w-3 h-3" />
                                                <span>{selectedContact.compatibility}% match</span>
                                            </div>
                                            <div className="status-item">
                                                <MapPin className="w-3 h-3" />
                                                <span>{selectedContact.location}</span>
                                            </div>
                                            <span className="activity-status">
                                                {selectedContact.online ? 'Active now' : 'Last seen 2h ago'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="chat-actions">
                                    <button className="chat-action-btn">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="chat-action-btn">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button className="chat-action-btn">
                                        <Info className="w-5 h-5" />
                                    </button>
                                    <button className="chat-action-btn">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="messages-container">
                                <div className="messages-list">
                                    {(messages[selectedChat] || []).map((message) => (
                                        <div key={message.id} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
                                            <div className="message-content">
                                                <p className="message-text">{message.text}</p>
                                                <div className="message-meta">
                                                    <span className="message-time">{message.time}</span>
                                                    {message.sender === 'me' && (
                                                        <div className="message-status">
                                                            {message.status === 'sent' && <Check className="w-3 h-3" />}
                                                            {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                                                            {message.status === 'read' && <CheckCheck className="w-3 h-3 read" />}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="message-input-container">
                                <div className="input-actions">
                                    <button type="button" className="input-action-btn">
                                        <Paperclip className="w-5 h-5" />
                                    </button>
                                    <button type="button" className="input-action-btn">
                                        <Smile className="w-5 h-5" />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="message-input"
                                />

                                <button
                                    onClick={handleSendMessage}
                                    className="send-button"
                                    disabled={!newMessage.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <div className="no-chat-content">
                                <div className="no-chat-icon">
                                    <Users className="w-16 h-16" />
                                </div>
                                <h3>Welcome to RoomieMatch Messaging</h3>
                                <p>Select a conversation to start chatting with your potential roommates</p>
                                <div className="welcome-features">
                                    <div className="welcome-feature">
                                        <Heart className="w-5 h-5" />
                                        <span>Safe & Secure</span>
                                    </div>
                                    <div className="welcome-feature">
                                        <Check className="w-5 h-5" />
                                        <span>Verified Profiles</span>
                                    </div>
                                    <div className="welcome-feature">
                                        <Star className="w-5 h-5" />
                                        <span>Smart Matching</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;