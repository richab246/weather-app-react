import { StyleSheet, Text, View, ActivityIndicator, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import weatherInfo from './components/weatherInfo';
import WeatherInfo from './components/weatherInfo';
import UnitsPicker from './components/unitsPicker';
import { colors } from './utils';
import ReloadIcon  from './components/reloadIcon';
import WeatherDetails from './components/weatherDetails';

const WEATHER_API_KEY = '4ff881374c514a3eddf93bceeae579c6'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const img = require('./assets/appbackground.jpg');

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
  }, [unitsSystem])
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      
      const {latitude, longitude} = location.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)

      const result = await response.json()
    
      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  } 
  if(currentWeather){
    return (
      
      <View style={styles.container}>
        <ImageBackground source={img} style={styles.image}>
        <View style={styles.main}>
        <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
        <ReloadIcon load={load}/>
        <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
        </ImageBackground>
      </View>
     
    );
  }else if(errorMessage){
    return (
      <View style={styles.container}>
         <ReloadIcon load={load}/>
        <Text style={{textAlign: 'center'}}>{ errorMessage }</Text>
      </View>
    )
  }else {
    return (
      <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/> 
    </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center'
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
