
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal, Button, FlatList} from 'react-native';
import axios from 'axios';


class MoimDetail extends Component{
    constructor(props){
        super(props)
        this.state ={
            moimDetail:[],
            moimPeople:[],
            DataId:this.props.navigation.state.params.id,
            isVisible: false,
            isClicked:false,

        }

    
    }

componentDidMount(){
    const Data = this.state.DataId;   
    axios.get(`http://52.79.57.173/rest/moimlistView/moimdetailView/${Data}`)
    .then(res => {
     
      const moimDetail = res.data.moimDetail;
      const moimPeople = res.data.moimDetail.peopleList;
      this.setState({ moimDetail,moimPeople });
      console.log(res.data)
    }) 


}
// _PartiesPeople(){ //함수를 써야 map을 return 페이지에 돌릴수 있다.
//     const {isClicked, moimDetail} = this.state;
//     return isClicked ? <Text style={styles.peopleList}>{moimDetail.peopleList.map(x=>x.name)}</Text> : null
//     }



    render(){

        console.log(this.props.navigation.state.params.id)
        const {moimDetail, moimPeople} = this.state;
        console.log("moimDetail"+moimDetail)
      
        return(
            <View style={styles.container}>
             
                 {/* <Text>{this.props.navigation.state.params.id}</Text> */}
                 <Text>제목:{moimDetail.title}</Text>
                 <Text>소개:{moimDetail.intro}</Text>
                 <Text>인원수:{moimDetail.peopleLimit}</Text>
               
                     <Modal
               
                        animationType={'fade'}
                        transparent={true}
                        visible={this.state.isVisible}
                         onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
                                <View style={styles.modal}>
                                    {/* {this._PartiesPeople()} */}
                                    <FlatList 
                                        data={moimPeople}
                                        renderItem={({item}) => 
                                            <View style={styles.friends}>
                                                <TouchableOpacity>
                                                    <Text style={styles.nameText}>✔  {item.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                        keyExtractor={item => item.id}/>
                                    <Button title='   닫기   '
                                            onPress = {() => {  
                                                this.setState({ isVisible:!this.state.isVisible})}}
                                            color={'gray'}
                                            />
                                
                                </View>    
                     </Modal>
                         <Button   
                                title="모임원 보기"   
                                onPress = {() => {this.setState({isClicked:true, isVisible: true})}}/>  
              
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
    },
    moimButton:{
        width:100,
        height:25,
        borderWidth:1,
        borderColor:'gray',
        justifyContent:'center',
        alignItems:'center'

    },
    peopleList:{
        color:'white',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        fontSize:30
      
    },
    modal:{
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor : "rgba(0,0,0,0.2)",   
        height: 300 ,  
        width: '80%',  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: '#fff',    
        marginTop: 80,  
        marginLeft: 40,  
        flexDirection:'column',
        
       
    },
    friends:{
        padding:5
    },
    nameText:{
        fontSize:20
    }
   
})

export default MoimDetail;


