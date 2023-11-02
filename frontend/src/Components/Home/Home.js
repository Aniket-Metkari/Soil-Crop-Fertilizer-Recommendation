import "./Home.css";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Menu from "./Menu";
import CarouselComponent from "./CarouselComponent";
import { Link } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <CarouselComponent />
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        alignItems={"center"}
        style={{height:'60vh'}}
      >
        <Grid item xs={6} sm={4} md={3} key="crop" sx={{}}>
          <Card sx={{ maxWidth: 345 }}>
            <Link to="/crop-recommender" style={{textDecoration:'none',textAlign:'center'}} justifyContent="center">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image="/crop_img.jpeg"
                  alt="Crop Recommender"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('Crop Recommender')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={3} key="fertilizer" sx={{}}>
          <Card sx={{ maxWidth: 345 }} >
            <Link to="/fertilizer-recommender" style={{textDecoration:'none',textAlign:'center'}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image="/fertilizer_img.jpeg"
                  alt="Fertilizer Recommender"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('Fertilizer Recommender')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
