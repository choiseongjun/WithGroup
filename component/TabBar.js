import React from 'react';
import {StyleSheet, View} from 'react-native';
import TabBarItem from './TabBarItem';


const TabBar = ({setType, type}) => (
    <View style={styles.container}>

            <TabBarItem type={type} title='모임'
                setType={() => setType('모임')}
                item={'home'}/> 
        
            <TabBarItem type={type} title='지역'
                setType={() => setType('지역')}
                item={'location-pin'}/>

            <TabBarItem type={type} title='내모임'
                setType={() => setType('내모임')}
                item={'man'}/>
            <TabBarItem type={type} title='설정'
                setType={() => setType('설정')}
                it={'setting'}/>
            
    
    </View>
)

const styles = StyleSheet.create({
    container:{
        height:70,
        flexDirection:'row',
        borderTopWidth:1,
        borderTopColor:'#dddddd',
        
      
        
    }
})

export default TabBar;