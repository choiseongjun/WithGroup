// 네비게이션으로 이동하게 했지만 modal이 더 맞는 것 같다. 추후에 상의 후에 결정
import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity,BackHandler} from 'react-native';
import DatePicker from 'react-native-datepicker'

const{width, height} = Dimensions.get('window');

class CreatePlan extends Component{
    state={
        planToDo:'',
        planSpecificToDo:'',
        startDate:'',
        endDate:'',
        planData:[
            {Mplan:'', Splan:'', start:'', end:''}
        ]
    }

    //     // 이벤트 등록
    // componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // }

    // // 이벤트 해제
    // componentWillUnmount() {
    //     this.exitApp = false;
    //     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    // }

    // // 이벤트 동작
    // handleBackButton = () => {
    //     // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    //     if (this.exitApp == undefined || !this.exitApp) {
    //         this.exitApp = true;

    //         this.timeout = setTimeout(
    //             () => {
    //                 this.exitApp = false;
    //             },
    //             2000    // 2초
    //         );
    //     } else {
    //         clearTimeout(this.timeout);

    //         BackHandler.exitApp();  // 앱 종료
    //     }
    //     return true;
    // }

    //     // ... 이하 생략
    

    
    _controlPlan = (text) =>{
        this.setState({planToDo:text})
        console.log(this.state.planToDo)
    }
    _controlSpecificPlan = (text) => {
        this.setState({planSpecificToDo:text})
    }
    _getPlanData = () => {
        this.state.planData.Mplan = this.state.planToDo;
        this.state.planData.Splan = this.state.planSpecificToDo;
        console.log('planData', this.state.planData)
    }

    

    render(){
 
        return(
            <View style={styles.container}>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                     <Text style={{fontSize:20}}>계획: </Text>
                     <TextInput 
                         style={styles.input}
                         placeholder = {"Plan here"}
                         value={this.state.planToDo}
                         onChangeText={this._controlPlan}
                         placeholderTextColor={"#999"}
                         returnKeyType={"done"}
                         autoCorrect={false}
                     
                     />
                 </View>
                 <TextInput 
                     style={styles.inputText}
                     multiline={true}
                     autoCorrect={false}
                     value={this.state.planSpecificToDo}
                     onChangeText={this._controlSpecificPlan}
                     placeholder={"Specific Plan"}
                 />
                 <View style={{flexDirection:'row', alignItems:'center',paddingTop:10}}>
                     <Text>시작일: </Text>
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
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({startDate: date})}}
                     />
                     <Text style={{marginLeft:5}}>종료일: </Text>
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
                             marginLeft: 36
                         }
                         // ... You can check the source to find the other keys.
                         }}
                         onDateChange={(date) => {this.setState({endDate: date})}}
                     />     
                 </View>   
                
                 <TouchableOpacity
                   style={{justifyContent:'center'}}
                   onPress={this._getPlanData}
                    >
                    <View style={styles.square}><Text style={{fontSize:30,color:'white'}}>+</Text></View>
                 </TouchableOpacity>
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    input:{
        margin:10,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 15,
        width:"80%"
    },
    inputText:{
        //marginLeft:10,
        width:width-20,
        height:"50%",
        borderWidth:1,
        borderColor:'#bbb'
    },
    square:{
        width:width-20,
        height:40,
        borderRadius:3,
        backgroundColor:'darkgray',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
})

export default CreatePlan;