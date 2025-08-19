import React, { useState } from "react";
import Topbar from "../layouts/Topbar";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { createMultiplePosts } from "../services/postService";
import Loader from "../components/Loader";
import Switch from "@mui/material/Switch";

export function Multiple() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [catbox, setCatbox] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const response = await createMultiplePosts({ imgUrls: previewUrls });

    if (response && response.success) {
      setText(""); 
      setPreviewUrls([]); 
    } else {
      console.error("Failed to create multiple posts");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

    setText(catbox ? formatTextForCatbox(e.target.value) : e.target.value);
    const urls = text
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "" && urlRegex.test(url));

    setPreviewUrls(urls);
  };

  const formatTextForCatbox = (text) => {
    const urls = text.match(/https:\/\/files\.catbox\.moe\/\S+\.mp4/g);
    const result = urls ? urls.join("\n") : "";
    return result;
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
          <div className="mediaFormHeader">
            <Typography variant="h6" component="div">
              Enter Media Urls
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={catbox} />}
                label="Catbox"
                onChange={(e) => setCatbox(e.target.checked)}
              />
            </FormGroup>
          </div>

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
            previewUrls.map((url, index) => {
              return url.includes("mp4") ? (
                <video key={index} autoPlay loop muted>
                  <source src={url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img key={index} src={url} alt={`Preview ${index + 1}`} />
              );
            })
          ) : (
            <p>No URLs to preview</p>
          )}
        </div>
      </div>
    </div>
  );
}
