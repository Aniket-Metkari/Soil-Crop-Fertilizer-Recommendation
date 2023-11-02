import * as React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { State, City }  from 'country-state-city';
import { Alert, Button, TextField, Box, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next'

import './CropRecommender.css';

const URL = "http://127.0.0.1:5000/crops"

export default function CropRecommender() {

    const [crop, setCrop] = useState("")
    const [langCrop, setLangCrop] = useState("")
    const [chooseStateCity, setChooseStateCity] = useState(false)

    const country = "India"
    const [state, setState] = useState("")
    const [city, setCity] = useState("")

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [LangStates, setLangStates] = useState([])
    const [LangCities, setLangCities] = useState([])

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [data, setData] = useState()
    
    const [formElements,setFormElements] = useState({});
    
    const { t } = useTranslation();
    let localLan = localStorage.getItem("i18nextLng");

    useEffect(() => {
        setStates(State.getStatesOfCountry("IN"))
    }, [country])

    




    useEffect(()=>{
        if(data)
            getRecommend(formElements);
    },[data])


    const getRecommend = (fromElements) =>{
    
        const formInput = {
            "N": Number(fromElements["N"].value),
            "P": Number(fromElements["P"].value),
            "K": Number(fromElements["K"].value),
            "temperature": data.temp,
            "humidity": data.humid,
            "pH": Number(fromElements["pH"].value),
            "rainfall": Number(fromElements["rainfall"].value)
        }

        axios.post(URL, formInput)
        .then( (response) => {
            setCrop(response.data.crop)
        })
        .catch((error) => alert(error))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const rtvalue = await fetchTempertureAndHumidity();
        setFormElements(event.target.elements);

        setData(()=>{
            return {...rtvalue};
        })
    }

    const handleLocationInfoChange = (event) => {
            setChooseStateCity(true);
    }

    const getAvgTemperatureAndHumidity = async () =>{
        
        let avgTemp = [];
        let avgHumidity=[];
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

        let todayDate = new Date();
        let endDate = new Date();
        endDate.setMonth(todayDate.getMonth()+3);

        for (let index = 1; index <= 10; index++) {
        
            todayDate.setFullYear(todayDate.getFullYear()-1)
            endDate.setFullYear(endDate.getFullYear()-1)
        
            await fetch(`https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${todayDate.toISOString().slice(0, 10)}&end_date=${endDate.toISOString().slice(0, 10)}&hourly=temperature_2m,relativehumidity_2m`)
                .then(res => res.json())
                .then(async (result) => {
                    avgTemp.push(average(result.hourly.temperature_2m));
                    avgHumidity.push(average(result.hourly.relativehumidity_2m));
            })
        }
        return {temp:Math.round(average(avgTemp)*100)/100,humid:Math.round(average(avgHumidity)*100)/100}
    }
    
    const fetchTempertureAndHumidity = async () => {
        let resp = {};
        resp = await getAvgTemperatureAndHumidity();
        return {...resp};
    }

    const updateState = (latitude, longitude) => {

        console.log("Latitude is :", latitude)
        console.log("Longitude is :", longitude)

        setLatitude(latitude)
        setLongitude(longitude)
    }


    const handleStateChange = (event) => {
        setState(event.target.value)
        let checkStates = []
        LangStates.length !== 0 ? checkStates = LangStates : checkStates = states

        checkStates.forEach((state) => {
            if (state.name === event.target.value) {
                setCities(City.getCitiesOfState("IN", state.isoCode))
            }
        })
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)

        LangCities.forEach((c) => {
            if (c.name === event.target.value) {
                updateState(c.latitude, c.longitude)
            }
        })
    }

    return (
        <div className='CropRecommender'>
            <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
              autoComplete="off"
              onSubmit={e => handleSubmit(e)}
              className="cropForm"
            >
                <div>
                    <center>
                    <h1 className='heading'>{t('Crop Recommender')} </h1>
                        <div class="row">
                        <TextField
                            required
                            id="N"
                            name="N"
                            label={`${t('Nitrogen')} (mg/kg) `}
                            type="number"
                        />
                        <TextField
                            required
                            id="P"
                            name="P"
                            label={`${t('Phosphorus')} (mg/kg) `}
                            type="number"
                        />
                        </div>
                        
                        
            
                        <TextField
                            required
                            id="K"
                            name="K"
                            label={`${t('Potassium')} (mg/kg) `}
                            type="number"
                        />
                        <br />
                        
                        
                        <FormControl sx={{m:1, width: '25ch'}}>
                            <FormLabel id="location">{t('Location')}</FormLabel>
                            <RadioGroup
                                defaultValue="geolocation"
                                name="radio-buttons-group"
                                onChange={handleLocationInfoChange}
                                required
                            >
                                <FormControlLabel value="enter" control={<Radio />} label={`${t('Enter Manually')}`} />
                            </RadioGroup>
                        </FormControl>

                    
                        
                        {
                            chooseStateCity 

                            &&
                            <div class="row">
                                <FormControl sx={{m:1, width: '25ch'}}>
                                    <InputLabel id="state">{t('State')}*</InputLabel>
                                    <Select
                                    required
                                    id="state-select"
                                    value={state}
                                    label="State"
                                    onChange={handleStateChange}
                                    >
                                    {
                                        LangStates.length !== 0 ?
                                            LangStates.map((s) => {
                                                return <MenuItem value={s.name} key={s.name}>{s.name}</MenuItem>
                                            }) :
                                            states.map((s) => {
                                                return <MenuItem value={s.name} key={s.name}>{s.name}</MenuItem>
                                            })
                                    }
                                    </Select>
                                </FormControl>
                            
                            
                                
                                {
                                    state !== '' 

                                    &&

                                    <FormControl sx={{m:1, width: '25ch'}}>
                                        <InputLabel id="city">{t('City')}*</InputLabel>
                                        <Select
                                        required
                                        id="city-select"
                                        value={city}
                                        label="City"
                                        onChange={handleCityChange}
                                        >
                                        {
                                            LangCities.length !== 0 ?
                                                LangCities.map((c) => {
                                                    return <MenuItem value={c.name} key={c.name}>{c.name}</MenuItem>
                                                }) : 
                                                cities.map((c) => {
                                                    return <MenuItem value={c.name} key={c.name}>{c.name}</MenuItem>
                                                })
                                        }
                                        </Select>
                                    </FormControl>
                                }
                            </div>

                        }

                        <br />
                        <div class="row">
                        <TextField
                            required
                            id="pH"
                            name="pH"
                            label={`${t('PH')} (1-14) `}
                            type="number"
                            inputProps={{
                                step: "any"
                            }}
                        />
                        
                        <TextField
                            required
                            id="rainfall"
                            name="rainfall"
                            label={`${t('Rainfall')} (mm) `}
                            type="number"
                            inputProps={{
                                step: "any"
                            }}
                        />
                        </div>
                        

                        <Button className='submitBtn' variant="contained" color="primary" type="submit">{t('Get Crop Recommendation')}</Button>
                    </center>
                </div>

                <br/>
                <div>
                    {
                        crop
                        &&
                        <Alert severity="success">{t('Recommended Crop is')} <b>{crop}</b></Alert>
                        
                    }
                </div>
            </Box>
        </div>
    )
}