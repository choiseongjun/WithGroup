
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

class MoimDetail extends Component{
    constructor(props){
        super(props)
        this.state ={
            moimDetail:[],
            DataId:this.props.navigation.state.params.id
         
          
        }

    
    }

componentDidMount(){
    const Data = this.state.DataId;   
    axios.get(`http://52.79.57.173/rest/moimlistView/moimdetailView/${Data}`)
    .then(res => {
      console.log('가져온 데이터',res.data)
      //const {moimDetail} = res.data;
      //console.log('가져온 데이터',moimDetail);
      //this.setState({ moimDetail });
    })
    console.log('데이터',Data)
    
}
    render(){
        //console.log('모임디테일정보');
       // console.log(moimDetail)
        console.log(this.props.navigation.state.params.id)
      
        return(
            <View style={styles.container}>
                 <Text>{this.props.navigation.state.params.id}</Text>
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

export default MoimDetail;
