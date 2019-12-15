import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class CreateScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>CreateScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5F5F5'
    }
})

export default CreateScreen;