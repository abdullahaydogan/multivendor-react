import React, { useState, useRef } from "react";
import {
  Paper,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import chat from "../../../config/gemini";

function ChatInput({ setResponses, setLoading }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message, createdAt: new Date() };
    setResponses((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      if (file) {
        setUploading(true);
        await uploadFile(file);
        setFile(null);
        setUploading(false);
      }

      const botResponseText = await chat(message);
      const botResponse = {
        type: "bot",
        text: botResponseText,
        createdAt: new Date(),
      };
      setResponses((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
      setUploading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const uploadFile = async (file) => {
    console.log("Uploading file:", file);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        backgroundColor: "white",
        borderRadius: "30px",
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        width: "100%",
        maxWidth: "900px",
        position: "relative",
        marginBottom: 2,
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Tooltip title="Attach File" arrow>
        <IconButton
          color="primary"
          onClick={handleAttachClick}
          sx={{ marginLeft: "10px", padding: "8px" }}
        >
          <AttachFileIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      <InputBase
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          flex: 1,
          padding: "12px 16px",
          border: "1px solid #dadce0",
          borderRadius: "20px",
          backgroundColor: "#f8f9fa",
          fontSize: "16px",
          color: "#3c4043",
          transition: "border-color 0.3s ease",
          "&:focus": {
            borderColor: "#1a73e8",
            outline: "none",
          },
          "&::placeholder": {
            color: "#5f6368",
          },
        }}
      />

      <IconButton
        type="submit"
        color="primary"
        disabled={!message || uploading}
        sx={{ padding: "8px" }}
      >
        <SendIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Paper>
  );
}

export default ChatInput;