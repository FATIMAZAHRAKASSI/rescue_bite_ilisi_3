import { View,ScrollView, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet , Alert} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {COLORS} from '../../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import * as ImagePicker from "expo-image-picker"; 
import { Picker } from '@react-native-picker/picker';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
const creerSignalCommerce = ({ navigation }) => {
    
    const [type, setType] = useState('');
    const [unit, setUnit] = useState('');
    const [descritpion, setDescrition] = useState('');
    const [quantite, setquantite] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [base64Image, setBase64Image] = useState(null);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    // Stores the selected image URI 
    const [file, setFile] = useState(null); 
    // Stores any error message 
    const [error, setError] = useState(null); 
  
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
                setFile(result.assets[0].uri.substring(result.assets[0].uri));
                /*try {
                    const response = await fetch(result.assets[0].uri);
                    const imageBlob = await response.blob();
                    const imageArrayBuffer = await new Response(imageBlob).arrayBuffer();
                    const imageBytes = Array.from(new Uint8Array(imageArrayBuffer));
                  //  console.log("Image Bytes:", imageBytes);

                    // Convert the image bytes to base64
                   const  base64ImageString = Buffer.from(imageBytes).toString('base64');
                    setBase64Image(base64ImageString)
                    // Now you can use base64Image to display the image
                   // console.log("Base64 Image:", base64Image);
                } catch (error) {
                    console.error('Error getting image bytes:', error);
                }*/
                // Clear any previous errors 
                setError(null); 
            } 
        } 
    }; 
    const handlecreateSignal = async () => {
        console.log('type:', type);
        console.log('description:', descritpion);
        console.log('quantite :', quantite);
        console.log('unite:', unit);
        console.log('expiration date:', selectedDate);
        console.log('image:', base64Image);
        const storedUserId = await AsyncStorage.getItem('idcommerce');
        const integer1 = parseInt(storedUserId); // The second parameter (radix) is important, 10 indicates base 10 (decimal)
console.log("inetger"+integer1)
const dataaenvoyer=
    {
        "id_commerce": integer1,
        "type_nouriture": type,
        "quantité": quantite,
        "image": "milk.jpg",
        "description": descritpion,
        "date_expiration": selectedDate,
        "unit":unit
      }

      const response = await axios.post('http://192.168.43.177:3003/create/SQLsignal', dataaenvoyer, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status==200) {
            console.log('signal created successfully'+JSON.stringify(response.data));
          } else {
            // Handle errors
            const errorData = await response.text();
            console.error('creation failed:', errorData);
          }





    };
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    
                    {/* Create Signal */}
                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            marginVertical: 12,
                            color: COLORS.purple1,
                        }}>
                            Create a Signal
                        </Text>

                        <Text style={{
                            fontSize: 16,
                            color: COLORS.black
                        }}>Help Someone by Creating a Signal</Text>
                    </View>

                    {/* Type */}
                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                        }}>Food Type</Text>

                        <View style={{
                        width: "100%",
                        height: 48,
                        borderWidth: 1,
                        borderRadius: 8,
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
                            <Picker.Item label={"Select food type"} value={"" } />
                            <Picker.Item label={"Sandwich"} value={"Sandwich"} />
                            <Picker.Item label={"Bread"} value={"Bread"} />
                            <Picker.Item label={"Fruits"} value={"Fruits"} />
                            <Picker.Item label={"Vegetables"} value={"Vegetables"} />
                            <Picker.Item label={"Meat"} value={"Meat"} />
                            <Picker.Item label={"Dairy"} value={"Dairy"} />
                            <Picker.Item label={"Desserts"} value={"Desserts"} />
                            <Picker.Item label={"Beverages"} value={"Beverages"} />
                            <Picker.Item label={"Snacks"} value={"Snacks"} />
                
                        </Picker>
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
                                value={descritpion}
                            onChangeText={(text) => setDescrition(text)}
                            />
                        </View>
                    </View>

                    {/* Quantity */}
                    <View style={{ marginBottom: 12 }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 400,
                                marginVertical: 8
                            }}>Quantity</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {/* Champ de saisie pour la quantité */}
                                <TextInput
                                    placeholder='Enter quantity'
                                    placeholderTextColor={COLORS.black}
                                    keyboardType='numeric'
                                    style={{
                                        width: "50%",
                                        marginRight: 8,
                                        height: 48,
                                        borderColor: COLORS.black,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        paddingLeft: 22
                                    }}
                                    value={quantite}
                            onChangeText={(text) => setquantite(text)}
                                />

                                {/* Liste déroulante pour l'unité de mesure */}
                                <View style={{
                                    width: "50%",
                                    height: 48,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    }}>
                                <Picker
                                    selectedValue={unit}
                                    onValueChange={(value) => setUnit(value)}
                                    style={{ width: "100%", color: COLORS.black , borderRadius:10 }}
                                    itemStyle={{ backgroundColor: "grey", color: COLORS.black , fontFamily:"Ebrima", fontSize:17 }}                    
                                >
                                    <Picker.Item label={"Select unit"} value={"" } />
                                    <Picker.Item label={"kg"} value={"kg"} />
                                    <Picker.Item label={"g"} value={"g"} />
                                    <Picker.Item label={"liter"} value={"liter"} />
                                    <Picker.Item label={"ml"} value={"ml"} />
                                    <Picker.Item label={"unite"} value={"unite"} />
                                    {/* Ajoutez d'autres unités au besoin */}
                                </Picker>
                                </View>
                            </View>
                        </View>

                    {/* Expiration Date */}

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}>Expiration Date</Text>

                        {/* Bouton pour ouvrir le calendrier */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={{
                                width: "60%",
                                height: 48,
                                borderColor: COLORS.black,
                                borderWidth: 1,
                                borderRadius: 8,
                                alignItems: "center",
                                justifyContent: "center",
                                alignSelf: 'center', 

                            }}
                        >
                            <Text>{selectedDate ? selectedDate.toLocaleDateString() : 'Select expiration date'}</Text>
                        </TouchableOpacity>

                        {/* Calendrier (affiché lorsque le state showDatePicker est true) */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode='date'
                                display='spinner'
                                onChange={handleDateChange}
                            />
                        )}
                    </View>



                     {/* Image  */}
                     <View style={{ marginBottom: 12 }}> 
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 400,
                            marginVertical: 8
                        }}> 
                            Image: 
                        </Text> 
            
                        {/* Button to choose an image */} 
                        <TouchableOpacity style={styles.button} 
                            onPress={pickImage}> 
                            <Text style={styles.buttonText}> 
                                Add Image 
                            </Text> 
                        </TouchableOpacity> 
            
                        {/* Conditionally render the image  
                        or error message */} 
                        {file ? ( 
                            // Display the selected image 
                            <View style={styles.imageContainer}> 
                                <Image source={{ uri: file }} 
                                    style={styles.image} /> 
                            </View> 
                        ) : ( 
                            // Display an error message if there's  
                            // an error or no image selected 
                            <Text style={styles.errorText}>{error}</Text> 
                        )} 
                    </View> 



                    


                    

                    <Button
                        title="Add Signal"
                        filled
                        style={{
                            marginTop: 20,
                            marginBottom: 4,
                        }}
                        onPress={handlecreateSignal}

                    />

                </View>
            </ScrollView>         
        </SafeAreaView>
    )
}


 export default creerSignalCommerce

  
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