import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createGifs } from "../services/gifservice";

export default function MultipleGif() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {

    setText(e.target.value);
    const urls = e.target.value
      .split("\n")
      .map((url) => "https://www.redgifs.com/ifr/" + url.trim());

    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await createGifs({ gifCodes: text.split("\n").map((code) => code.trim())});
    console.log(response);
    if (response && response.length > 0) {
      setText(""); 
      setPreviewUrls([]); 
    } else {
      console.error("Failed to create multiple gifs");
    }
    setLoading(false);
  }

  return (
    <div className="multiple"  >
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
        <div className="mediaFormHeader">
          <Typography variant="h6" component="div">
            Enter Gif Codes
          </Typography>
        </div>
        <TextField
          label="Enter codes"
          multiline
          rows={4}
          variant="outlined"
          value={text}
          onChange={handleChange}
          fullWidth
          color="white"
        />

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>

      <div className="preview">
        <h2>Preview</h2>
        <div className="previewContainer">
          {previewUrls.length > 0 ? (
            previewUrls.map((url, index) => {
              return <div className="gifPlayer" key={index}><iframe src={url} width='100px' allowFullScreen></iframe></div>
            })
          ) : (
            <p>No URLs to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
