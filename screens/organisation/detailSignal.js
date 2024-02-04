import {React,useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button'; // Importez le composant de bouton personnalisé
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailSignal = ({ route }) => {
  // Obtenez l'ID du marqueur à partir des paramètres de navigation
  const { markerId } = route.params;



const [markerDetails,Setmdata]=useState({});
  // Supposons que vous ayez une liste de données des marqueurs avec des images
  const markersData = [
    { 
      id: 1, 
      title: 'Marker 1', 
      coordinate: { latitude: 33.70656, longitude: -7.34330 }, 
      typeNourriture: 'Fruits', 
      quantite: '10 kg', 
      dateExpiration: '2024-03-15', 
      dateSignal: '2024-02-01', 
      statut: 'Disponible', 
      image: 'https://images.squarespace-cdn.com/content/v1/5abbec19f8370a187f55fec9/1615042481635-VKCO3BRG0JZW9NP13DDZ/Green+Kitchen+-+Food+Photography+%26+Food+Styling+by+Alinea+Collective-12.jpg?format=2500w',
      description: 'Description du signal 1' 
    },
    { 
      id: 2, 
      title: 'Marker 2', 
      coordinate: { latitude: 33.70180, longitude: -7.35100 }, 
      typeNourriture: 'Légumes', 
      quantite: '5 kg', 
      dateExpiration: '2024-03-10', 
      dateSignal: '2024-02-02', 
      statut: 'Réservé', 
      image: 'https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0',
      description: 'Description du signal 2' 
    },
    { 
      id: 3, 
      title: 'Marker 3', 
      coordinate: { latitude: 33.70000, longitude: -7.35200 }, 
      typeNourriture: 'Viande', 
      quantite: '3 kg', 
      dateExpiration: '2024-03-20', 
      dateSignal: '2024-02-03', 
      statut: 'Indisponible', 
      image: 'https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0',
      description: 'Description du signal 3' 
    },
    { 
      id: 4, 
      title: 'Marker 4', 
      coordinate: { latitude: 33.70480, longitude: -7.35200 }, 
      typeNourriture: 'Produits laitiers', 
      quantite: '8 litres', 
      dateExpiration: '2024-03-25', 
      dateSignal: '2024-02-04', 
      statut: 'Disponible', 
      image: 'https://images.squarespace-cdn.com/content/v1/5abbec19f8370a187f55fec9/1615042481635-VKCO3BRG0JZW9NP13DDZ/Green+Kitchen+-+Food+Photography+%26+Food+Styling+by+Alinea+Collective-12.jpg?format=2500w',
      description: 'Description du signal 4' 
    },
    // Ajoutez d'autres marqueurs si nécessaire
  ];
  const applyDemande = async (id_signal) => {
    const storedUserId =  await AsyncStorage.getItem('idorganisation');
    const integer1 = parseInt(storedUserId); // The second parameter (radix) is important, 10 indicates base 10 (decimal)
    console.log("int"+integer1)
    const data ={
      "id_signal":id_signal,
      "id_organisation": integer1
  }
    const responseComerceDB = await axios.post('http://192.168.43.177:3005/create/demande', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(responseComerceDB.status==200)
    {
      console.log("done")
    }
    else
    {
      console.log("not done")
    }
  }
  
  // Implémentez la logique pour récupérer les détails du marqueur à partir de son ID
  const getMarkerDetailsById = async (id) => {
    // Recherchez dans la liste de données des marqueurs pour trouver le marqueur correspondant à l'ID donné
    const response = await axios.get(`http://192.168.43.177:3003/get/SQLsignal/${id}`, {
         headers: {
           'Content-Type': 'application/json',
         },
         data:{}
       });
       console.log("dd "+JSON.stringify(response.data))
    Setmdata(response.data)
    console.log("first"+markerDetails)
  };

  // Obtenez les détails du marqueur en fonction de son ID
  getMarkerDetailsById(markerId);
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails du Signal</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>ID du Marqueur: {markerDetails.id_signal}</Text>
        <Text style={styles.detailTitle}>Type de Nourriture: {markerDetails.type_nouriture}</Text>
        <Text style={styles.detailTitle}>Quantité: {markerDetails.quantité+' '+markerDetails.unite}</Text>
        <Text style={styles.detailTitle}>Date d'Expiration: {markerDetails.date_expiration}</Text>
        <Text style={styles.detailTitle}>Statut: {markerDetails.statutsignal}</Text>
        <Text style={styles.detailTitle}>Description: {markerDetails.description_signal}</Text>
      </View>
      <View style={{ width: 200 }}>
        <Button 
            title="Apply" 
            onPress={() =>applyDemande(markerDetails.id_signal)}
        />
       </View>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    detailContainer: {
      marginBottom: 10,
    },
    detailTitle: {
      fontWeight: 'bold',
    },
  });
  

export default DetailSignal;