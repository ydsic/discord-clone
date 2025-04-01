
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";

// supabase 기본 url과 key인데 이건 제꺼로 적어놨으니 추후 코드 재사용하실 분은 supabase에서 본인끼로 교체
// Table 이름은 messages란 이름이고 안에 Columns는 id(primary key), name, message, time 총 4개의 Columns가 존재
const supabaseUrl = "https://vlowdzoigoyaudsydqam.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsb3dkem9pZ295YXVkc3lkcWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDg3NTUsImV4cCI6MjA1ODk4NDc1NX0.7ltcwu8G4_awXU5SFkAXRGnSeThjTTqAOVUm1bjtmnU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Message() {
  const [username, setUsername] = useState("익명");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // supabase는 axios로 하나하나 적는거 없이 자동으로 보내주기 때문에 async await로 작성

  // 메시지 불러오기
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages") // DB테이블에서 messages라는 이름을 가진 Table에
      .select("*") // 모든 Columns을 선택
      .order("time", { ascending: false }); // order() 메서드로 시간 순서대로 정렬하고 데이터 가져오기. ascending: true로 하면 오름차순, false는 내림차순

    if (error) {
      // 에러처리
      console.error("메시지 불러오기 실패:", error.message);
    } else {
      setMessages(data);
    }
  };

  // 메시지 보내기
  const sendMessage = async () => {
    if (!username || !message) return;
    const { error } = await supabase.from("messages").insert([
      //객체 중에서 insert부분이라 data부분은 필요없고 error 발생시 error 담을 변수만 선언
      {
        name: username,
        message: message,
        // time: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("메시지 전송 실패:", error.message);
    }
    setMessage("");
  };

  // 실시간 업데이트 설정
  useEffect(() => {
    // 사이트 접속하면 최초 1회 메세지 기록들 불러오기
    fetchMessages();

    // 실시간 수신 로직 (DB로 메세지가 insert 되는걸 감지)
    supabase
      .channel("realtime-messages") // 이건 그냥 아무거나 적으면 됩니다
      .on(
        "postgres_changes",
        {
          event: "INSERT", //insert 감지
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
  }, []);

  return (
 <MainDiv>
      <h2>💬 Supabase 채팅</h2>

      {/* 이름 입력 */}
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />

      {/* 메시지 입력 */}
      <input
        type="text"
        placeholder="메시지를 입력하세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />

      {/* 메시지 목록 */}
      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 10 }}>
            <div>
              <strong>{msg.name}</strong>: {msg.message}
            </div>
            <div style={{ fontSize: "0.8em", color: "gray" }}>
              {msg.time ? new Date(msg.time).toLocaleString() : "시간 없음"}
            </div>
          </div>
        ))}
      </div>
    </MainDiv>
  );
}
const MainDiv = styled.div`
  display: grid;
  background-color: var(--message-bg-color);
`;