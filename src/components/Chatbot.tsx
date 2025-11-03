import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm KYUCSA AI Assistant. I can help you with frequently asked questions about KYUCSA. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // FAQs database
  const faqs: Record<string, string> = {
    'hello': "Hello! Welcome to KYUCSA. How can I help you today?",
    'hi': "Hi there! I'm here to help with questions about KYUCSA. What would you like to know?",
    'what is kyucsa': "KYUCSA stands for Kyambogo University Computing Students Association. We are a vibrant student organization dedicated to fostering academic excellence, professional development, and community building among computing students at Kyambogo University.",
    'about kyucsa': "KYUCSA (Kyambogo University Computing Students Association) is dedicated to empowering computing students through academic resources, networking opportunities, professional development, and community engagement.",
    'location': "KYUCSA is located at the Faculty of Science Block, Kyambogo University, Kampala, Uganda.",
    'contact': "You can contact KYUCSA through:\n• Phone: +256 765 458 906 or +256 701 234 567\n• Email: info@kyucsa.org or president@kyucsa.org\n• Visit us at the Faculty of Science Block, Kyambogo University",
    'email': "You can reach us at info@kyucsa.org for general inquiries or president@kyucsa.org for matters related to the presidency.",
    'phone': "You can call us at +256 765 458 906 or +256 701 234 567 during working hours (Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM).",
    'working hours': "Our working hours are:\n• Monday - Friday: 8:00 AM - 5:00 PM\n• Saturday: 9:00 AM - 1:00 PM\n• Sunday: Closed",
    'hours': "Our working hours are:\n• Monday - Friday: 8:00 AM - 5:00 PM\n• Saturday: 9:00 AM - 1:00 PM\n• Sunday: Closed",
    'membership': "To become a member of KYUCSA, you need to be a computing student at Kyambogo University. You can visit our office at the Faculty of Science Block or contact us through our email or phone numbers.",
    'join': "To join KYUCSA, you need to be a computing student at Kyambogo University. Visit our office at the Faculty of Science Block or reach out via email (info@kyucsa.org) or phone (+256 765 458 906).",
    'resources': "KYUCSA provides various academic resources including course notes, question banks, study materials for BITC, BIS, BLIS, and Computer Science programs. Visit the Academic Resources section on our website.",
    'notes': "You can access course notes and academic resources through our Academic Resources page. We provide materials for all years and programs including BITC, BIS, BLIS, and Computer Science.",
    'academic resources': "KYUCSA offers comprehensive academic resources including course notes, question banks, and study materials organized by program (BITC, BIS, BLIS, CS) and year of study. Check the Academic Resources section on our website.",
    'events': "KYUCSA organizes various events including technical sessions, workshops, seminars, networking events, and social activities. Check the Events section on our website for upcoming events.",
    'leadership': "KYUCSA leadership includes the President, Vice President, Speaker, Vice Speaker, Treasurer, General Secretary, and various department leads. Visit the Leadership page to learn more about our current executive team.",
    'projects': "KYUCSA students work on various innovative projects. You can view student projects and contribute your own through the Projects section on our website.",
    'programs': "KYUCSA serves students in the following programs:\n• BITC (Bachelor of Information Technology and Computing)\n• BIS (Bachelor of Information Systems)\n• BLIS (Bachelor of Library and Information Science)\n• Computer Science",
    'courses': "KYUCSA provides resources for various computing courses across different programs. Visit the Academic Resources section to access course-specific materials.",
    'help': "I can help you with information about:\n• KYUCSA overview and membership\n• Contact information and location\n• Academic resources and notes\n• Events and activities\n• Leadership team\n• Programs offered\n\nWhat would you like to know?",
    'default': "I'm not sure I understand that question. I can help you with information about KYUCSA, contact details, academic resources, events, leadership, and membership. Could you please rephrase your question or type 'help' to see what I can assist with?"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const findBestMatch = (userInput: string): string => {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Direct matches
    if (faqs[normalizedInput]) {
      return faqs[normalizedInput];
    }

    // Keyword matching
    const keywords: Record<string, string> = {
      'what': 'what is kyucsa',
      'who': 'about kyucsa',
      'where': 'location',
      'when': 'working hours',
      'how': 'membership',
      'contact': 'contact',
      'email': 'email',
      'phone': 'phone',
      'call': 'phone',
      'hours': 'hours',
      'time': 'hours',
      'open': 'hours',
      'join': 'join',
      'member': 'membership',
      'become': 'membership',
      'resources': 'resources',
      'notes': 'notes',
      'academic': 'academic resources',
      'materials': 'resources',
      'study': 'resources',
      'events': 'events',
      'event': 'events',
      'workshop': 'events',
      'seminar': 'events',
      'leadership': 'leadership',
      'president': 'leadership',
      'executive': 'leadership',
      'team': 'leadership',
      'projects': 'projects',
      'project': 'projects',
      'programs': 'programs',
      'program': 'programs',
      'bitc': 'programs',
      'bis': 'programs',
      'blis': 'programs',
      'course': 'courses',
      'courses': 'courses',
      'help': 'help',
      'assist': 'help',
      'support': 'help'
    };

    for (const [keyword, key] of Object.entries(keywords)) {
      if (normalizedInput.includes(keyword)) {
        return faqs[key] || faqs['default'];
      }
    }

    return faqs['default'];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = findBestMatch(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg p-4 transition-all duration-300 ${
          isOpen ? 'scale-90' : 'scale-100 hover:scale-110'
        }`}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-16'
              : 'w-96 h-[600px]'
          } flex flex-col`}
        >
          {/* Header */}
          <div className="bg-primary-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">KYUCSA AI Assistant</h3>
                <p className="text-xs text-blue-100">Ask me anything!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={isMinimized ? maximizeChat : minimizeChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? 'Maximize' : 'Minimize'}
              >
                {isMinimized ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={toggleChat}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="bg-primary-100 p-2 rounded-full flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <div className="bg-secondary-100 p-2 rounded-full flex-shrink-0">
                        <User className="h-4 w-4 text-secondary-500" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;

