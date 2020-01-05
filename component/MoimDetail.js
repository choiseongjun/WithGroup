
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
     
      const moimDetail = res.data.moimDetail;
      this.setState({ moimDetail });
      console.log(res.data)
      //const {moimDetail} = res.data;
      //console.log('가져온 데이터',moimDetail);
      //this.setState({ moimDetail });
    })

    
}
    render(){
        //console.log('모임디테일정보');
       // console.log(moimDetail)
        console.log(this.props.navigation.state.params.id)
        const {moimDetail} = this.state;
        console.log("moimDetail"+moimDetail)
        return(
            <View style={styles.container}>
                 <Text>{this.props.navigation.state.params.id}</Text>
                 <Text>제목:{moimDetail.title}</Text>
                 <Text>소개:{moimDetail.intro}</Text>
                 <Text>인원수:{moimDetail.peopleLimit}</Text>
                
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
