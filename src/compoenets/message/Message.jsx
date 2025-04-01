import React, { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Message.css";

const supabaseUrl = "https://vlowdzoigoyaudsydqam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb3dkem9pZ295YXVkc3lkcWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDg3NTUsImV4cCI6MjA1ODk4NDc1NX0.7ltcwu8G4_awXU5SFkAXRGnSeThjTTqAOVUm1bjtmnU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Message() {
  const [username, setUsername] = useState("이예도");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);

  // 메시지 불러오기
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("time", { ascending: true });

    if (error) {
      console.error("메시지 불러오기 실패:", error.message);
    } else {
      setMessages(data);
    }
  };

  // 메시지 보내기
  const sendMessage = async () => {
    if (!username || !message) return;
    const { error } = await supabase.from("messages").insert([
      {
        name: username,
        message: message,
      },
    ]);
    if (error) {
      console.error("메시지 전송 실패:", error.message);
    }
    setMessage("");
  };

  // 실시간 업데이트 설정
  useEffect(() => {
    fetchMessages();

    // 실시간 수신 로직
    supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          if (!payload.new.time) {
            fetchMessages();
          } else {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="MainBackground">
      <div className="messagesList">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="message">
              <img
                className="profileIcon"
                style={{ width: "40px", height: "30px" }}
                src="./images/discord.png"
              />
              <div className="messageData">
                <div className="nametime">
                  <p className="name">{msg.name}</p>
                  <p className="time">
                    {msg.time && new Date(msg.time).toTimeString().slice(0, 5)}
                  </p>
                </div>
                <p className="text">{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageRef} />
      </div>

      <div className="inputBar">
        <svg
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" fill="transparent" />
          <path
            fill="#99aab5"
            d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm0-17a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"
          />
        </svg>

        <input
          className="input"
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
      </div>
    </div>
  );
}
