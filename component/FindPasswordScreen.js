import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class FindPasswordScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>FindPasswordScreen</Text>
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

export default FindPasswordScreen;