import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

const CarouselComponent = () => {
  const items = [
    {
      image: "/c1.jpg",
      heading: "Crop and Fertilizer's recommendations",
      description:
        "Get Personalized Crop and Fertilizer's recommendations suitable soil",
    },
    {
      image: "/c2.jpg",
      heading: "Easy To Use",
      description: "Get All Recommendation using Our Website",
    },
    {
      image: "/c3.png",
      heading: "Agriculture",
      description: "Agriculture",
    },
  ];

  const [localText, setLocalText] = React.useState([]);

  const texts = [
    "Crop and Fertilizer Recommendation System",
    "Predict Crop/Fertilizer",
    "Get Lastest Agriculture News",
  ];

  const localLan = localStorage.getItem("i18nextLng");
  useEffect(() => {
    let values;

    (async () => {
      values = await Promise.all(
        items.map(async (instruction) => {
          const heading = await translatorFunc(
            "en",
            localLan,
            instruction.heading
          );
          const description = await translatorFunc(
            "en",
            localLan,
            instruction.description
          );
          return { ...instruction, heading: heading, description: description };
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

  return (
    <div>
      <Carousel
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
      >
        {localText
          ? localText.map((item, index) => (
              <Paper
                key={index}
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: 500,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      color: "white",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {item.heading}
                  </h2>
                  <p style={{ color: "white", textAlign: "center" }}>
                    {item.description}
                  </p>
                  {/* <Butdtton> */}
                </div>
              </Paper>
            ))
          : items.map((item, index) => (
              <Paper
                key={index}
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: 500,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h2 style={{ color: "white", textAlign: "center" }}>
                    {item.heading}
                  </h2>
                  <p style={{ color: "white", textAlign: "center" }}>
                    {item.description}
                  </p>
                  {/* <Butdtton> */}
                </div>
              </Paper>
            ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
