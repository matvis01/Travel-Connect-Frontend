import React, { useState } from "react"
import {
  Modal,
  Box,
  List,
  ListItem,
  Typography,
  TextField,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Button,
  Autocomplete,
} from "@mui/material"
import { MuiFileInput } from "mui-file-input"
import DeleteIcon from "@mui/icons-material/Delete"
import Avatar from "@mui/material/Avatar"
import FolderIcon from "@mui/icons-material/Folder"
import { MultilineChart } from "@mui/icons-material"

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

  let options = ["xd", "xddddd"]

  function removeImage(index = 0) {
    // console.log("xd")
    // return () => {
    //   if (images.length === 1) {
    setImages([])
    //   } else {
    //     setImages((prev) => prev.filter((_, i) => i !== index))
    //   }
    // }
  }

  //   const listOfFiles = (
  //     <List dense>
  //       {images?.map((file, index) => (
  //         <ListItem
  //           key={index}
  //           secondaryAction={
  //             <IconButton
  //               edge="end"
  //               aria-label="delete"
  //               onClick={removeImage(index)} strzele sobie w glowe
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           }
  //         >
  //           <ListItemAvatar>
  //             <Avatar>
  //               <FolderIcon />
  //             </Avatar>
  //           </ListItemAvatar>
  //           <ListItemText primary={file?.name} />
  //         </ListItem>
  //       ))}
  //     </List>
  //   )

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
          padding: "0",
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
          <TextField id="Name" label="Place name" variant="standard" />
          <TextField
            id="Description"
            label="Description"
            variant="standard"
            multiline
          />
          {options.length > 0 ? (
            <Autocomplete
              id="Address"
              freeSolo
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Address" variant="standard" />
              )}
            />
          ) : (
            <TextField id="Address" label="Address" variant="standard" />
          )}
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
          {/* {images.length > 0 && listOfFiles} */}
          <Button type="submit">Submit</Button>
        </Box>
      </Modal>
    </>
  )
}
