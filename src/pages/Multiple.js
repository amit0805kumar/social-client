import React, { useState } from "react";
import Topbar from "../layouts/Topbar";
import { Box, Button, TextField, Typography } from "@mui/material";
import { createMultiplePosts } from "../services/postService";
import Loader from "../components/Loader";

export function Multiple() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const response = await createMultiplePosts({ imgUrls: previewUrls });

    if (response && response.success) {
      setText(""); // Clear the input field after successful submission
      setPreviewUrls([]); // Clear the preview URLs
    } else {
      console.error("Failed to create multiple posts");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

    setText(e.target.value);
    const urls = text
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "" && urlRegex.test(url));

    setPreviewUrls(urls);
  }

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
            onChange={handleChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </div>

      <div className="preview">
        <h2>Preview</h2>
        <div className="previewContainer">
          {previewUrls.length > 0 ? (
            previewUrls.map((url, index) => 
            {
              return url.includes("mp4") ? (
                <video key={index} autoPlay loop muted >
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img key={index} src={url} alt={`Preview ${index + 1}`}  />
              )
            })
          ) : (
            <p>No URLs to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
