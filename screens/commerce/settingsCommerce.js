import React ,{ useState,useEffect }from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Switch,
  SectionList,
  FlatList,

} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';


const SECTIONS = [

  {
    header: 'Log out',
    icon: 'help-circle',
    items: [
        {
            icon: 'log-out',
            color: '#fd2d54',
            label: 'Logout',
            type: 'logout',
          },
],
  },
];


const handleItemPress = (type, navigation) => {
    if (type === 'logout') {
      // Handle logout type (navigate to login screen)
      navigation.navigate('Login');
    }
  };

  
const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image
       source={require( `../../assets/images/logoCom1.png`,
       )}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

export default function SettingsCommerce() {

  const navigation = useNavigation();
  const [mydata,setmydata]=useState({});
  const fetchData = async  () => { 
    const storedUserId = await AsyncStorage.getItem('idcommerce');
    const integer1 = parseInt(storedUserId); 
    console.log("id:"+integer1)
    try {
       const response = await axios.get(`http://192.168.43.177:5000/get/SQLcommerce/${integer1}`, {
          headers: {
            'Content-Type': 'application/json',
          },
         
        });
        if(response.status==200)
        {setmydata(response.data)
          console.log(response.data.logo)
          console.log(JSON.stringify(response.data))
        }
        else{
          console.log("no")
        }
      }
      catch(e)
      {
        console.log("erroor "+e);
      }}
      useEffect(() => {
        fetchData();
        console.log("this data"+JSON.stringify(mydata))
     }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <SectionList
            contentContainerStyle={styles.imageList}
            stickySectionHeadersEnabled={false}
            sections={SECTIONSIMG}
            renderItem={({ item }) => <ListItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.middleSection}>
        <View style={styles.logoContainer}>
        <Image
  source={require('../../assets/images/logoCom5.png')}
  style={styles.logo}
/>
          </View>
          
            <View style={styles.profile}>
              

              <View style={styles.profileBody}>
                <Text style={styles.profileName}>{mydata.nom_user}</Text>
                <Text style={styles.profileAddress}>
                {mydata.description}
                </Text>
                <View style={styles.contactDetail}>
              <FeatherIcon style={styles.iconDetail} name="type" size={20} />
              <Text style={styles.contactText}>{mydata.type_commerce}</Text>
            </View>

              </View>
          
          </View>
          <View style={styles.middleSection}>
            <Text style={styles.sectionTitle}>Contact Info</Text>
            <View style={styles.contactDetail}>
              <FeatherIcon style={styles.iconDetail} name="phone" size={20}  />
              <Text style={styles.contactText}>{mydata.numero_telephone}</Text>
            </View>
            <View style={styles.contactDetail}>
              <FeatherIcon style={styles.iconDetail} name="mail" size={20}  />
              <Text style={styles.contactText}>{mydata.email}</Text>
            </View>
            <View style={styles.contactDetail}>
              <FeatherIcon style={styles.iconDetail} name="map-pin" size={20} />
              <Text style={styles.contactText}>{mydata.adresse}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
  {SECTIONS.map(({ header, items }) => (
    <View style={styles.section} key={header}>
      {items.map(({ type }, index) => {
        if (type === 'logout') {
          return (
            <TouchableOpacity
              key={type}
              onPress={() => handleItemPress(type, navigation)}
            >
              <View style={styles.logoutButton}>
                <Text style={{ color: COLORS.purple1 , fontSize:18}}>Log out</Text>
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <View style={styles.row} key={type}>
            {/* Render other items here */}
          </View>
        );
      })}
    </View>
  ))}
</View>
        

        

        {/* <View style={styles.bottomSection}>
          {SECTIONS.map(({ header, items }) => (
            <View style={styles.section} key={header}>
              <Text style={styles.sectionHeader}>{header}</Text>
              {items.map(({ label, icon, type, value, color }, index) => {
                return (
                  <TouchableOpacity
                    key={label}
                    onPress={() => handleItemPress(type, navigation)}>
                    <View style={styles.row}>
                      <View
                        style={[styles.rowIcon, { backgroundColor: color }]}>
                        <FeatherIcon color="#fff" name={icon} size={18} />
                      </View>

                      <Text style={styles.rowLabel}>{label}</Text>

                      <View style={styles.rowSpacer} />

                      {type === 'boolean' && <Switch value={value} />}

                      {type === 'link' && (
                        <FeatherIcon
                          color="#0c0c0c"
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}




const SECTIONSIMG = [
  {
    title: 'Made for you',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
];


const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  contactDetail: {
    alignSelf:'center',
    flexDirection: 'row', // Met les éléments sur la même ligne
    alignItems: 'center', // Aligne les éléments verticalement
    marginBottom: 12, // Espace entre les détails de contact
  },
  iconDetail: {
    color: COLORS.purple1,
    marginRight: 8, // Espace entre l'icône et le texte
  },
  
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.purple1,                        
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
    marginBottom:20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.purple1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
  },
  imageList: {
    paddingHorizontal: 0, // Ajustez cette valeur selon vos besoins
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 75,
    borderWidth: 3, 
    marginTop: -70,
    borderColor: COLORS.purple1,
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },


  sectionTitle:{
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
    color:COLORS.purple1,
    margin:20,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 170,
    height: 150,
    borderRadius:20,
  },
  itemText: {
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 5,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5,
    color: COLORS.purple1,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.purple1,
    marginTop: 40, // Espace entre le bouton et le contenu suivant
  },
 
});

