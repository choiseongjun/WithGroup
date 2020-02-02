
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal,  FlatList, Image, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import PureChart from 'react-native-pure-chart';
import {Button} from 'react-native-elements';
import ButtonGroup from './ButtonGroup';
import SharePlan from './SharePlan';
import {AsyncStorage} from 'react-native';


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
            moimLeader:[],
            type:'팀홈',
            buttonClicked:true,
            // PeopleNo: 1
            // moimPeopleNo: "1586"
            PeopleNo:"",
            moimPeopleNo:"",
            moimNo:"",
            accessToken:"",
            isTeamJoin:false,
        }
        this.setType = this.setType.bind(this)
        this._controlScreen = this._controlScreen.bind(this)
    }
    
    setType(type){
        this.setState({type})

        if(type !== '팀홈'){
            this.setState({buttonClicked:false})
        }else if(type ==='팀홈'){
            this.setState({buttonClicked:true})
        }
        }
     _controlScreen(){
        if(this.state.type === '계획공유'){
            return <SharePlan datas={this.state.moimPeople}/>
        }
    } 
   
    teamJoin = (moimNo, tokenParam) => {
    
        //버튼 : 팀 가입하기 -> 팀 탈퇴하기 전환
        //moimPeopleNo == null
        console.log("teamJoin () ")
        console.log("moimNo : ", moimNo)
        // let token;
        let token = this.state.accessToken;
        console.log("in teamjoin token : ", token)
        console.log("tokenParan : ", tokenParam)
        

        axios.post(`http://52.79.57.173:8080/rest/moimParticipant/${moimNo}/${this.state.PeopleNo}`)
            // { headers: {"Authorization" : tokenParam }  } )
            .then(res => {
                console.log("res in")
                console.log("res.data : ", res.data)
                
                if(res.data.code == "1"){
                    this.setState({isTeamJoin:true})
                    this.setState({moimPeopleNo: res.data.moimPeopleNo})
                }
            })
    } 
    
    teamOut = (moimPeopleNo) => {
        console.log("teamOut()")
        console.log("moimPeopleNo : ", this.state.moimPeopleNo)
        axios.delete(`http://52.79.57.173:8080/rest/moimParticipant/deletejoinedPeople/${this.state.moimPeopleNo}`)
        .then(res => {
            if(res.data.code == "1"){
                this.setState({isTeamJoin:false})

            }
        })
    }

    componentWillMount(){
        console.log("componentDidMount() in MoimDetail ")
        const Data = this.state.DataId;   
        // axios.get(`http://52.79.57.173/rest/moimlistView/moimdetailView/${Data}`)

        let token;
        AsyncStorage.getItem("access_token").then((value) => {
            token = value
            console.log("token in MoimDetail: ", token);
        
            this.setState({accessToken : value})
            axios.get(`http://52.79.57.173:8080/rest/moimlistView/moimdetailView/${Data}`, 
            { headers: {"Authorization" : token }  } )
            .then(res => {  
                console.log("res in Moimdetail : ", res)
                const moimPeopleNo = res.data.moimPeopleNo;
                console.log("moimPeopleNo : ", moimPeopleNo)

                //==================//

                // axios.get(`http://192.168.0.193:8080`)
                // .then(res => {

                // })
                // http://192.168.0.193:8080/rest/moimParticipant/1848
                
                //==================//

                if(moimPeopleNo != null){
                    console.log(" if moimPeopleNo != null 구문 ")
                    this.setState({isTeamJoin:true})
                }

                const PeopleNo = res.data.PeopleNo;

                const moimNo = res.data.moimDetail.id;

                const moimDetail = res.data.moimDetail;
                const moimPeople = res.data.moimDetail.peopleList;
                const moimLeader = res.data.moimDetail.people;
                // this.setState({ moimDetail,moimPeople,moimLeader });
                this.setState({moimPeopleNo: moimPeopleNo});  
                this.setState({PeopleNo: PeopleNo});  
                this.setState({ moimDetail: moimDetail });  
                this.setState({ moimPeople: moimPeople });  
                this.setState({ moimLeader: moimLeader }); 
                this.setState({ moimNo: moimNo }); 
                // console.log("this.state.moimDetail : ", this.state.moimDetail) 
                // console.log("this.state.moimPeople : ", this.state.moimPeople) 
                // console.log("this.state.moimLeader : ", this.state.moimLeader) 
            })
            
        }).done();
 
    }
// _PartiesPeople(){ //함수를 써야 map을 return 페이지에 돌릴수 있다.
//     const {isClicked, moimDetail} = this.state;
//     return isClicked ? <Text style={styles.peopleList}>{moimDetail.peopleList.map(x=>x.name)}</Text> : null
//     }
 


    render(){
      
        let sampleData = [
            {
                value: 33,
                label: 'Marketing',
                color: 'powderblue'
            },
            {
                value:33,
                label: 'Sales',
                color: 'tomato'
            },
            {
                value:34,
                label:'Support',
                color: 'orange'
            }
        ]
        const {moimDetail, moimPeople, type,moimLeader,buttonClicked} = this.state;
   
        return(
            <View style={styles.container}>
                <View style={{flex:1}}>
                {buttonClicked ? 
                (
                    <ScrollView>

                    <Image 
                       source={moimDetail.imageName === null ? require('../image/ddd.jpg')  : {uri:'http://52.79.57.173/getMoimImage/'+moimDetail.imageName+'.'+moimDetail.imageExtension}} 
                       style={{width: width-5, height: 400}} 
                   />  
                   <View style={styles.intro}>
                       <Text>소개:{moimDetail.intro}</Text>
                       <View style={styles.joinButton}>
                           { this.state.isTeamJoin == false ? 
                            <Button title= "팀 가입하기"
                            onPress = { () => this.teamJoin(this.state.moimNo, this.state.accessToken) }
                            />
                            :
                            <Button title= "팀 탈퇴하기"
                            onPress = { () => this.teamOut(this.state.moimPeopleNo) }
                            />
                             
                           }
                           {/* <Button
                               title= { this.state.moimPeopleNo == null ?  "팀 가입하기" : "팀 탈퇴하기" }
                               type="outline"
                               onPress = { this.teamJoinHandler(this.state.moimPeopleNo, this.state.moimNo) }
                               /> */}
                       </View>
                   </View>
   
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
   
                           <View style={{justifyContent:'center', alignItems:'center', margin:3, flexDirection:'column'}}>
                             <Text>진행상황</Text>
                             <PureChart data={sampleData} type = 'pie'/>
                           </View>
                           
                    
                   
                 
                </ScrollView>
                )
                : 
                (
                this._controlScreen()
                )
                }
                </View>
              
               
                
                 <ButtonGroup  type={type} setType={this.setType}/>
                
            
             

                
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
   
   
})

export default MoimDetail;


