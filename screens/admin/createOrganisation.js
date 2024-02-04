import { View,ScrollView, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet , Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Buffer } from 'buffer';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import {COLORS} from '../../constants/colors';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import * as ImagePicker from "expo-image-picker"; 
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullname] = useState('');
    const [description, setdescription] = useState('');
    const [adress, setadresse] = useState('');

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [type, setType] = useState('');
    // Stores the selected image URI 
    const [file, setFile] = useState(null); 
    
    const [images, setImages] = useState([]); // Stores the selected images URIs 
    // Stores any error message 
    const [error, setError] = useState(null); 
  const [base64Image, setBase64Image] = useState(null);
  const [imageBlob, setimageBlob] = useState(null);
 const [imagejsonjson,setimagejson]=useState(null);


    // Function to pick an image from  
    //the device's media library 
    const pickImage = async () => { 
        const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 
  
        if (status !== "granted") { 
  
            // If permission is denied, show an alert 
            Alert.alert( 
                "Permission Denied", 
                `Sorry, we need camera  
                 roll permission to upload images.` 
            ); 
        } else { 
  
            // Launch the image library and get 
            // the selected image 
            const result = 
                await ImagePicker.launchImageLibraryAsync(); 
  
            if (!result.canceled) { 
  
                // If an image is selected (not cancelled),  
                // update the file state variable 
                setFile(result.assets[0].uri.substring(result.assets[0]));

         
                //seturi(result.assets[0].uri)

             /*   try {
                /*    const response = await fetch(result.assets[0].uri);
                    const imageBlob = await response.blob();
                    setimageBlob(imageBlob);
                    const imageArrayBuffer = await new Response(imageBlob).arrayBuffer();
                    const imageBytes = Array.from(new Uint8Array(imageArrayBuffer));
                  //  console.log("Image Bytes:", imageBytes);

                    // Convert the image bytes to base64
                   const  base64ImageString = Buffer.from(imageBytes).toString('base64');
                    setBase64Image(base64ImageString)*/
                  //  setFile(result.assets[0].uri)
                    // Now you can use base64Image to display the image
                   // console.log("Base64 Image:", base64Image);
              /*  } catch (error) {
                    console.error('Error getting image bytes:', error);
                }*/

                // Clear any previous errors 
                setError(null); 
            } 
        } 
    }; 

    const removeImage = (indexToRemove) => {
        const updatedImages = images.filter((image, index) => index !== indexToRemove);
        setImages(updatedImages);
    };

    /// Function to pick multiple images
    const pickMultipleImages = async () => {
        // Launch the image library and allow selecting multiple images
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });
    
        if (!result.canceled) {
        // If images are selected (not cancelled),
        // update the images state variable
        const selectedImages = result.assets.map(asset => asset.uri.substring(asset.uri));
        setImages([...images, ...selectedImages]);    
        // Clear any previous errors
        setError(null);
        }
    };
    const onPlaceSelected = (data, details) => {
        // Do something with the selected place details
        console.log(data, details);
      };

      const processImages = async () => {
        const imagesObjectRR = {};
        for (const [index, image] of images.entries()) {
       // console.log("ehm"+image);
         /*   const responseRR =  await fetch(image);
            const imageBlobRR =  await responseRR.blob();
            const imageArrayBufferRR =  await new Response(imageBlobRR).arrayBuffer();
            const imageBytesRR = Array.from(new Uint8Array(imageArrayBufferRR));
           const  base64ImageStringRR = Buffer.from(imageBytesRR).toString('base64');

            
            if (base64ImageStringRR) {*/
                imagesObjectRR[index + 1] = image;
           // }
         
      }
     // console.log("voici"+images)
      const imagesJson = {
        "images":imagesObjectRR
      }
      setimagejson(imagesJson);
      };
    const handleSignUp = async () => {
        console.log('Email:', email);
        console.log('Phone Number:', phoneNumber);
        console.log('Password:', password);
        console.log('Agree to Terms:', isChecked);
        console.log('adresse:', adress);
      console.log('description:', description);
      console.log('type:', type);
      console.log('full name', fullName);
      console.log("file ",file)
      console.log("images "+images);
      console.log('your images '+images)
      processImages();
      console.log("json is here"+JSON.stringify(imagejsonjson));

    const dataaenvoyer=  {
        "description": description,
        "adresse": adress,
        "email": email,
        "heure_fermeture": "2023-12-28 10:55:30.000000",
        "heure_ouverture": "2023-12-28 23:55:30.000000",
        "logo": "organisation1.jpg",
        "node":{
            "latitude": 33.70180,
            "longitude": -7.35100,
            "delta_longitude":9.5,
            "delta_latitude":4.4,
            "nom":"khribga"
        },
        "mot_de_passe": password,
        "nom": fullName,
        "type_organisation":type,
        "numero_telephone": phoneNumber,
        "role_user": "Organisation",
        "images":{
            "0":"imgOrganisation1.jpg",
            "1":"imgOrganisation2.jpg",
            "2":"imgOrganisation.jpg"
        }

    }
    console.log(dataaenvoyer);
    response = await axios.post('http://192.168.43.177:3001/create/postgresql/postion_table', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: dataaenvoyer
          });
          if (response.status==200) {
            console.log('User registered successfully'+response.data);
          } else {
            // Handle errors
            const errorData = await response.text();
            console.error('Registration failed:', errorData);
          }
    
        
    };
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    {/* Create Account */}
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.purple1,
                        }}>
                            Create Account
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Create an account for an Organisation</Text>
                    </View>

                    {/* Full Name */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Full Name</Text>

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
                                placeholder='Enter The full name'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                                value={fullName}
                            onChangeText={(text) => setfullname(text)}
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Email</Text>

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
                                placeholder='Enter The Email'
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

                    {/* Description */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Description</Text>

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
                                placeholder='Enter The Description'
                                placeholderTextColor={COLORS.black}
                                keyboardType='email-address'
                                style={{
                                    width: "100%"
                                }}
                                value={description}
                            onChangeText={(text) => setdescription(text)}
                            />
                        </View>
                    </View>

                    {/* Phone number */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Phone Number</Text>

                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: COLORS.black,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='+212  '
                                placeholderTextColor={COLORS.black}
                                keyboardType='numeric'
                                style={{
                                    width: "12%",
                                    paddingLeft: 0,
                                    borderRightWidth: 1,
                                    borderLeftColor: COLORS.grey,
                                    height: "100%"
                                }}
                            />

                            <TextInput
                                placeholder='Enter the phone number'
                                placeholderTextColor={COLORS.black}
                                keyboardType='numeric'
                                style={{
                                    width: "80%"
                                }}
                                value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            />
                        </View>
                    </View>

                    {/* Address */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Address</Text>

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
                                placeholder='Enter The adress'
                                placeholderTextColor={COLORS.black}
                                keyboardType='Enter The Adress'
                                style={{
                                    width: "100%"
                                }}
                                value={adress}
                            onChangeText={(text) => setadresse(text)}
                            />
                        </View>
                    </View>

                    {/* Type */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                        }}>Type</Text>

                        <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: '#0C4063',
                        borderWidth: 2,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                        }}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(value) => setType(value)}
                            style={{ width: "100%", color: COLORS.black , borderRadius:10 }}
                            itemStyle={{ backgroundColor: "grey", color: COLORS.black , fontFamily:"Ebrima", fontSize:17 }}                    
                        >
                            <Picker.Item label={"Select a type"} value={"" } />
                            <Picker.Item label={"Organisation"} value={"Organisation"} />
                            <Picker.Item label={"Fondation"} value={"Fondation"} />
                        </Picker>
                        </View>
                    </View>

                    {/* Password */}
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
                            paddingLeft: 22
                        }}>
                            <TextInput
                                placeholder='Enter the password'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                                value={password}
                            onChangeText={(text) => setPassword(text)}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Confirm Password</Text>

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
                                placeholder='Confirm the password'
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={isPasswordShown}
                                style={{
                                    width: "100%"
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{
                                    position: "absolute",
                                    right: 12
                                }}
                            >
                                {
                                    isPasswordShown == true ? (
                                        <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                    ) : (
                                        <Ionicons name="eye" size={24} color={COLORS.black} />
                                    )
                                }

                            </TouchableOpacity>
                        </View>
                    </View>

                     {/* Logo  */}
                     <View style={{ marginBottom: 12 }}> 
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}> 
                            Logo: 
                        </Text> 
            
                        {/* Button to choose an image */} 
                        <TouchableOpacity style={styles.button} 
                            onPress={pickImage}> 
                            <Text style={styles.buttonText}> 
                                Choose Logo 
                            </Text> 
                        </TouchableOpacity> 
            
                        {/* Conditionally render the image  
                        or error message */} 
                        {file ? ( 
                            // Display the selected image 
                            <View style={styles.imageContainer}> 
    <Image source={{ uri: file }} style={styles.image} />
                               
                            </View> 
                        ) : ( 
                            // Display an error message if there's  
                            // an error or no image selected 
                            <Text style={styles.errorText}>{error}</Text> 
                        )} 
                    </View> 

                    {/* Images  */}
                    <View > 
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}> 
                            Organisation's images: 
                        </Text> 
            
                        {/* Button to choose an image */} 
                        <TouchableOpacity style={styles.button} onPress={pickMultipleImages}>
                            <Text style={styles.buttonText}>Choose Images</Text>
                        </TouchableOpacity>
            
                        {/* Conditionally render the image  
                        or error message */} 
                        {/* Display the selected images */}
                        {images.length > 0 && (
                            <View style={styles.imageContainerRow}>
                                {images.map((image, index) => (
                                <View style={styles.imageContainer2} key={index}>
                                    <Image source={{ uri: image }} style={styles.image2} />
                                    {/* Icon to remove the image */}
                                    <TouchableOpacity style={styles.deleteIconContainer} onPress={() => removeImage(index)}>
                                        <Ionicons name="close-circle" size={24} color={COLORS.beige} />
                                    </TouchableOpacity>
                                </View>
                                ))}
                            </View>
                        )}
                    </View> 


                     <View style={{
                        flexDirection: 'row',
                        marginVertical: 6
                    }}>
                        <Checkbox
                            style={{ marginRight: 8,marginTop: 8,
                            marginBottom: 8, }}
                            value={isChecked}
                            onValueChange={setIsChecked}
                            color={isChecked ? COLORS.primary : undefined}
                        />

                        <Text style={{
                            marginTop: 8,
                            marginBottom: 8,
                        }}>I aggree to the terms and conditions</Text>
                    </View>

                    <Button
                        title="Sign Up"
                        filled
                        style={{
                            marginTop: 20,
                            marginBottom: 4,
                        }}
                        onPress={handleSignUp}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                        <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: COLORS.grey,
                                marginHorizontal: 10
                            }}
                        />
                    </View>

        
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: 22
                    }}>
                        <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.purple1,
                                fontWeight: "bold",
                                marginLeft: 6
                            }}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>         
        </SafeAreaView>
    )
}


 export default Signup

  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 16, 
    }, 
    header: { 
        fontSize: 20, 
        marginBottom: 16, 
    }, 
    button: { 
        backgroundColor: COLORS.purple1, 
        padding: 10, 
        borderRadius: 8, 
        marginBottom: 16, 
        shadowColor: "#000000", 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.4, 
        shadowRadius: 4, 
        elevation: 5, 
        justifyContent: "center", 
        alignItems: "center", 
        alignSelf: 'center', 
    }, 
    buttonText: { 
        color: "#FFFFFF", 
        fontSize: 16, 
        fontWeight: "bold", 
    }, 
    imageContainerRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: "center", 
        alignItems: "center", 
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 8,
      },
      imageContainer2: {
        marginBottom: 16,
        marginLeft: 15,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative', // Pour que les éléments enfants soient positionnés par rapport à ce conteneur
      },
      image2: {
        width: 130,
        height: 130,
        borderRadius: 8,
      },
      deleteIconContainer: {
        position: 'absolute',
        top: 5, // Ajustez cette valeur selon votre préférence pour la position verticale
        right: 5, // Ajustez cette valeur selon votre préférence pour la position horizontale
    },
    errorText: { 
        color: "red", 
        marginTop: 16, 
    }, 
});