import { createTheme, responsiveFontSizes } from "@mui/material";
import { blue } from "@mui/material/colors";

let theme = createTheme();

theme = responsiveFontSizes(theme)

export default theme
