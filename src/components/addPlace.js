import React, {
  useEffect,
  useState,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react"
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
  const [place, setPlace] = useState({
    lat: null,
    lng: null,
  })
  const [categories, setCategories] = useState()
  const [currentCategory, setCurrentCategory] = useState()
  const [currentTags, setCurrentTags] = useState([])
  const [images, setImages] = useState([])
  useLayoutEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const filterIds = currentTags.map((tag) => tag.id)

    let imageUrls = []

    await Promise.all(
      images.map(async (image) => {
        const formData = new FormData()
        formData.append("image", image)
        try {
          const res = await api.post("/Photos", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

          console.log(res.data)
          imageUrls.push({ url: res.data.url })
        } catch (err) {
          console.log(err)
        }
      })
    )

    const finishedPlace = {
      name: data.get("Name"),
      description: data.get("Description"),
      categoryId: currentCategory.id,
      address: place,
      filtersIds: filterIds,
      photos: imageUrls,
    }

    // async function postPlace() {
    //   console.log(finishedPlace)
    //   try {
    //     const res = await api.post("/TouristPlace", finishedPlace, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     console.log(res.data)
    //     props.handleClose(res.data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    // postPlace()
  }
  const handleChange = (newFile) => {
    newFile.length == 0
      ? removeImage()
      : setImages((prev) => [...newFile, ...prev])
  }

  function removeImage(index = 0) {
    setImages([])
  }

  const formRef = useRef()
  const isBtnActive = () => {
    if (formRef.current == undefined) return false
    const data = new FormData(formRef.current)
    return (
      data.get("Name") &&
      place.lat &&
      images.length > 0 &&
      currentCategory &&
      currentTags.length > 0
    )
  }

  const filters = useMemo(
    () =>
      currentCategory?.filters?.map((filter, index) => (
        <FormControl sx={{ width: "100%" }} key={index}>
          <InputLabel id="filter" required>
            {filter.name}
          </InputLabel>
          <Select
            name="filter"
            required
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
      )),
    [currentCategory]
  )

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
          ref={formRef}
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
            <InputLabel id="category" required>
              Category
            </InputLabel>
            <Select
              labelId="category"
              required
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
          <Button type="submit" disabled={!isBtnActive()}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  )
}
