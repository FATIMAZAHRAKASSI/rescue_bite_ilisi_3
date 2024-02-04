import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
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

      <Image source={require('../../assets/images/RescueBite.png')}
          style={{
            height:120,
            width:120,
            top:180,
            justifyContent:'center',
            position:'absolute',
          }}
        />

      <Text style={{
            fontSize: 48,
            fontWeight: 800,
            color:'#81657C',
            justifyContent:'center',
            top:-250,
          }}>Admin Space </Text>

      </View>
      <View style={{
        paddingHorizontal:22,
        position:'absolute',
        top:300,
        width:'100%'
        }}>
          
          
          
          <Button 
            title="Create Organisation" 
            onPress={()=>navigation.navigate('CreateOrgaisation') }
          />

          <Button 
            title="Create Food Business" 
            onPress={()=>navigation.navigate('CreateFoodBusiness') }
          />



          <View style={{
            flexDirection:'row',
            marginTop:20,
            justifyContent:'center'
          }}>
            <Text style={{
              fontSize:15,
              color:'#0B0A0A',
            }}>
              Log out from 
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
                >here</Text>
            </Pressable>
           

          </View>
         
      </View>
    </LinearGradient>
  );
};

export default Welcome;