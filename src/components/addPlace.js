import React, { use, useEffect, useState } from "react"
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material"
import { MuiFileInput } from "mui-file-input"
import GoogleMapsInput from "./googleMapsInput"
import api from "../api/api"
import Select from "@mui/material/Select"

export default function addPlace(props) {
  const [place, setPlace] = useState()
  const [categories, setCategories] = useState()
  const [currentCategory, setCurrentCategory] = useState()
  const [currentTags, setCurrentTags] = useState([])
  const [images, setImages] = useState([])
  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const filterIds = currentTags.map((tag) => tag.id)

    let imageUrls = []

    images.forEach(async (image) => {
      try {
        const res = await api.post("/Photos", image, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        console.log(res.data)
        imageUrls.push(res.data.url)
      } catch (err) {
        console.log(err)
      }
    })

    const finishedPlace = {
      name: data.get("Name"),
      description: data.get("Description"),
      categoryId: currentCategory.id,
      address: place,
      filtersIds: filterIds,
      photos: images,
    }

    console.log(finishedPlace)
  }
  const handleChange = (newFile) => {
    newFile.length == 0
      ? removeImage()
      : setImages((prev) => [...newFile, ...prev])
  }

  function removeImage(index = 0) {
    setImages([])
  }

  const filters = currentCategory?.filters?.map((filter, index) => (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="filter">{filter.name}</InputLabel>
      <Select
        name="filter"
        label="filter"
        variant="standard"
        disabled={filter.values == undefined}
        onChange={(event) => {
          setCurrentTags((prev) => {
            const updatedTags = [...prev]
            updatedTags[index] = event.target.value
            return updatedTags
          })
        }}
      >
        {filter.values?.map((tag, i) => {
          return (
            <MenuItem value={tag} key={i}>
              {tag.value}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  ))

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
          <TextField
            id="Name"
            name="Name"
            label="Place name"
            variant="standard"
            required
          />
          <TextField
            id="Description"
            name="Description"
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
            name="images"
            multiple={true}
            value={images}
            onChange={handleChange}
            variant="standard"
          />
          <FormControl>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              name="category"
              label="category"
              variant="standard"
              onChange={(event) => {
                setCurrentCategory(event.target.value)
              }}
            >
              {categories?.map((category, i) => {
                return (
                  <MenuItem value={category} key={i}>
                    {category.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex" }}>{filters}</Box>
          <Button type="submit">Submit</Button>
        </Box>
      </Modal>
    </>
  )
}
