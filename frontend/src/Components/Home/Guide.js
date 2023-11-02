import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Guide = ({ guideOpen, setGuideOpen }) => {
  const [open, setOpen] = React.useState(guideOpen);
  const [newName, setNewName] = React.useState(null);

  const instructions = [];

  const [localInstructions, setLocalInstructions] = useState([]);

  const navigate = useNavigate();
  const localLan = localStorage.getItem("i18nextLng");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let values;

    (async () => {
      values = await Promise.all(
        instructions.map(async (instruction) => {
          const LocalInstruction = await translatorFunc(
            "en",
            localLan,
            instruction
          );
          return LocalInstruction;
        })
      ).catch((err) => {
        return err + " Mainly due to Internet Issue! ";
      });
      // .then((result)=>{
      //     console.log("values",result); // this works aswell
      // })
      console.log(values);
      setLocalInstructions(values);
      // setLangCities(values); // updating the cities
    })();
  }, []);

  // const navigateToSnip = () => {};

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

  const validateForm = () => {
    if (newName !== "" || newName.length !== 0) return true;
    alert("Please enter Name");
    return false;
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "100%",
            display: "block",
            transform: "translate(-50%, -50%)",
            width: 900,
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 4,
          }}
        >
          {/* <Grid container spacing={4} justifyContent={'center'}> */}
          {/* <Grid item xs={6} sm={4} md={3} key={snippet.id} sx={{}}>
            </Grid> */}
          {/* </Grid> */}
          <center style={{ margin: "10px" }}>
            <h2>
              {" "}
              {localInstructions[9]
                ? localInstructions[9]
                : instructions[9]}{" "}
            </h2>
            <br />
            <br />
          </center>
          <div style={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "18px", fontWeight: 900 }}>
                      {localInstructions[0]
                        ? localInstructions[0]
                        : instructions[0]}
                    </Typography>
                  }
                  style={{ fontSize: "100px" }}
                />
              </ListItem>
              <br />
              <center>
                <img src="/img.jpg" alt="language highlighter" height="350" />
              </center>
              <br />
              <br />
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "18px", fontWeight: 900 }}>
                      {localInstructions[1]
                        ? localInstructions[1]
                        : instructions[1]}
                    </Typography>
                  }
                />
              </ListItem>
              <br />
              <br />
              <center>
                <img
                  src="/img2.jpg"
                  alt="crop and fertilizer recommender"
                  height="350"
                />
              </center>
              <br />
              <br />
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "18px", fontWeight: 900 }}>
                      {localInstructions[2]
                        ? localInstructions[2]
                        : instructions[2]}
                    </Typography>
                  }
                />
              </ListItem>
              <center>
                <br />
                <img src="/img3.jpg" alt="Crop/image" height={500} />
              </center>
              <br />
              <br />
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    <Typography style={{ fontSize: "18px", fontWeight: 900 }}>
                      {localInstructions[3]
                        ? localInstructions[3]
                        : instructions[3]}
                    </Typography>
                  }
                >
                  <br />
                </ListItemText>
              </ListItem>
            </List>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                <img src="/img4.jpg" alt="geolocation" height={150} />
                <center>
                  <b>
                    {localInstructions[7]
                      ? localInstructions[7]
                      : instructions[7]}
                  </b>
                </center>
              </Grid>
              <Grid item>
                <img src="/img5.jpg" alt="manual" height={200} />
                <center>
                  <b>
                    {localInstructions[8]
                      ? localInstructions[8]
                      : instructions[8]}{" "}
                  </b>
                </center>
              </Grid>
            </Grid>
            <br />
            <br />
            <center>
              <Typography color="error">
                {" "}
                {localInstructions[4]
                  ? localInstructions[4]
                  : instructions[4]}{" "}
              </Typography>
              <br />

              <a href="https://www.napanta.com/soil-testing-laboratory/andhra-pradesh">
                {" "}
                {localInstructions[5] ? localInstructions[5] : instructions[5]}
              </a>
            </center>
            <br />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button onClick={handleClose} variant="outlined" color="error">
                {localInstructions[6] ? localInstructions[6] : instructions[6]}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Guide;
