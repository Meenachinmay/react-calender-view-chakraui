import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Zoom() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [zoomMeetingURL, setZoomMeetingURL] = useState("");
  const [meetingTopic, setMeetingTopic] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("message")) {
      setMessage(urlParams.get("message") || "");
    }
    if (urlParams.has("error")) {
      setError(urlParams.get("error") || "");
    }
  }, []);

  async function createZoomMeeting() {
    const topic = "Test a meeting";
    const date = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format
    const time = "09:00"; // 9AM

    const response = await fetch("http://localhost:3000/zoom/create-meeting", {
      method: "POST",
      body: JSON.stringify({ topic, date, time }),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        // Include any authentication headers if needed
      },
    });

    const data = await response.json();
    // Update the state with the Zoom meeting URL and topic.
    setZoomMeetingURL(data.zoomMeetingURL);
    setMeetingTopic(data.topic);
  }


  return (
    <>
      <Flex
        width={"full"}
        height={"100vh"}
        alignItems={"center"}
        gap={"10px"}
        justifyContent={"center"}
        flexDir={"column"}
      >
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {zoomMeetingURL && (
          <div>
            <p>Meeting Topic: {meetingTopic}</p>
            <p>
              Meeting URL:{" "}
              <a
                href={zoomMeetingURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {zoomMeetingURL}
              </a>
            </p>
          </div>
        )}
        <button
          onClick={() =>
            (window.location.href = "http://localhost:3000/zoom/start")
          }
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            width: "300px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Initiate Zoom OAuth
        </button>
        <button
          onClick={createZoomMeeting}
          style={{
            padding: "10px",
            backgroundColor: "lightblue",
            width: "300px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Create Zoom Meeting
        </button>
      </Flex>
    </>
  );
}

export default Zoom;
