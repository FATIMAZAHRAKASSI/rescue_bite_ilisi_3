import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
const Welcome = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#fff1eb', '#E9C8CE']} // Specify your gradient colors here
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{
            fontSize: 48,
            fontWeight: 800,
            color:'#81657C',
            justifyContent:'center',
            top:-250,
          }}>Rescue Bite </Text>

        <Image source={require('../assets/images/RescueBite.png')}
          style={{
            height:280,
            width:280,
            top:180,
            position:'absolute',
          }}
        />
      </View>
      <View style={{
        paddingHorizontal:22,
        position:'absolute',
        top:400,
        width:'100%'
        }}>
          {/* <Text style={{
            left:10,
            fontSize: 48,
            fontWeight: 800,
            color:'#B384A7',
            justifyContent:'center'
          }}>Rescue Bite </Text> */}
          {/* <Text style={{
            left:10,
            fontSize: 38,
            fontWeight: 800,
            color:'#FF2A2A',
          }}>Started</Text> */}
          
          
          <View style={{marginVertical:22}}>
          <Text style={{
            left:10,
            fontSize: 18,
            fontWeight: 800,
            color:'#B384A7',
            marginTop:70,
          }}>Join us in the fight against hunger and make a difference with Rescue Bite! </Text>
          {/* <Text style={{
            left:10,
            fontSize: 18,
            fontWeight: 800,
            color:'#FF2A2A',
            marginBottom:30
          }}>partner for swift and secure deliveries</Text> */}
         
          </View>
          
          <Button 
            title="Join Now" 
            onPress={()=>navigation.navigate('Login') }
          />
          <View style={{
            flexDirection:'row',
            marginTop:12,
            justifyContent:'center'
          }}>
            <Text style={{
              fontSize:15,
              color:'#0B0A0A',
            }}>
              ALready have an account
            </Text>
            <Pressable
              onPress={()=>navigation.navigate('Login')}
            >
                <Text style={{
                  fontSize:15,
                  color:'#B384A7',
                  fontWeight:'bold',
                  marginLeft:4,
                }}
                >Login</Text>
            </Pressable>
           

          </View>
         
      </View>
    </LinearGradient>
  );
};

export default Welcome;