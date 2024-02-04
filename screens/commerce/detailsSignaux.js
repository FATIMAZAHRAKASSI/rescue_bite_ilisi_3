import {React} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native'; // Import de useNavigation
import { useState ,useEffect} from 'react';
import axios from 'axios';
import SettingsOrganisation from '../organisation/settingsOrganisation';


const OrganisationData = [
  {
    id: 1,
    name: 'Organisation 1',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},

  },
  {
    id: 2,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
  {
    id: 3,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
  {
    id: 4,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
  {
    id: 5,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
  {
    id: 6,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
  {
    id: 2,
    name: 'Organisation 2',
    image: { uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'},
  },
];



const OrganisationItem = ({ item, onPress }) => {
console.log("your item"+item);
  const navigation = useNavigation();


  const handleAcceptSignal = async (item) => {
    const data ={
      "id_signal":item.id_signal,
      "id_organisation": item.organisation.id_utilisateur,
      "statutdemande":"Accepte"
  }
  console.log("here's data"+JSON.stringify(data)+item.id_demande)
    const response = await axios.put(`http://192.168.43.177:3005/accepter/demande/${item.id_demande}`,data, {
         headers: {
           'Content-Type': 'application/json',
         },
         
       });
       if(response.status==200)
       {
        console.log("yes")
       }
       else{
        console.log("no")
       }
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
      <Image source={{uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'}} style={styles.image2} />
      <Text style={styles.title}>{item.organisation.nom_user}</Text>
      <View style={{ width: 300, height: 40 ,  flex : 1 , alignSelf : 'center', marginTop:10 }}>
      <TouchableOpacity
        style={[
          styles.button2,
          { backgroundColor: 'white', borderColor: COLORS.purple1, borderWidth: 2 },
        ]}
        onPress={() =>handleAcceptSignal(item)}
      >
        <Ionicons name="checkmark-outline" size={24} color={COLORS.purple1} marginLeft ={-5}/>
        <Text style={[styles.buttonText2, { color: COLORS.purple1 }]}>Accept</Text>
      </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
};

const DetailsSignaux = ({ route }) => {
  const { item } = route.params; // Obtenir les données de l'élément sélectionné
  const [mydata,setdata]=useState([]);
  const [SignalOrganisation,setsignal]=useState({})
console.log("votre item "+JSON.stringify(item))
  const navigation = useNavigation(); // Utilisation de useNavigation

  const handleDeleteSignal = async () => {
    
  };

  const handleShowStatus = () => {
    console.log('Statut du signal :', item.statutsignal);
  };

  const handlePressSignal = (signal) => {
    // Logique pour gérer la pression sur un signal
    console.log('Signal pressé :', signal);
  };

  const fetchPlusieursOrganisation = async  () => {
   
   try {
      const response = await axios.get(`http://192.168.43.177:3005/FindAll/SQLdemande/${item.id_signal}`, {
         headers: {
           'Content-Type': 'application/json',
         },
         data:{}
       });
       if(response.status==200)
       {
         jsonarray=[]
         response.data.forEach(element => {
           jsonarray.push(element)
         });
           setdata(jsonarray)
           console.log("mymy"+JSON.stringify(jsonarray))
      }
       else{
         console.log("nope")
       }
   }
   catch (e)
   {console.log(e)
   }
};
const fetchUneOrganisation = async  () => {
   
   try {
      const response = await axios.get(`http://192.168.43.177:3005/FindAll/SQLdemande/${item.id_signal}`, {
         headers: {
           'Content-Type': 'application/json',
         },
         data:{}
       });
       if(response.status==200)
       {
         console.log("data"+JSON.stringify(response.data))
       
         setsignal(response.data[0])
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
   if(item.statutsignal=="En_attente")
  { fetchPlusieursOrganisation();
   console.log("this data"+JSON.stringify(mydata))
  }
  else{
   fetchUneOrganisation();
  }
}, []);



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>
      <View style={styles.header}>
      <Image source={{uri:'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0'}} style={styles.image} />

        <View style={styles.detailsContainer}>
          <Text style={styles.foodType}>{item.type_nouriture}</Text>
          <Text style={styles.descriptionText}>{item.description_signal}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.info}>
          <Ionicons name="ios-calendar" size={20} color={COLORS.purple1} />
          <Text style={styles.expireText}>{item.date_expiration}</Text>
        </View>
        <View style={styles.info}>
          <Ionicons name="ios-basket" size={20} color={COLORS.purple1} />
          <Text style={styles.quantity}>{item.quantité+' '+item.unite}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: 'white', borderColor: COLORS.purple1, borderWidth: 2 },
          ]}
          onPress={handleDeleteSignal}
        >
          <Ionicons name="trash-outline" size={24} color={COLORS.purple1} />
          <Text style={[styles.buttonText, { color: COLORS.purple1 }]}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: 'transparent',
              borderColor: COLORS.purple1,
              borderWidth: 2,
            },
          ]}
          onPress={handleShowStatus}
        >
          <Ionicons
            name={item.statutsignal === 'En_attente' ? 'ios-hourglass' : 'ios-checkmark-circle'}
            size={24}
            color={item.statutsignal === 'En_attente' ? 'green' : COLORS.purple1}
          />
          <Text
            style={[
              styles.buttonText,
              { color: item.statutsignal === 'En_attente' ? 'green' : COLORS.purple1 },
            ]}
          >
            {item.statutsignal}
          </Text>
        </TouchableOpacity>
      </View>

      

      {/* FlatList des organisations */}
      {item.statutsignal === 'En_attente' ? (
      <FlatList
        data={mydata}
        keyExtractor={(item) => item.id_utilisateur.toString()}
        renderItem={({ item }) => <OrganisationItem item={item} onPress={handlePressSignal} />}
      />
    ) : (
      // <View>
      //   <View style={styles.header}>
      //     <Image source={SignalOrganisation.logo} style={styles.image} />
      //     <View style={styles.detailsContainer}>
      //       <Text style={styles.foodType}>{SignalOrganisation.name}</Text>
      //       <Text style={styles.descriptionText}>{SignalOrganisation.description}</Text>
      //     </View>
      //   </View>
      //   <View style={styles.infoRow}>
      //     <View style={styles.info}>
      //       <Ionicons name="ios-calendar" size={20} color={COLORS.purple1} />
      //       <Text style={styles.expireText}>{item.expirationDate}</Text>
      //     </View>
      //     <View style={styles.info}>
      //       <Ionicons name="ios-basket" size={20} color={COLORS.purple1} />
      //       <Text style={styles.quantity}>{item.quantity}</Text>
      //     </View>
      //   </View>
      // </View>
      <View>
      <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                            marginVertical: 14,
                            color: COLORS.purple1,
                        }}>
                            The organization of Signal
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                            
                        }}> The organization who took advantage of this signal </Text>
                    </View>
      <View style={styles.header}>
        <Image source={{ uri: 'https://th.bing.com/th/id/R.13d056ddc26465d000d89561bcc4e958?rik=kOL%2f0b3vnanU9w&pid=ImgRaw&r=0' }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.foodType2}>{SignalOrganisation.nom_user}</Text>
          <Text style={styles.descriptionText}>{SignalOrganisation.description}</Text>
        </View>
      </View>
      <View style={styles.info2}>
        <Ionicons name="mail" size={20} color={COLORS.purple1}  marginRight={10}/>
        <Text style={styles.infoText}>{SignalOrganisation.email}</Text>
      </View>
      <View style={styles.info2}>
        <Ionicons name="location" size={20} color={COLORS.purple1}  marginRight={10}/>
        <Text style={styles.infoText}>{SignalOrganisation.adresse}</Text>
      </View>
      <View style={styles.info2}>
        <Ionicons name="time" size={20} color={COLORS.purple1}  marginRight={10}/>
        <Text style={styles.infoText}>Opening Hours: {SignalOrganisation.heure_ouverture}</Text>
      </View>
      <View style={styles.info2}>
        <Ionicons name="time" size={20} color={COLORS.purple1}  marginRight={10}/>
        <Text style={styles.infoText}>Closing Hours: {SignalOrganisation.heure_fermeture}</Text>
      </View>
    </View>
    


    )}


    </View>
    </ScrollView>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.purple1,
    marginLeft: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  quantity: {
    fontSize: 16,
    color: COLORS.purple1,
    marginLeft: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 75, 
    marginRight: 15,
    borderWidth: 2, 
    borderColor: COLORS.purple1,
  },
  image2: {
    width: 50,
    height: 50,
    borderRadius: 75, 
    marginRight: 10,
    borderWidth: 2, 
    borderColor: COLORS.purple1,
  },
  detailsContainer: {
    flex: 1,
  },
  foodType: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.purple1,
  },
  foodType2: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.purple1,
  },
  expireText: {
    fontSize: 16,
    color: COLORS.purple1,
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color : COLORS.purple1,
    marginBottom : 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor:COLORS.purple1,
    width: '48%', // Pour que les boutons aient un espacement entre eux
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: COLORS.purple1,
  },
  buttonText: {
    color: COLORS.purple1,
    marginLeft: 5,
  },
  buttonText2: {
    color: COLORS.purple1,
    marginLeft:1,
    marginRight:1,
  },
  title: {
   marginRight:50,
  },
  itemContainer: {
    marginBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},

});

export default DetailsSignaux;
