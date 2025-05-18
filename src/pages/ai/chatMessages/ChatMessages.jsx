import React, { useRef, useEffect } from "react";
import { Box, Paper, Typography, LinearProgress } from "@mui/material";

const ChatMessages = ({ responses, loading }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <Box
      sx={{
        padding: 2,
        flexGrow: 1,
        marginBottom: 2,
        borderRadius: 8,
        overflowY: "auto",
        width: "100%",
        maxWidth: "1100px",
        height: "calc(100vh - 200px)",
        backgroundColor: "white",
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        scrollbarWidth: "none",
      }}
    >
      <Box ref={chatRef} sx={{ marginTop: 1 }}>
        {responses.map((response, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                response.type === "user" ? "flex-end" : "flex-start",
              marginBottom: 2,
            }}
          >
            <Paper
              sx={{
                padding: 2,
                borderRadius: "20px",
                backgroundColor:
                  response.type === "user" ? "#1a73e8" : "#f1f3f4",
                maxWidth: "80%",
                wordWrap: "break-word",
                boxShadow:
                  "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  fontSize: "14px",
                  color: response.type === "user" ? "white" : "#3c4043",
                }}
              >
                {response.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "11px",
                  marginTop: 0.5,
                  textAlign: "right",
                  color: "#5f6368",
                }}
              >
                {new Date(response.createdAt).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>
      {loading && (
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default ChatMessages;