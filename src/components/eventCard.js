import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { Button, CardActionArea, CardActions } from "@mui/material"
import styles from "../styles/eventCardStyles.module.css"

export default function eventCard() {
  return (
    <Card className={styles.eventCard}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/id/575/2000"
          alt="oczko morskie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Nazwa eventu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opis eventu: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed non justo leo. Duis nibh libero, imperdiet quis lacus at,
            egestas lobortis neque. Cras nec magna in sapien sollicitudin varius
            venenatis id lorem. Mauris convallis efficitur leo in imperdiet.
            Morbi vitae nulla sit amet turpis semper pulvinar. Integer congue
            quam nec purus gravida, at commodo urna efficitur
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button className={styles.signButton} size="small" color="primary">
          Sign up
        </Button>
      </CardActions>
    </Card>
  )
}
//
