import React, { useEffect, useRef, useState, useContext } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TripContext } from "../context/TripContext";
import { UserContext } from "../context/UserContext";

function Chat() {
  const { roomId } = useParams();
  // const navigate = useNavigate();
  const { oneTrip } = useContext(TripContext);
  const { joinedUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);
  const endRef = useRef(null);
  const [members, setMembers] = useState([]);
  // const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [showSidebar, setShowSidebar] = useState(false);
  const [exited, setExited] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fetchChatData = async () => {
    try {
      const membersRes = await axios.get(
        `http://localhost:4000/api/chat/${roomId}/members`
      );
      setMembers(membersRes.data.member);
    } catch (err) {
      console.error("Chat initialization error:", err);
      alert("Failed to load chat data");
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
      // setConnectionStatus("connected");
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

    socket.current.on("connect_error", (err) => {
      // setConnectionStatus("disconnected");
      console.log(
        err,
        "error from frontend chat connectio error may be disconnected"
      );
    });

    socket.current.on("receive_message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          text: data.text,
          sender: data.sender,
          time: new Date(data.timestamp),
          fromSelf: data.senderId === joinedUser?._id,
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

    return () => {
      socket.current?.disconnect();
    };
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
      setShowMenu(false);
    } catch (err) {
      alert("Failed to exit group");
      console.error(err);
    }
  };

  return (
    <div
      className="chat-container"
      style={{
        maxWidth: 600,
        margin: "auto",
        border: "1px solid #4ade80", // green border
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#f0fdf4", // light green background
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#065f46", marginBottom: 8 }}>
        Trip Chat — {oneTrip?.place || "Loading..."}
      </h2>

      {/* 3-dot button and dropdown */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Menu"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 24,
            color: "#065f46",
          }}
        >
          &#8942;
        </button>
        {showMenu && (
          <div
            style={{
              position: "absolute",
              top: 30,
              right: 0,
              background: "white",
              border: "1px solid #a7f3d0",
              borderRadius: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              zIndex: 100,
              minWidth: 120,
            }}
          >
            <button
              onClick={handleExitGroup}
              disabled={exited}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: exited ? "#9ca3af" : "#22c55e",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: exited ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              Exit Group
            </button>
          </div>
        )}
      </div>

      {/* Members toggle button */}
      <button
        onClick={() => setShowSidebar((prev) => !prev)}
        style={{
          marginBottom: 8,
          backgroundColor: "#22c55e",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {showSidebar ? "Hide Members" : "Show Members"}
      </button>

      {/* Sidebar */}
      {showSidebar && (
        <aside
          style={{
            border: "1px solid #4ade80",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            maxHeight: 120,
            overflowY: "auto",
            backgroundColor: "#d1fae5",
          }}
        >
          <h3
            style={{
              color: "#065f46",
              marginBottom: 8,
              fontWeight: "bold",
            }}
          >
            Members ({members.length})
          </h3>
          <ul style={{ listStyleType: "none", paddingLeft: 0, margin: 0 }}>
            {members.map((member) => (
              <li
                key={member._id}
                style={{
                  padding: "4px 0",
                  borderBottom: "1px solid #bbf7d0",
                  color: "#065f46",
                }}
              >
                {member.name}
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Messages */}
      <div
        style={{
          border: "1px solid #4ade80",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          height: 300,
          overflowY: "auto",
          backgroundColor: "#ecfdf5",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.fromSelf ? "right" : "left",
              margin: "6px 0",
              fontSize: 14,
              color: msg.fromSelf ? "#166534" : "#065f46",
            }}
          >
            <b>{msg.sender}</b>: {msg.text}
            <br />
            <small style={{ fontSize: "0.7rem", color: "#4d7c0f" }}>
              {msg.time.toLocaleTimeString()}
            </small>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input & send */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={message}
          disabled={exited}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={exited ? "You have exited the group" : "Type a message"}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #4ade80",
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={exited || !message.trim()}
          style={{
            backgroundColor: exited || !message.trim() ? "#a7f3d0" : "#22c55e",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontWeight: "bold",
            padding: "8px 16px",
            cursor: exited || !message.trim() ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>

      {exited && (
        <p style={{ color: "#dc2626", marginTop: 12, fontWeight: "bold" }}>
          You have left the group chat. Refresh to rejoin if allowed.
        </p>
      )}
    </div>
  );
}

export default Chat;
