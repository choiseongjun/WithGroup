import React, {Component} from 'react';
import {View, Text, StyleSheet,Button,FlatList,Image,TouchableOpacity} from 'react-native';
import axios from 'axios';
import defaultimg from '../image/ddd.jpg';

class Data1 extends Component{
    constructor(props){
        super(props)
        this.state ={
            moims:[]
          
        }
    }

    componentDidMount(){
  
        axios.get(`http://52.79.57.173/rest/moimlistView`)
        .then(res => {
          const moims = res.data.moimList.content;
          this.setState({ moims });
        })

        
     
        
    }

     
 
    render(){
        console.log('Data1 View');
        console.log(this.props);

        const {moims} = this.state;
        const logo = require('../image/ddd.jpg');

    
       
        return(
            <View>
                
                
   
                <FlatList
                    data={moims}
                    renderItem={({item}) =>  
                    <TouchableOpacity data={moims}
                    onPress={() => this.props.children.navigation.navigate('MoimDetail')}>
                    <Text>
                           <Image 
                            source={item.imageName === null ? require('../image/ddd.jpg')  : {uri:'http://52.79.57.173/getMoimImage/'+item.imageName+'.'+item.imageExtension}} 
                            style={{width: 100, height: 100}} 
                            /> 
                       타이틀:{item.title}소개:{item.intro}작성자:{item.people.name}
                   
                    </Text></TouchableOpacity> }/>     
                    
           </View>
        );
    }
}




export default Data1;