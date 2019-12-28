import React, {Component} from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';
import TabBar from './TabBar';
import Data1 from './Data1';
class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
          type:'지역'
        }
        this.setType = this.setType.bind(this)
        this.getScreen = this.getScreen.bind(this)
    }

    setType(type){
        this.setState({type})
      }
    getScreen(){
        if(this.state.type === '모임'){
           return  <Data1 >
               {this.props}</Data1>
        }
        console.log('type:', this.state.type)
        console.log('MainScreen')
        console.log(this.props)
    }
    render(){

        const{type} = this.state;
         return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                    {this.getScreen()}
                
                </View>
                {/* <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('CREATESTUDY')}
                    style={styles.createButton}>
                    <View style={styles.create}>
                        <Text style={styles.createText}>개설+</Text>
                    </View>  
                </TouchableOpacity> */}
                <TabBar type={type} setType={this.setType}/>

                
                                         
           </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5F5',
      
    },

})

export default MainScreen;