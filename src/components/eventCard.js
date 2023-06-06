import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../api/api";
import dayjs from "dayjs";

export default function EventCard(props) {
  const {
    id,
    name,
    description,
    startsAt,
    endsAt,
    canSignUp,
    isSignedUp,
    isEditable,
  } = props.event;
  const [isSignedUpState, setIsSignedUpState] = useState(isSignedUp);
  const [formattedDates, setFormattedDates] = useState({
    startingDate: "",
    endingDate: "",
  });
  const eventId = id;
  const router = useRouter();
  const handleClick = () => {
    router.push(`/details/${eventId}`);
  };

  useEffect(() => {
    const stDate = dayjs(startsAt).format("DD/MM/YYYY HH:mm");
    const enDate = dayjs(endsAt).format("DD/MM/YYYY HH:mm");
    setFormattedDates({ startingDate: stDate, endingDate: enDate });
  }, []);

  async function handleSignUpOrOut() {
    const upOrOut = isSignedUpState ? "sign-out" : "sign-up";
    try {
      const res = await api.put(
        `/Events/${eventId}/${upOrOut}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsSignedUpState(!isSignedUpState);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea
        onClick={handleClick}
        //href={`/destination/${id}`}
        sx={{ cursor: "pointer", height: "100%" }}
      >
        {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
      /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography> starts at: {formattedDates.startingDate}</Typography>
          <Typography> ends at: {formattedDates.endingDate}</Typography>
        </CardContent>
        <CardActions>
          {canSignUp && (
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleSignUpOrOut();
              }}
            >
              {isSignedUpState ? "sign out" : "sign up"}
            </Button>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
