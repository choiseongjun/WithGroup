// 네비게이션으로 이동하게 했지만 modal이 더 맞는 것 같다. 추후에 상의 후에 결정
import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity,Modal,AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

const{width, height} = Dimensions.get('window');



class CreatePlanModal extends Component{
    
constructor(props){
    super(props);
    this.refreshPlanList = props.refreshPlanList;
}


    state={
        planToDo:'',
        planSpecificToDo:'',
        startDate:'',
        endDate:'',
        isvisible:this.props.isvisible,
        addSplan:[],
        chageRefresh:false
        
    }

    
    
    _controlPlan = (text) =>{
        this.setState({planToDo:text})
        console.log(this.state.planToDo)
    }
    _controlSpecificPlan = (text) => {
        this.setState({planSpecificToDo:text})

    }
    _getPlanData = () => {
        console.log('주계획:',this.state.planToDo, '세부계획:',  this.state.addSplan.join())
        console.log('시작일:', this.state.startDate, '마감일:', this.state.endDate)
        // var date = new Date().getDate(); //Current Date
        // var month = new Date().getMonth() + 1; //Current Month
        // var year = new Date().getFullYear(); //Current Year
       
        const no = this.props.MoimId
        console.log('moimid',no)
        let token;

        let toDoWrite={};
        toDoWrite.plan_title=this.state.planToDo;
        toDoWrite.from_date= this.state.startDate
        toDoWrite.to_date= this.state.endDate
        let toDoWriteList={};
        toDoWriteList.toDoWrite=toDoWrite;
        toDoWriteList.plan_list=this.state.addSplan.join();
        
        AsyncStorage.getItem("access_token").then((value) => {
            token = value
            console.log("token in CreatePlanModal: ", token);
            axios.post(`http://52.79.57.173/moimDetail/moimTodoList/moimTodowrite/${no}`, toDoWriteList,{
                headers:{
                    type:'POST',
                    dataType:'json',
                    "Authorization" : token
                    }
                }) 
            .then(res => {
                console.log("res in")
                console.log("res.data : ", res.data)
                
                console.log('todoWriteList', toDoWriteList);
                this.refreshPlanList()
            })
        });
        
        this.setState({chageRefresh:true})
        this.props.changeRefresh(this.state.chageRefresh)

        console.log('this.state.changeRefresh', this.state.chageRefresh)
    }
    _clickAdd = () => {
        const add = this.state.planSpecificToDo;
        // console.log('add',add)
        this.setState({addSplan: [...this.state.addSplan,add]})
        console.log('this.state.addSplan', this.state.addSplan)
        this.setState({planSpecificToDo: ''})
    }
    _closeModal = () => {
        this.setState({isvisible: false})

    }

    

    render(){
        console.log('befor changeRefresh', this.state.chageRefresh);
        return(
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.state.isvisible}
                onRequestClose= {() => {console.log("Modal has been closed.")}}>

                <View style={styles.container}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {/* <Text style={{fontSize:20,color:'white'}}>계획: </Text> */}
                        <TextInput 
                            style={styles.input}
                            placeholder = {"계획"}
                            value={this.state.planToDo}
                            onChangeText={this._controlPlan}
                            placeholderTextColor={"#999"}
                            returnKeyType={"done"}
                            autoCorrect={false}
                        
                        />
                    </View>
                    <View style={styles.specificContainer}>
                        <TextInput 
                            style={styles.inputText}
                            multiline={true}
                            autoCorrect={false}
                            value={this.state.planSpecificToDo}
                            onChangeText={this._controlSpecificPlan}
                            placeholder={"세부계획"}
                            placeholderTextColor={"#999"}

                        />
                        <TouchableOpacity
                            onPress={() => this._clickAdd()}>
                            <View style={styles.squre2}>
                                <Text style={{color:'#FFF8DC',fontSize:15}}>추가</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf:'flex-start', margin:10}}>
                        {this.state.addSplan.map((v,i) => 
                            // 나중에 꼭 key값 다시 설정해주기
                            <Text style={{color:'white', fontSize:15}} key={i+v}>{i+1}. {v}</Text>
                        )}
                    </View>
                    
                   
                    <View style={{flexDirection:'row', alignItems:'center',paddingTop:10}}>
                        <Text style={{color:'white'}}>시작일: </Text>
                        <DatePicker 
                            style={{width: 130}}
                            date={this.state.startDate}
                            mode="date"
                            //placeholder="select date"
                            format="YYYY-MM-DD"
                            //minDate="2016-05-01"
                            //maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor:'white'
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({startDate: date})}}
                        />
                        <Text style={{marginLeft:5,color:'white'}}>종료일: </Text>
                        <DatePicker 
                            style={{width: 130}}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            //minDate="2016-05-01"
                            //maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36,
                                backgroundColor:'white'
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({endDate: date})}}
                        />     
                    </View>   
                    
                    <TouchableOpacity
                    style={{justifyContent:'center'}}
                    onPress={this._getPlanData}
                    //onPressOut={() => this.setState({isvisible:false})}
                        >
                        <View style={styles.square}><Text style={{fontSize:30,color:'white'}}>제출</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{justifyContent:'center'}}
                    onPress={this._closeModal}
                    onPressOut={this.props.vData(this.state.isvisible)}
                        >
                        <View style={styles.exit}><Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>X 닫기</Text></View>
                    </TouchableOpacity>
                </View>

            </Modal>
        
           
        );
    }
}

const styles = StyleSheet.create({
    container:{
        //flex:1,
        alignItems:'center',
        height:"100%",
        backgroundColor : "rgba(0,0,0,0.7)"

    },
    input:{
        margin:10,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 20,
        width:"80%",
        color:'white'
    },
    inputText:{
        //marginLeft:10,
        width:width-100,
        borderWidth:1,
        borderColor:'#bbb',
        fontSize:15,
        color:'white'
        
    },
    square:{
        width:width-30,
        height:40,
        borderRadius:3,
        backgroundColor:'darkgray',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    exit:{
        paddingTop:20,
        borderBottomWidth:0.2,
        borderColor:'white',
        
    },
    squre2:{
        width:50,
        height:50,
        backgroundColor:'#B0C4DE',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
        
    },
    specificContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})

export default CreatePlanModal;