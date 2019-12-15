import React, {Component} from 'react';
import {View, Text, StyleSheet,FlatList} from 'react-native';
import TabBar from './TabBar';
import axios from 'axios';

class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state ={
            type:'',
            moims:[]
        }
        this.setType = this.setType.bind(this)
    }

    componentDidMount(){
  
    
        axios.get(`http://52.79.57.173/rest/moimlistView`)
        .then(res => {
          const moims = res.data.moimList.content;
          this.setState({ moims });
        })
    }
    setType(type){
        this.setState({type})
      }
    render(){
        const {moims} = this.state;
   
    console.log(moims);
        const{type} = this.state;
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                <FlatList
                    data={moims}
                renderItem={({item}) => <Text>타이틀:{item.title}:소개{item.intro}작성자:{item.people.name}</Text>
                                            }
                    />    
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