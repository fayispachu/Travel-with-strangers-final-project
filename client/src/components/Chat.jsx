import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TripContext } from "../context/TripContext";
import { UserContext } from "../context/UserContext";

function Chat() {
  const { roomId } = useParams();
  const { oneTrip } = useContext(TripContext);
  const { joinedUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const endRef = useRef(null);
  const [members, setMembers] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false); // 👈 Mobile drawer toggle
  const [exited, setExited] = useState(false);

  const fetchChatData = async () => {
    try {
      const membersRes = await axios.get(
        `http://localhost:4000/api/chat/${roomId}/members`
      );
      const membersArray = Array.isArray(membersRes.data.members)
        ? membersRes.data.members
        : [];
      setMembers(membersArray);
    } catch (err) {
      console.error("Chat initialization error:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/chat/${roomId}/messages`
      );
      const formatted = res.data.messages.map((msg) => ({
        text: msg.text,
        sender: msg.sender.name || msg.sender.username || "Unknown",
        time: new Date(msg.createdAt),
        fromSelf: msg.sender._id === joinedUser?._id,
        id: msg._id || `${msg.sender._id}-${msg.createdAt}`,
      }));
      setMessages(formatted);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const initSocket = () => {
    const token = localStorage.getItem("token");
    socket.current = io("http://localhost:4000", {
      auth: { token },
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    socket.current.on("connect", () => {
      if (roomId && !exited) {
        socket.current.emit("join_room", roomId);
        setMembers((prev) => {
          if (!prev.some((m) => m._id === joinedUser._id)) {
            return [...prev, { _id: joinedUser._id, name: joinedUser.name }];
          }
          return prev;
        });
      }
    });

    socket.current.on("receive_message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: data.sender,
          time: new Date(data.timestamp),
          fromSelf: data.senderId === joinedUser?._id,
          id: data.messageId || `${data.senderId}-${data.timestamp}`,
        },
      ]);
    });

    socket.current.on("user_joined", (joinedUser) => {
      setMembers((prev) => {
        if (!prev.some((u) => u._id === joinedUser.userId)) {
          return [...prev, { _id: joinedUser.userId, name: joinedUser.name }];
        }
        return prev;
      });
    });
  };

  useEffect(() => {
    fetchChatData();
    fetchMessages();
    initSocket();
    return () => socket.current?.disconnect();
  }, [roomId, exited]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.current.emit(
      "send_message",
      { room: roomId, message: message.trim() },
      (response) => {
        if (response.status === "ok") {
          setMessages((prev) => [
            ...prev,
            {
              text: message.trim(),
              sender: joinedUser.name,
              time: new Date(),
              fromSelf: true,
              id: `temp-${Date.now()}`,
            },
          ]);
          setMessage("");
        } else {
          alert(`Failed to send: ${response.message}`);
        }
      }
    );
  };

  const handleExitGroup = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/chat/${roomId}/exit`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setExited(true);
      alert("You have exited the group.");
      setShowDrawer(false);
    } catch (err) {
      alert("Failed to exit group");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto border border-green-400 rounded-xl p-4 bg-green-50 font-sans flex flex-col md:flex-row gap-4 max-w-5xl">
      {/* 🧾 Sidebar for large screens */}
      <aside className="hidden md:block w-1/4 border border-green-400 rounded-lg p-3 max-h-[400px] overflow-y-auto bg-green-100">
        <h3 className="text-green-900 mb-2 font-bold">
          Members ({members.length})
        </h3>
        <ul>
          {members.map((m, i) => (
            <li
              key={m._id ?? i}
              className="py-1 border-b border-green-200 text-green-900"
            >
              {m.name}
            </li>
          ))}
        </ul>
        <button
          onClick={handleExitGroup}
          disabled={exited}
          className={`mt-4 w-full py-2 rounded-md font-bold text-white ${
            exited ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Exit Group
        </button>
      </aside>

      {/* 💬 Chat section */}
      <section className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-green-900 text-xl font-semibold">
            Trip Chat — {oneTrip?.place || "Loading..."}
          </h2>

          {/* 🍔 Drawer toggle button */}
          <button
            onClick={() => setShowDrawer((prev) => !prev)}
            aria-label="Menu"
            className="md:hidden bg-transparent border-none cursor-pointer text-3xl text-green-900"
          >
            &#8942;
          </button>
        </div>

        {/* 📜 Messages */}
        <div className="border border-green-400 rounded-lg p-3 mb-3 h-72 overflow-y-auto bg-green-100 flex-grow">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-1 text-sm flex ${
                msg.fromSelf ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.fromSelf
                    ? "bg-green-200 text-green-800"
                    : "bg-white text-green-900"
                }`}
              >
                <b>{msg.fromSelf ? "You" : msg.sender}</b>: {msg.text}
                <br />
                <small className="text-[0.7rem] text-green-700">
                  {msg.time.toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* ✏️ Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            disabled={exited}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={
              exited ? "You have exited the group" : "Type a message"
            }
            className="flex-1 px-3 py-2 rounded-lg border border-green-400"
          />
          <button
            onClick={sendMessage}
            disabled={exited || !message.trim()}
            className={`rounded-lg px-4 py-2 font-bold text-white ${
              exited || !message.trim()
                ? "bg-green-200 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Send
          </button>
        </div>

        {exited && (
          <p className="text-red-600 mt-3 font-bold">
            You have left the group chat. Refresh to rejoin if allowed.
          </p>
        )}
      </section>

      {/* 📱 Drawer for small screens */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
          <div className="w-64 bg-white h-full p-4 border-l border-green-400 flex flex-col">
            <h3 className="text-green-900 mb-2 font-bold">
              Members ({members.length})
            </h3>
            <ul className="flex-1 overflow-y-auto">
              {members.map((m, i) => (
                <li
                  key={m._id ?? i}
                  className="py-1 border-b border-green-200 text-green-900"
                >
                  {m.name}
                </li>
              ))}
            </ul>
            <button
              onClick={handleExitGroup}
              disabled={exited}
              className={`mt-4 w-full py-2 rounded-md font-bold text-white ${
                exited ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Exit Group
            </button>
            <button
              onClick={() => setShowDrawer(false)}
              className="mt-2 w-full py-1 text-green-700 font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
