import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Button} from 'react-native';
import Axios from 'axios';
// import DatePick from './DatePick';
import DatePicker from 'react-native-datepicker'
import SeeButtonModal from './SeeButtonModal';

class PlanList extends Component {

    state={
        planData:[
            {id:1, plan:"2020년 계획세우기", checkClicked:false},
            
        ],
        todoListId:this.props.todoList,
        clicked:false,
        todoList:[],
        seeClicked:false,
        formDate:'',
        todoDateStart: '',
        todoDateEnd:'',
        // passPlanData:[],
    }
  
    
    componentWillMount(){
        const todoListId = this.state.todoListId;
        //console.log('todoListIdaaaaaaaaaa', this.props)
        Axios.get(`http://52.79.57.173/rest/moimDetail/moimTodoList/detail/${todoListId}`)
        .then(res => {
            console.log('planlist res', res)
            const todoList = res.data.list;
            const todoDateStart = todoList[0].toDoWrite.from_date;
            const todoDateEnd = todoList[0].toDoWrite.to_date
            this.setState({
                todoList: todoList,
                todoDateStart: todoDateStart,
                todoDateEnd: todoDateEnd
            })
            console.log('this.state.todolist', this.state.todoList)
            // console.log('this.state.todoDate', this.state.todoDate)

        })
    }

    _clicked = (item) =>{
        // var i = 0;
        // console.log(this.state.planData.length)
        // console.log(item.id)
        // while(i<this.state.planData.length){
        //     if(item.id-1 === i){
        //        this.state.planData[i].checkClicked = true;
        //     }
        //     i+=1;
            
        // }
        this.setState({clicked:true})
        item.checkClicked = !item.checkClicked; //checkclicked bool설정
        console.log('item', item)
        console.log('item.checkCliked',item.checkClicked)
        if(item.checkClicked === true){
            item.checkConfirm = 'Y'
        }else if(item.checkClicked === false){
            item.checkConfirm ='N'
        }
        // console.log(this.state.planData[0].checkClicked)
        // console.log(this.state.planData[1].checkClicked)

    }
    _checkAction = (item) => {
        if(item.checkConfirm === 'N'){
            return styles.planText;
        }else if(item.checkConfirm ==='Y'){
            return styles.completedPlanText;
        }
        //checkclicked bool에따라 스타일 바꿔줌
        // if(item.checkClicked === true){
        //     return styles.planText;
        // }else if(item.checkClicked === false){
        //     return styles.completedPlanText;
        // }
    }
    _closeSeeClicked = () =>{
        this.setState({seeClicked: !this.state.seeClicked})
    }
    
    _seeClicked = (item) => {
        const passPlanData = item.toDoWrite.plan_title;
        this.setState({
            seeClicked: true,
            passPlanData: passPlanData
        })
        console.log('item', item);
        console.log('passPlanData', passPlanData)
        console.log('this.state.passPlanData', this.state.passPlanData);
    }
    render(){
        return(
            <>
            <FlatList 
                data={this.state.todoList}
                renderItem={({item}) => (
                    <View style={styles.planList}>
                        {/* react native 사이클 특이함 this.setstate해줘야 새로고침됨 걍 item.checkClicked 쓰면 새로고침 안되서 작동 안됨 */}
                        {/* <Text style={this.state.clicked ? (item.checkClicked? (styles.completedPlanText) : (styles.planText)) : (styles.planText)}> */}
                        <Text style={this._checkAction(item)}>  
                            ▶   {item.plan_list},  {item.checkConfirm}
                        </Text>
                        <View style={styles.Button}><Button title="체크" color="#F08080" onPress={() =>this._clicked(item)}/></View>
                        <View style={styles.Button}><Button title="보기" color="#ADD8E6" onPress={() => this._seeClicked(item)}/></View>
                        
                    </View>
                    
                )}
            />
            <SeeButtonModal openModal={this.state.seeClicked} 
                            closeModal={this._closeSeeClicked.bind(this)}
                            passData = {this.state.passPlanData}/>
            
            <View style={{alignItems:'flex-end', paddingRight:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.text}>시작일</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.todoDateStart}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                // minDate="2020-01-01"
                // maxDate="2020-06-01"
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
                onDateChange={(startDate) => {this.setState({todoDateStart: startDate})}}
              />
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={styles.text}>종료일</Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.todoDateEnd}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.todoDateStart}
                    maxDate="2020-06-01"
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
                    onDateChange={(endDate) => {this.setState({todoDateEnd: endDate})}}
                />    
            </View>
         
            
            {/* {this.props.onDate(this.state.endDate)} */}
        </View>
            
            {/* <DatePick
                    todoDateStart={this.state.todoDateStart}
                    todoDateEnd={this.state.todoDateEnd} 
                    onDate={(formDate)=> {
                          // console.log('formdate',formDate)
                          this.state.formDate = formDate
                          console.log('this.state.formDate', this.state.formDate)
                           }}
                      /> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    planList:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:0.3,
        paddingTop:5,
        marginLeft:7
    },
    planText:{
        fontSize:20,
        color:'white'
    },
    completedPlanText:{
        fontSize:20,
        textDecorationLine: "line-through",
        color:'#696969'
    },
    Button:{
        paddingLeft:5
    },
    text:{
        fontSize:20,
        color:'white'
      }
   
})

export default PlanList;
