import Navbar from "./Navbar";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useParams, useSearchParams } from "react-router-dom";

const NewChat = () => {
  const { dealId } = useParams();
  const [searchParams] = useSearchParams();
  const buyerId = searchParams.get("buyerId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null); // Track current user ID
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch conversation and messages
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch("http://localhost:8080/conversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(
            buyerId ? { dealId, otherUserId: buyerId } : { dealId }
          ),
        });

        const result = await response.json();
        setConversationId(result.conversationId);
        setMessages(result.messages || []);
        setUserId(result.userId); // This should come from the backend
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, []);

  // Connect to socket and join room
  useEffect(() => {
    if (!conversationId) return;

    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    newSocket.emit("join room", conversationId);

    newSocket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.off("chat message");
      newSocket.disconnect();
    };
  }, [conversationId]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId,
      text: newMessage,
    };

    try {
      const res = await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(messageData),
      });

      const savedMessage = await res.json();
      socket.emit("chat message", savedMessage);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-200 flex items-center justify-center py-8">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 flex flex-col h-[70vh]">
          <div className="px-6 py-4 border-b border-blue-100 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl">
            <span className="text-white text-2xl font-bold tracking-wide">
              Chat
            </span>
            <span className="ml-auto text-white text-sm font-medium">
              Deal Conversation
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const isOwnMessage = msg.sender === userId;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl shadow-md max-w-[75%] break-words ${
                        isOwnMessage
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="mb-1">{msg.text}</p>
                      <span className="text-xs text-gray-200/80 dark:text-gray-500 block text-right">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400">No messages yet...</p>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 px-4 py-4 border-t border-blue-100 bg-white/80 rounded-b-2xl"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-white"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-150 text-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewChat;
