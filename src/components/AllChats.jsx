import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";

const AllChats = () => {
  const { isLogin } = useUser();
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/signin");
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch("https://bogoxserver.onrender.com/allconversations", {
        credentials: "include",
      });
      const data = await res.json();
      setConversations(data);
    };

    fetchConversations();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        All Conversations
      </h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500 text-center">No chats yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {conversations.map((conv) => (
            <Link
              to={`/chat/${conv.deal._id}?buyerId=${conv.otherUser._id}`}
              key={conv._id}
              className="block p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 border border-blue-100 group"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 shadow group-hover:bg-blue-400 group-hover:text-white transition">
                  {conv.otherUser?.name
                    ? conv.otherUser.name[0]?.toUpperCase()
                    : "U"}
                </div>
                <div>
                  <div className="font-bold text-xl text-blue-700 group-hover:text-blue-900 transition">
                    {conv.otherUser?.name || conv.otherUser?._id}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Deal ID: <span className="font-mono">{conv.deal._id}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllChats;
