import React, { useState } from "react";
import Topbar from "../layouts/Topbar";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createMultiplePosts } from "../services/postService";
import Loader from "../components/Loader";

export function Multiple() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

    const urls = text
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "" && urlRegex.test(url));
    const response = await createMultiplePosts({ imgUrls: urls });

    if (response && response.success) {
      setText(""); // Clear the input field after successful submission
    } else {
      console.error("Failed to create multiple posts");
    }
    setLoading(false);
  };

  return (
    <div>
      <Topbar />
      <Loader visible={loading} />

      <div className="multiple">
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="multipleForm"
          sx={{
            maxWidth: 600,
            mx: "auto",
            mt: 4,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="div">
            Enter Media Urls
          </Typography>

          <TextField
            label="Enter urls"
            multiline
            rows={4}
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
}
