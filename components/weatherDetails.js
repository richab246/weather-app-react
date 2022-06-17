import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../utils';
import { FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetails({currentWeather, unitsSystem}) {
  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date = days[today.getDay()]+', '+today.getDate() + ' ' + months[today.getMonth()];
    setDate(date);
  }, []);
  const { main: {feels_like, humidity, pressure}, wind: {speed}} = currentWeather

  const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h` 
  return (
    <>
    <Text style={styles.currentDate}>{date}</Text>
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
          <View style={styles.weatherDetailsRow}>
          <FontAwesome5 name="temperature-low" size={25} color='#0F253E'/>
          <View style={styles.weatherDetailsItems}>
          <Text>Feels like :</Text>
         <Text style={styles.textSecondary}>{feels_like} °</Text>
          </View> 
         </View>
        </View>
        <View style={styles.weatherDetailsBox}>
        <View style={styles.weatherDetailsRow}>
          <MaterialCommunityIcons name="water" size={30} color='#0F253E'/>
          <View style={styles.weatherDetailsItems}>
          <Text>Humidity :</Text>
         <Text style={styles.textSecondary}>{humidity} %</Text>
          </View> 
         </View> 
        </View>
      </View>
      <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR}}>
        <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
          <View style={styles.weatherDetailsRow}>
          <MaterialCommunityIcons name="weather-windy" size={30} color='#0F253E'/>
          <View style={styles.weatherDetailsItems}>
          <Text>Wind Speed :</Text>
         <Text style={styles.textSecondary}>{windSpeed}</Text>
          </View> 
         </View>
        </View>
        <View style={styles.weatherDetailsBox}>
        <View style={styles.weatherDetailsRow}>
          <MaterialCommunityIcons name="speedometer" size={30} color='#0F253E' />
          <View style={styles.weatherDetailsItems}>
          <Text>Pressure :</Text>
         <Text style={styles.textSecondary}>{pressure} hPa</Text>
          </View> 
         </View> 
        </View>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    // marginBottom: 200,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 10,
    // height: 200
  },
  weatherDetailsRow :{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  weatherDetailsBox : {
    flex: 1,
    padding: 20
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: '700',
    margin: 7
  },
  currentDate: {
    fontSize: 20,
    fontWeight: '600',
    margin: 20,
    color: '#06274C'
  }
})
