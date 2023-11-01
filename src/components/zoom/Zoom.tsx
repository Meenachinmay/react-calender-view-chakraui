import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function Zoom() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string>("");
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
    const date = '2023-10-20'; // Current date in YYYY-MM-DD format
    const time = "10:00"; // 9AM
    const endTime = "10:30"; // 9AM

    try {
      const response = await fetch(
        "http://localhost:3000/zoom/create-meeting",
        {
          method: "POST",
          body: JSON.stringify({ topic, date, time, endTime }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Include any authentication headers if needed
          },
        }
      );

      if (!response.ok) {
        // If HTTP-status is 400-599
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create the Zoom meeting."
        );
      }

      const data = await response.json();
      // Update the state with the Zoom meeting URL and topic.
      setZoomMeetingURL(data.zoomMeetingURL);
      setMeetingTopic(data.topic);
    } catch (error) {
      // Handle errors and set them in the error state
      console.log(error);
    }
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
