import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import api from "../api/api"
import { useRouter } from "next/router"

const backgroundImage =
  "https://httoixguhkpljzhckejp.supabase.co/storage/v1/object/public/cover-images/photo-070e7ae2-3135-4629-8ae3-36771086c2cf.jpg"
const theme = createTheme()

export default function SignIn() {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    try {
      const res = await api.post("/Account/sign-in", {
        email: data.get("email"),
        password: data.get("password"),
      })
      const { accessToken } = res.data
      localStorage.setItem("token", accessToken)
      router.push("/")
    } catch (err) {
      console.log(err)
    }

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img
          src={backgroundImage}
          alt="kms"
          className="background"
          sx={{ backgroundColor: "#7ACDFF" }}
        />
        <Box
          sx={{
            backgroundColor: "white",
            padding: "40px",
            width: "450px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "@media (width < 600px)": {
              paddingX: "90px",
              width: "70%",
              height: "100%",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="./SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
