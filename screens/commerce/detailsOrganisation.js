import {React,useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from '../../components/Button'; // Importez le composant de bouton personnalisé
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsOrganisation = ({ route }) => {
  // Obtenez l'ID du marqueur à partir des paramètres de navigation
  const { markerId } = route.params;



const [markerDetails,Setmdata]=useState({});
  
  // Implémentez la logique pour récupérer les détails du marqueur à partir de son ID
  const getMarkerDetailsById = async (id) => {
    // Recherchez dans la liste de données des marqueurs pour trouver le marqueur correspondant à l'ID donné
    const response = await axios.get(`http://192.168.43.177:3002/get/SQLorganisation/${id}`, {
         headers: {
           'Content-Type': 'application/json',
         },
         data:{}
       });
       console.log("dd "+JSON.stringify(response.data))
    Setmdata(response.data)
  };

  // Obtenez les détails du marqueur en fonction de son ID
  getMarkerDetailsById(markerId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails d'organisation</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>ID du Marqueur: {markerDetails.id_utilisateur}</Text>
        <Text style={styles.detailTitle}>Type de l'organisation: {markerDetails.type_organisation}</Text>
        <Text style={styles.detailTitle}>Email: {markerDetails.email}</Text>
        <Text style={styles.detailTitle}>Adresse: {markerDetails.adresse}</Text>
        <Text style={styles.detailTitle}>Description: {markerDetails.description}</Text>
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
  

export default DetailsOrganisation;