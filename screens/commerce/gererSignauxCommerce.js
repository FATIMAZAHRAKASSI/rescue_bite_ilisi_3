import {React,useEffect, useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
let signalsData = [
   {
      id: 1,
      type_nouriture: 'Sandwich',
      quantité: '2 pieces',
      image: { uri: 'https://th.bing.com/th/id/OIP.66fJyDrZsA_rgWojY8EcCgHaFj?rs=1&pid=ImgDetMain' },
      description: 'Delicious sandwiches with cheese and vegetables.',
      date_expiration: '2024-02-10',
      statutsignal: 'In progress',
  }
];




const SignalItem = ({ item, onPress }) => {
    const navigation = useNavigation();
console.log("itemFGHJK"+`../../assets/images/${item.image}`+'fghj')
const imagePath = `../../assets/images/imgSig4.png`;
   return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPress(item)}>
<Image source={require(imagePath)} style={styles.image} />

            <View style={styles.itemContent}>
                <Text style={styles.title}>{item.type_nouriture.toString()}</Text>
                <Text style={styles.description}>{item.description_signal.toString()}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>{item.quantité.toString()+' '+item.unite}</Text>
                    <Text style={styles.detailsText}>{item.date_expiration.toString().split('T')[0]}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={[styles.statusText, { color: item.statutsignal.toString() === "Termine" ? 'purple' : 'green' }]}>
                        {item.statutsignal.toString()}
                    </Text>
                    <TouchableOpacity
                        style={styles.moreButton}
                        onPress={() => navigation.navigate('DetailsSignaux', { item: item })}
                    >
                     <Ionicons name="ios-arrow-forward" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const SignalsPage = () => {
   const [mydata,setdata]=useState([]);
  
    const handlePressSignal = (item) => {
        navigation.navigate('DetailsSignaux', { item: item }); // Envoyer les données de l'élément sélectionné à DetailsSignaux
    };
      const fetchData = async  () => {
   
      const storedUserId = await AsyncStorage.getItem('idcommerce');
      const integer1 = parseInt(storedUserId);
      try {
         const response = await axios.get(`http://192.168.43.177:3003/FindAllEn_attente/SQLsignal/${integer1}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{}
          });
          if(response.status==200)
          {
            console.log("data"+JSON.stringify(response.data))
          //  signalsData=[]
           /* response.data.forEach(async item => {
               signalsData.push(item)
            })*/
            setdata(response.data)
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
        <View style={styles.container}>
            <View style={{ marginVertical: 22 }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginVertical: 12,
                    color: COLORS.purple1,
                }}>
                    Signals
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: COLORS.black
                }}>List of Signals for Our Food Commerce</Text>
            </View>
            <FlatList
                data={mydata}
                keyExtractor={(item) => item.id_signal.toString()}
                renderItem={({ item }) => <SignalItem item={item} onPress={handlePressSignal} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 20,
    },
    itemContent: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        color: '#888',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailsText: {
        fontSize: 16,
        color: '#888',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 16,
        color: '#888',
    },
    moreButton: {
        backgroundColor: COLORS.purle2,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SignalsPage;
