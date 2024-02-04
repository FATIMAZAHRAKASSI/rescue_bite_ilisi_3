import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from '../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [userType, setUserType] = useState('Organisation');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserTypeChange = (type) => {
      setUserType(type);
    };

    const handleLogin = async () => {
      // Check the user type and navigate accordingly
      if (userType === 'Organisation') {
        const response = await axios.get(`http://192.168.43.177:3002/authentificationOrganisation/${email}/${password}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{
            }
          });
          console.log("aa"+JSON.stringify(response.data))
          if(response.data.error=="organisation n existe pas")
          { navigation.navigate('Login');
           }
           else{
            const idid=response.data.id_utilisateur
            const string1 = idid.toString();
            await AsyncStorage.setItem('idorganisation', string1);
            navigation.navigate('HomeOrganisation');
           }      
        } else if (userType === 'Food Business') {
        const response = await axios.get(`http://192.168.43.177:5000/authentificationCommerce/${email}/${password}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{
            }
          });
        if(response.data.error=="commerce n existe pas")
       {          console.log("aa"+JSON.stringify(response.data))      
        navigation.navigate('Login');
        }
        else{
            const idid=response.data.id_utilisateur
            const string1 = idid.toString();
            await AsyncStorage.setItem('idcommerce',string1 );
            navigation.navigate('HomeFoodBusiness');
        }
      }else if (userType === 'Admin') {
        const response = await axios.get(`http://192.168.43.177:5001/authentificationaAdmin/${email}/${password}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            data:{
            }
          });
        if(response.data.error=="Admin n existe pas")
       {          console.log("aa"+JSON.stringify(response.data))      
        navigation.navigate('Login');
        }
        else{
            navigation.navigate('HomeAdmin');
        }      }
      
    };
    
    

    return (
        <LinearGradient colors={['#fff1eb', '#E9C8CE']} // Specify your gradient colors here
      style={{
        flex: 1,
      }}
    >
        <View style={{ flex: 1 , top:80}}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 , justifyContent: 'center'}}>
                    <Text style={{
                        marginVertical: 14,
                        fontSize: 30,
                        fontWeight: 800,
                        color:'#81657C',
                        justifyContent:'center',
                    }}>
                         Welcome Back !
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            style={{
                                width: "100%"
                            }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        marginBottom:20
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={!isPasswordShown}
                            style={{
                                width: "100%"
                            }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 6  ,  marginBottom:20 }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 20,
                          
                        }}
                        onPress={() => handleUserTypeChange('Organisation')}
                      >
                        <Ionicons name={userType === 'Organisation' ? 'radio-button-on' : 'radio-button-off'} size={24} color={COLORS.black} />
                        <Text>Organisation</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => handleUserTypeChange('Food Business')}
                      >
                        <Ionicons name={userType === 'Food Business' ? 'radio-button-on' : 'radio-button-off'} size={24} color={COLORS.black} />
                        <Text style={{ marginLeft: 6 }}>Food Business</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() => handleUserTypeChange('Admin')}
                      >
                        <Ionicons name={userType === 'Admin' ? 'radio-button-on' : 'radio-button-off'} size={24} color={COLORS.black} marginLeft={10}/>
                        <Text >Admin</Text>
                      </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 10 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.black : undefined}
                    />

                    <Text>Remenber Me</Text>
                </View>

                <Button
                    title="Login"
                    onPress={handleLogin}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>Or Login with</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View> */}

            

                {/* <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Register</Text>
                    </Pressable>
                </View> */}
            </View>
        </View>
        </LinearGradient>

    )
}

export default Login