import React, { useState } from "react"
import { Modal, Box, Typography, TextField, Button } from "@mui/material"
import { MuiFileInput } from "mui-file-input"
import GoogleMapsInput from "./googleMapsInput"

export default function addPlace(props) {
  function handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    console.log(data)
  }
  const [images, setImages] = useState([])
  const handleChange = (newFile) => {
    newFile.length == 0
      ? removeImage()
      : setImages((prev) => [...newFile, ...prev])
  }

  function removeImage(index = 0) {
    setImages([])
  }
  const [place, setPlace] = useState()

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            // width: "60%",
            // height: "80%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Place
          </Typography>
          <TextField id="Name" label="Place name" variant="standard" required />
          <TextField
            id="Description"
            label="Description"
            variant="standard"
            multiline
          />
          <GoogleMapsInput
            setPlace={(value) => {
              setPlace(value)
            }}
          />

          <MuiFileInput
            label="Upload Images"
            inputProps={{
              accept: "image/*",
            }}
            multiple={true}
            value={images}
            onChange={handleChange}
            variant="standard"
          />
          <Button type="submit">Submit</Button>
        </Box>
      </Modal>
    </>
  )
}
