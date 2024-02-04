import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

const Button = (props) => {
  const filledBgColor = props.color || '#81657C';
  const outlinedColor = '#81657C';
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = props.filled ? 'white' : 'white';


  return (
    <TouchableOpacity
      style={{
       // width:200,
        ...styles.button,
        ...{backgroundColor: bgColor}, // Ajout de la couleur de fond dynamique
        ...{borderColor: filledBgColor}, // Ajout de la couleur de bordure dynamique
        
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 18, color: textColor }}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    marginBottom: 20,
    //marginLeft: 60,
  },
});

export default Button;