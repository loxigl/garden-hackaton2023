import { Toolbar, Container, AppBar } from "@mui/material";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <Container maxWidth="xl">
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none", marginY: 4 }}
      >
        <Toolbar>
          <img src={logo} alt="Логотип" style={{ maxWidth: "300px" }} />
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;
