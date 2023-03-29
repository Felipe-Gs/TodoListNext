import "@/styles/globals.css";
// import MainContainer from "@/components/MainContainer";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export default function App({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: red[500],
      },
    },
  });

  return <Component {...pageProps} />;
}
