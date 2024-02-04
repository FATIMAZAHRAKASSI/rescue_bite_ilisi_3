import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import SearchBar from '../../components/Search';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const redMarkerPosition = { latitude: 33.70656, longitude: -7.35330 };

const markersData = [
   { id: 1, title: 'Marker 1', coordinate: { latitude: 33.70656, longitude: -7.34330 } },
   { id: 2, title: 'Marker 2', coordinate: { latitude: 33.70180, longitude: -7.35100 } },
   { id: 3, title: 'Marker 3', coordinate: { latitude: 33.70000, longitude: -7.35200 } },
   { id: 4, title: 'Marker 4', coordinate: { latitude: 33.70480, longitude: -7.35200 } },
   // Ajoutez d'autres marqueurs si nécessaire
 ];

function Welcome() {
  const [search, setSearch] = useState('');
  const [mydata, Setmydata] = useState([]);

  const handleSearch = () => {
     console.log('Recherche:', search);
     // Vous pouvez ajouter ici le code pour effectuer la recherche d'emplacements
  };

  const handleMarkerPress = (marker) => {
   console.log('Marker Pressed:', marker.title);
   // Naviguez vers les détails du marqueur
   navigation.navigate('DetailSignal', { markerId: marker.id });
 };
 const navigation = useNavigation();

 const fetchData = async  () => {
   
   try {
      const response = await axios.get(`http://192.168.43.177:3003/FindAllEn_attente/SQLsignal`, {
         headers: {
           'Content-Type': 'application/json',
         },
         data:{}
       });
       if(response.status==200)
       {
         console.log("data"+JSON.stringify(response.data))
         let jsonArray = [];
         response.data.forEach(async item => {
            const jsonorga={"coordinate":{"latitude":item.latitude,"longitude":item.longitude}}
            const merge={...jsonorga,"id":item.id_signal,"title":item.description_signal}
            jsonArray.push(merge)
         })
         Setmydata(jsonArray)
         console.log("mymy"+JSON.stringify(mydata))
      }
       else{
         console.log("nope")
       }
   }
   catch (e)
   {console.log(e)
   }
};
useEffect(() => {
   
   fetchData();
   console.log("this data"+JSON.stringify(mydata))
}, []);
  return (
     <SafeAreaView style={styles.container}>
     <SearchBar
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
      />
       <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{ latitude: 33.70656, longitude: -7.35330, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }}>
       {mydata.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
       </MapView>
      
       </SafeAreaView>
  );
 }
 
 const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center', },
  map: { ...StyleSheet.absoluteFillObject,bottom:50, },
  tabBar: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     height: 50,
     backgroundColor: '#ffffff',
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems: 'center',
     borderTopWidth: 0.5,
     borderTopColor: '#000000',
  },
  tab: {
     alignItems: 'center',
     justifyContent: 'center',
  },
  searchBar: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     height: 50,
     backgroundColor: '#ffffff',
     flexDirection: 'row',
     alignItems: 'center',
     borderBottomWidth: 0.5,
     borderBottomColor: '#000000',
  },
  searchInput: {
     flex: 1,
     paddingLeft: 10,
  },
  searchButton: {
     paddingRight: 10,
  },
 });
 
 export default Welcome;