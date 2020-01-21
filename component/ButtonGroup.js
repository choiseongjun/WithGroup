import React from 'react';
import {Text, TouchableHighlight, StyleSheet, View} from 'react-native';


const ButtonItem = ({border, name, selected, setType, type}) =>(
    
    <TouchableHighlight
     underlayColor = '#efefef'
     onPress={setType}
     style={[
         styles.item,  
         selected ? styles.selected : null,
         border ? styles.border : null,
         type === name ? styles.selected : null]}>
    
        <Text style={[styles.itemText, type === name ? styles.bold : null]}>
            {name}
        </Text>
 
  

        
    </TouchableHighlight>
)

const ButtonGroup = ({setType, type}) => (
    
    

  <View style={styles.container}>
      <View style={styles.buttonBox}>
         <ButtonItem type={type} name='팀홈'
              setType={() => setType('팀홈')}
             /> 
       
          <ButtonItem type={type} name='사진첩'
              setType={() => setType('사진첩')}
              />

          <ButtonItem type={type} name='채팅'
              setType={() => setType('채팅')}
              />
      </View>
      <View style={styles.buttonBox}>
          <ButtonItem type={type} name='계획공유'
              setType={() => setType('계획공유')}
              />

          <ButtonItem type={type} name='메모리스트'
              setType={() => setType('메모리스트')}
              />

          <ButtonItem type={type} name='게시판'
              setType={() => setType('게시판')}
              />
      </View>

          
          
  
  </View>
)




const styles = StyleSheet.create({
    item:{
        justifyContent:'center',
        alignItems:'center',
        width: '33%',
        backgroundColor:'lightgray'
    },
    border:{
        borderRightWidth:1,
        borderRightColor:'#dddddd',
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
    },
    container:{
        flexDirection:'column'
    },
    buttonBox:{
        height:70,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'#dddddd',
    }
})

export default ButtonGroup;