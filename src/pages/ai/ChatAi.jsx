import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatInput from "./chatInput/ChatInput";
import MessageList from "./chatMessages/ChatMessages";
import ChatHeader from "./chatHeader/ChatHeader"; 

const ChatAi = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  return (

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width:"100%",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding:"10px",
        }}
      >
        <ChatHeader /> 
        <MessageList responses={responses} loading={loading} />
        <ChatInput setResponses={setResponses} setLoading={setLoading} />
      </Box>
  
  );
};

export default ChatAi;