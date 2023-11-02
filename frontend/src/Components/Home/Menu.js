import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import Guide from "./Guide";


const Menu = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [guideOpen, setGuideOpen] = React.useState(false);
  const [localText, setLocalText] = React.useState([]);

  const texts = [
    "Soil Analyzer",
    "Home",
    "Crop Recommender",
    "Fertilizer Recommender",
    "New Feature"
  ];
  const localLan = localStorage.getItem("i18nextLng");
  useEffect(() => {
    let values;

    (async () => {
      values = await Promise.all(
        texts.map(async (instruction) => {
          const Local = await translatorFunc("en", localLan, instruction);
          return Local;
        })
      ).catch((err) => {
        return err + " Mainly due to Internet Issue! ";
      });
      setLocalText(values);
    })();
  }, []);

  async function translatorFunc(src, tar, text) {
    try {
      var url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
        src +
        "&tl=" +
        tar +
        "&dt=t&q=" +
        encodeURI(text);
      const res = await fetch(url).catch("handleError");
      const json = await res.json().catch("handleError");
      const value = json[0][0][0];
      console.log(value);
      if (value === "" || value.length === 0) {
        return text;
      }
      return value;
    } catch {
      console.warn("Internet Issue");
      return [];
    }
  }

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Guide guideOpen={guideOpen} setGuideOpen={setGuideOpen} />
      <AppBar
        component="nav"
        sx={{ position: "relative", background: "green" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <img
              src={"/menu.png"}
              alt={"Hamburger Menu"}
              style={{ fontSize: "10px" }}
              width="25"
              height="25"
            />{" "}
            &ensp; Code Snippets
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            className="title"
          >
            {localText[0] ? localText[0] : texts[0]}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              key={"home"}
              sx={{ color: "#fff" }}
              onClick={() => navigate("/")}
            >
              {localText[1] ? localText[1] : texts[1]}
            </Button>
            <Button
              key={"Crop"}
              sx={{ color: "#fff" }}
              onClick={() => navigate("/crop-recommender")}
            >
              {localText[2] ? localText[2] : texts[2]}
            </Button>
            <Button
              key={"fertilizer"}
              sx={{ color: "#fff" }}
              onClick={() => navigate("/fertilizer-recommender")}
            >
              {localText[3] ? localText[3] : texts[3]}
            </Button>
            <Button
              key={"ferticrop"}
              sx={{ color: "#fff" }}
              onClick={() => navigate("/new-feature")}
            >
              {localText[4] ? localText[4] : texts[4]}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ position: "relative", marginBottom: "" }}>
        <Drawer
          container={
            window !== undefined ? () => window.document.body : undefined
          }
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              background: "#014f86",
              color: "white",
            },
          }}
        >
          <Box
            onClick={handleDrawerToggle}
            sx={{ textAlign: "center", background: "#014f86" }}
          >
            <Typography variant="h6" sx={{ my: 2 }} className="title">
              Crop & Fertilzier Recommender
            </Typography>
            <Divider sx={{ color: "white" }} />
            <List>
              <ListItem key={"home"} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={() => navigate("/")}
                >
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default Menu;
