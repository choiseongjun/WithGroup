
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal,  FlatList, Image, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import PureChart from 'react-native-pure-chart';
import {Button, ButtonGroup} from 'react-native-elements';



const {width, height} = Dimensions.get('window');

class MoimDetail extends Component{
    constructor(props){
        super(props)
        this.state ={
            moimDetail:[],
            moimPeople:[],
            DataId:this.props.navigation.state.params.id,
            isVisible: false,
            isClicked:false,
            selectedIndex:1, // 0,1,2 -> component 1,2,3
            moimLeader:[]
        }
        this.updateIndex = this.updateIndex.bind(this)
    
    }

updateIndex (selectedIndex){
    this.setState({selectedIndex})
}

componentDidMount(){
    const Data = this.state.DataId;   
    axios.get(`http://52.79.57.173/rest/moimlistView/moimdetailView/${Data}`)
    .then(res => {
     
      const moimDetail = res.data.moimDetail;
      const moimPeople = res.data.moimDetail.peopleList;
      const moimLeader = res.data.moimDetail.people;
      this.setState({ moimDetail,moimPeople,moimLeader });
      console.log(res.data)
    }) 


}
// _PartiesPeople(){ //함수를 써야 map을 return 페이지에 돌릴수 있다.
//     const {isClicked, moimDetail} = this.state;
//     return isClicked ? <Text style={styles.peopleList}>{moimDetail.peopleList.map(x=>x.name)}</Text> : null
//     }
 


    render(){
        const component1 = () => <Text>계획공유</Text>
        const component2 = () => <Text>사진첩 보기</Text>
        const component3 = () => <Text>세팅</Text>
        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        let sampleDate = [
            {
                value: 50,
                label: 'Marketing',
                color: 'powderblue'
            },
            {
                value:40,
                label: 'Sales',
                color: 'tomato'
            },
            {
                value:25,
                label:'Support',
                color: 'orange'
            }
        ]
        
        
        console.log(this.props.navigation.state.params.id)
        const {moimDetail, moimPeople, selectedIndex,moimLeader} = this.state;
        console.log("moimDetail",moimDetail)
        console.log('이미지', moimDetail.imageName)
        console.log('조장', moimLeader)
        return(
            <View style={styles.container}>
             <ScrollView>
                 {/* <Text>{this.props.navigation.state.params.id}</Text> */}
                 {/* <Text>제목:{moimDetail.title}</Text>
                 <Text>소개:{moimDetail.intro}</Text>
                 <Text>인원수:{moimDetail.peopleLimit}</Text> */}
                 <Image 
                    source={moimDetail.imageName === null ? require('../image/ddd.jpg')  : {uri:'http://52.79.57.173/getMoimImage/'+moimDetail.imageName+'.'+moimDetail.imageExtension}} 
                    style={{width: width-5, height: 400}} 
                />  
                <View style={styles.intro}>
                    <Text>소개:{moimDetail.intro}</Text>
                    <View style={styles.joinButton}>
                        <Button
                            title="팀 가입하기"
                            type="outline"
                            />
                    </View>
                </View>
                <ButtonGroup 
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height:50}}
                /> 

                     <Modal
                        animationType={'slide'}
                        transparent={false}
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
                        <View style={{marginTop:5}}>
                            <View style={{flexDirection:'column',alignItems:'center'}}>
                               <Text>조장: {moimLeader.name}</Text>
                               <Text>Email: {moimLeader.email}</Text>
                            </View>
                            <View style={{width:"100%"}}>
                                <Button   
                                        title="모든 모임원 보기"   
                                        onPress = {() => {this.setState({isClicked:true, isVisible: true})}}
                                        />      
                            </View>                                           
                        </View>

                        <View style={{justifyContent:'center', alignItems:'center', margin:3}}>
                          <PureChart data={sampleDate} type = 'pie'/>
                        </View>
                        
                 
                
              
             </ScrollView>
                
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
        height: '80%' ,  
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
    },
    intro:{
        alignItems:'center',
        justifyContent:'space-between',
        width:width-10,
        height:150,
        borderWidth:3,
        borderColor:'gray',
        marginTop:3,
        flexDirection:'column',
    },
    joinButton:{

    }
   
})

export default MoimDetail;


