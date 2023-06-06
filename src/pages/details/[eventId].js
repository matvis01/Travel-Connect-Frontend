import NavBar from "@/components/navBar";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
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
} from "@mui/material";
import { BorderAllRounded, Margin } from "@mui/icons-material";
import api from "../../api/api";
import { headers } from "next/dist/client/components/headers";

export default function Destination({ eventId }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_ANALITICS_API_KEY,
  });
  const [event, setEvent] = useState();
  const [TouristPlace, setTouristPlace] = useState();
  const stDate = dayjs(event?.startsAt).format("DD/MM/YYYY HH:mm");
  const enDate = dayjs(event?.endsAt).format("DD/MM/YYYY HH:mm");

  useEffect(() => {
    async function fetches() {
      await fetchData();
      await fetchData2();
    }
    async function fetchData() {
      try {
        const res = await api.get(`/Events/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res);
        console.log(res.data);
        setEvent(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    async function fetchData2() {
      try {
        const res = await api.get(`/TouristPlace/${event.touristPlaceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data);
        setTouristPlace(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetches();
  }, [event]);

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
          {event?.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "50px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Description: {event?.description}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Organizer: {event?.organizerName}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Number of participants: {event?.signedUpUsersCount}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Starts At: {stDate}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          End at: {enDate}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Place:{TouristPlace?.name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            marginTop: "10px",
            marginBottom: "10px",
            width: "80%",
            backgroundColor: "#c1cfe1",
            WebkitBorderRadius: "5px",
            padding: "10px",
            borderTop: "1px solid",
            borderBottom: "1px solid",
          }}
        >
          Place description:{TouristPlace?.description}
        </Typography>
        <ImageList sx={{ width: "80%" }} variant="woven" cols={3} gap={8}>
          {TouristPlace?.photos?.map((item, i) => (
            <ImageListItem key={i}>
              <img src={item.url} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { eventId } = query;

  return {
    props: {
      eventId,
    },
  };
}
