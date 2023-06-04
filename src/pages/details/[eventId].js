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

export default function Destination({ eventId }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_ANALITICS_API_KEY,
  })
  const [events, setEvents] = useState()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/Events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        console.log(res.data)
        setEvents(res.data)
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
          Totalnie swienty event poznalem tam czlowieka o imieniu Jakub GIL
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
          Czasem lepiej jesc kebaba niz tanczyc na waleta 
        </Typography>


        {isLoaded ? (
            <span>czerwony rum dekalog</span>
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { eventId } = query

  return {
    props: {
      eventId,
    },
  }
}
