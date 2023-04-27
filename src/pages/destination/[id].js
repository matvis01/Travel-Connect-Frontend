import NavBar from "@/components/navBar"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/router"

import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  ImageList,
  ImageListItem,
  Container,
} from "@mui/material"

export default function Destination(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_ANALITICS_API_KEY,
  })
  //const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const { id } = router.query

  // useEffect(() => {
  //   // setCenter({ lat: 52.237049, lng: 21.017532 })
  //   setLoaded(true)
  // }, [isLoaded])

  const center = { lat: 52.237049, lng: 21.017532 }

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          //width: "50%",
          // margin: "auto",
          // "@media (max-width: 1000px)": {
          //   width: "90%",
          // },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            flexGrow: 1,
          }}
        >
          Destination {id}
        </Typography>
        <Typography variant="body1">opis</Typography>

        <ImageList
          sx={{ width: "100%" }}
          //cols={2}
          rowHeight="auto"
          variant="string"
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>

        {isLoaded ? (
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerStyle={{ width: "100%", height: "500px" }}
          >
            <MarkerF position={center} />
          </GoogleMap>
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  )
}
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
]
