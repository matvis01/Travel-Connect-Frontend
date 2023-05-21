import "@/styles/eventCardStyles.css"
import "@/styles/globals.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const theme = createTheme({
  palette: {
    primary: {
      main: "#7ACDFF",
    },
    secondary: {
      main: "#f44336",
    },
  },
})
export default function App({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </LocalizationProvider>
  )
}
