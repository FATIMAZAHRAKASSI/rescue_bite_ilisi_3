
import React, { useCallback } from 'react';
import {View,Text,StyleSheet,TouchableOpacity, TextInput} from 'react-native';
import { COLORS } from '../constants/colors';

export default function SearchBar() {
    return (
        <View style={style.Main}>
            <TextInput placeholder='Search here' style={style.Input}>

            </TextInput>
            <View style={style.buttonP}>

            </View>
        </View>

    );
}

const style= StyleSheet.create({
    assembler:{
        flexDirection:'row'

    },
    Main:{
        backgroundColor: COLORS.beige,
        width:250,
        height:60,
        borderWidth:1,
        borderColor: COLORS.purle2,
        borderBottomLeftRadius:40,
    },
    Input:{
        marginLeft:10,
        marginTop:5
    },
    buttonP:{
        height:60,
        width:40,
        backgroundColor:COLORS.purple1,
        borderWidth:1,
        borderBottomRightRadius:30,
        borderTopRightRadius:30,
        borderColor:COLORS.purle2,
    }
})


