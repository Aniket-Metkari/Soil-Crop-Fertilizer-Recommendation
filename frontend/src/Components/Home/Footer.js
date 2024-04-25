import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

const Footer = () => {
  const [localText, setLocalText] = React.useState([]);

  const texts = [
    "Crop and Fertilizer Recommendation System",
    "Crop Recommender",
    "Fertilizer Recommender",
    "Soil Analysis And Fertilizer Recommendation Using Machine Learning",
    "VIT"
  ];


  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          color: "#fff",
          backgroundColor:"green",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Container maxWidth="lg">
          <br/><br/>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography color="#fff" variant="h5" className="title">
                {localText[3] ? localText[3] : texts[3]}
              </Typography>
            </Grid>
            <br />
            <br/>
            <Grid item xs={12}>
              <Typography color="#fff" variant="subtitle1">
                { ` ${localText[4] ? localText[4] : texts[4]} | ${new Date().getFullYear()} | ${
                  localText[1] ? localText[1] : texts[1]
                } | ${localText[2] ? localText[2] : texts[2]}`}
              </Typography>
            </Grid>
          </Grid>
          <br/>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
