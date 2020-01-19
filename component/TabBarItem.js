import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

const TabBarItem = ({border, title, selected, setType, type, item, it}) =>(
    
    <TouchableHighlight
     underlayColor = '#efefef'
     onPress={setType}
     style={[
         styles.item,  
         selected ? styles.selected : null,
         border ? styles.border : null,
         type === title ? styles.selected : null]}>
    
        <Text style={[styles.itemText, type === title ? styles.bold : null]}>
            <Entypo name={item} size={17}/>   
            <AntDesign name={it} size={17}/> 
            {title}
        </Text>

  

        
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    item:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    border:{
        borderLeftWidth:1,
        borderLeftColor:'#dddddd',
    },
    itemText:{
        color:'#777777',
        fontSize:17
    },
    selected:{
        backgroundColor:'#ffffff'
    },
    bold: {
        fontWeight:'bold'
    }
})

export default TabBarItem;