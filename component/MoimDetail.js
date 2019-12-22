import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class FindPasswordScreen extends Component{
    render(){
        console.log('모임디테일정보');
        console.log(this.props)

        return(
            <View style={styles.container}>
                <Text>MoimDetail</Text>
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