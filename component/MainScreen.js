import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TabBar from './TabBar';
class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            type:''
        }
        this.setType = this.setType.bind(this)
    }
    setType(type){
        this.setState({type})
      }
    render(){
        const{type} = this.state;
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                  <Text>main</Text>
                </View>
                <TabBar type={type} setType={this.setType} />                             
           </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
      
    },

})

export default MainScreen;