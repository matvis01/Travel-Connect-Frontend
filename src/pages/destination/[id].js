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
  backdropClasses,
} from "@mui/material"
import { BorderAllRounded, Margin } from "@mui/icons-material"
import api from "../../api/api"
import { headers } from "next/dist/client/components/headers"

export default function Destination({ id }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_ANALITICS_API_KEY,
  })
  const [TouristPlace, setTouristPlace] = useState()
  const center = {
    lat: TouristPlace?.address.lat || 0,
    lng: TouristPlace?.address.lon || 0,
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/TouristPlace/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log(res.data)
        setTouristPlace(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "center",
          backgroundColor: "#d7e6fa",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            flexGrow: 1,
            marginTop: "70px",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
            fontWeight: "medium",
          }}
        >
          {TouristPlace?.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "50px",
            marginBottom: "50px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          {TouristPlace?.description}
        </Typography>

        <ImageList sx={{ width: "90%" }} variant="woven" cols={3} gap={8}>
          {TouristPlace?.photos?.map((item, i) => (
            <ImageListItem key={i}>
              <img src={item.url} loading="lazy" />
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

export async function getServerSideProps(context) {
  const { query } = context
  const { id } = query

  return {
    props: {
      id,
    },
  }
}
