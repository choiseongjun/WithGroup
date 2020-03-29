import React,{Component} from 'react';
import {View,Button,Text,StyleSheet,Dimensions,Modal,ScrollView,FlatList, TouchableOpacity,RefreshControl} from 'react-native';
import * as Progress from 'react-native-progress';
import PlanList from './PlanList';
import CreatePlanModal from './CreatePlanModal';
import { symbol } from 'prop-types';
import Axios from 'axios';

const{width, height} = Dimensions.get('window');

export default class SharePlan extends Component{
    constructor(props){
        super(props)
        this.state= {
            data:[
                {id:1, plan:'noname', planlist:{id:1, planName:'년간 계획세우기'}, percent:0.7,name:'Kyeongti',status:'new'},
                {id:2, plan:'noname', percent:0.3,name:'CY',status:'new'},
                {id:3, plan:'noname', percent:0.5,name:'Jun',status:'new'},
                {id:4, plan:'noname', percent:0.8,names:'Junghu',status:'new'},
                {id:5, plan:'noname', percent:0.2,names:'Mingu',status:'new'},
                {id:6, plan:'noname', percent:0.9,names:'Ruru',status:'new'},
    
            ],
            isClicked:true,
            isVisible:false,
            startDate:'',
            //endDate:'',
            isEditing:false,
            expendDate:0,
            isSaving:false,
            formDate:'',
            
            MoimId: this.props.MoimId,
            planList:[],
            isVisibleCPM:false,
            checked:[],
            refreshing:false,
            getRefresh:false
            
        }
         
    }
   
    componentWillMount(){
        const MoimId = this.state.MoimId;
        console.log('모임아이디',MoimId)
    
        Axios.get(`http://52.79.57.173/rest/moimDetail/moimTodoList/${MoimId}`)
        .then(res => {
            console.log('shareplan res', res)
            const List = res.data.todolist.content;
            this.setState({
                planList: List
            })
      
            console.log('planList', this.state.planList)
          
        })

   
    }
    // componentDidUpdate(){
    //     if(this.state.isVisibleCPM === true){
    //          setTimeout(() => {
    //                 this.setState({isVisibleCPM:false})
    //               }, 1);
            
    //     }
    //     console.log('isvisibleCPM did mount', this.state.isVisibleCPM)
    // }
    _onRefresh = () => {
        this.setState({refreshing: true});
        fetchData().then(() => {
            this.setState({refreshing: false});
        });
    }
    _clicked(){
        this.setState({
            isClicked: !this.state.isClicked
        })
    }
    //수정 클릭시 동작함수
    _isEditing(){
        this.setState({
            isEditing:!this.state.isEditing
        })
        //수정이 false일때 expendDate = 0 으로 
        if(this.state.isEditing === false){
            this.setState({
                expendDate:0
            })
        }
    }
    _expendDate(){
        this.setState({
            expendDate: this.state.expendDate + 1
        })
    }
    //저장 클릭시 수정된 날짜는 사라지고 '0'으로 초기화
    _isSaving(){
        this.setState({
            isSaving:true,
            isEditing:false,//수정 날짜 초기화
            seeClicked:false
        })
        console.log('checed data', this.state.checked)
        const count = this.state.checked.map((a) => a)
       
        var checked = 0;
        const listId = [];
        for(var i = 0;i<count.length;i++){
            if(count[i].checkConfirm === 'Y'){
                checked ++;
            }
            if(count[i].checkClicked === true){
                listId.push(count[i].id)
            }
        }
        console.log('listId', listId.join())
        // for(var i = 0 ;i<count.length;i++){
        //     if(count[i].checkClicked === true){
        //         listId.push(count[i].id)
        //     }
        // }
        console.log('listId', listId)
        console.log('check', checked);
        console.log('count.checkClicked',count)
        const no = this.state.MoimId;
        console.log('no',no)
        let param={
			list:listId.join(),
			count:checked
	    }
       
            
        Axios.post(`http://192.168.0.10:8080/moimDetail/moimTodoList/moimtodostatus/moimtodostatusDetail/${no}`, param) 
        .then(res => {
            console.log("res in")
            console.log("res.data : ", res.data)
            // this.setState({refresh: true})
        })
   

        
    }


    //planList에서 보기 클릭했을때 동작
    // _seeClicked(){
    //     this.setState({seeClicked: true})
    // }

    _passId = (item) =>{
        this.setState({isVisible:true})
        const id = item.id
        console.log('item.id',id)
        this.setState({
            planListId: id
        })

    }

    _deleteList = () => {
        const no = this.state.planListId;
        console.log('deleteList no',no)
        Axios.delete(`http://192.168.0.10:8080/moimDetail/moimTodoList/delete/${no}`) 
        .then(res => {
            console.log("delete list")
            console.log("res.data : ", res.data) 
        })
    }

    refreshPlanList = () =>{
        const MoimId = this.state.MoimId;
        console.log("this.state.planList",this.state.planList);
        Axios.get(`http://52.79.57.173/rest/moimDetail/moimTodoList/${MoimId}`)
        .then(res => {
            console.log('shareplan res', res)
            const List = res.data.todolist.content;
            this.setState({
                planList: List
            })
      
            console.log('planList', this.state.planList)
          
        })
        
        // this.setState({planList: [ ]})
      
    }


    render(){
       console.log('refreshing from shareplan', this.state.refreshing)
       console.log('getrefreshing from shareplan', this.state.getRefresh)
        return(
            
            <View style={styles.container}> 
               
                <View style={styles.upSideBar}>                   
                  <Text style={{paddingLeft:10,fontWeight:'bold'}}>상태</Text>
                  <Text style={{paddingLeft:80,fontWeight:'bold'}}>계획</Text>
                  <Text style={{paddingLeft:90,fontWeight:'bold'}}>작성자</Text>
                  <Text style={{paddingLeft:75,fontWeight:'bold'}}>진행도</Text>
                  
               </View>
                
                {/* {console.log(this.state.planList)} */}
                <View style={{flex:1,alignSelf:'flex-start'}}>

                      <FlatList 
                            data={this.state.planList}
                            renderItem={({item}) =>
                                <View style={styles.userBox}>
                                    <View style={[styles.planList,{paddingLeft:8}]}><Text>{item.status}</Text></View>
                                    <TouchableOpacity
                                                    style={styles.planList}
                                                    onPress={() => this._passId(item)}
                                                    >
                                                <View style={{flex:1,justifyContent:'center'}}>
                                                    <Text>{item.plan_title}</Text>
                                                    {this.state.isSaving ? (<Text>{this.state.formDate}</Text>) : (console.log('nothing'))}
                                                </View>
                                    </TouchableOpacity>
                                    <View style={styles.planList}><Text>{item.people.name}</Text></View>
                                        <View style={styles.planList}>
                                            <Progress.Bar progress={item.progress * 0.01} width={70} height={20} />
                                        </View>   
                                        {this.state.getRefresh?
                                         (  <RefreshControl
                                             refreshing={this.state.refreshing}
                                             onRefresh={this._onRefresh}
                                            />  ):(null) }             
                                </View> 
                                
                            }/>
                        
                      <Modal
                      animationType={'fade'}
                      transparent={true}
                      visible={this.state.isVisible}
                      onRequestClose= {() => {console.log("Modal has been closed.")}}
                       >
                          <View style={styles.modal}>
                            
                              {/* 계획리스트 데이터 */}
                              <PlanList todoList={this.state.planListId} checkData={(check) => this.setState({checked:check})}/>
                              

                              <View style={{flexDirection:'row',paddingTop:2, paddingLeft:30, alignSelf:'flex-end'}}>
                                  {this.state.isEditing? (
                                      <View style={{flexDirection:'row',paddingRight:50,alignItems:'center'}}>
                                          <Text>수정종료일자: {this.state.expendDate}  </Text> 
                                          <TouchableOpacity
                                              onPress={this._expendDate.bind(this)}>
                                              <View style={styles.expendCircle}>
                                                  <Text>+</Text>
                                              </View>
                                          </TouchableOpacity>
                                      </View>
                                      ): (
                                      
                                          console.log('ss',)
                                      //  console.log('끝나는날', this.props.endDate)
                                      ) }
                                      {this.state.isSaving? (
                                          <View style={{paddingRight:50, alignItems:'center'}}>
                                              <Text>{this.state.formDate} + {this.state.expendDate}</Text>
                                          </View>

                                      ):(
                                          <Text></Text>
                                  )}
                                  <View style={styles.editButton}>
                                      <Button 
                                          title="    수정    "
                                          onPress={this._isEditing.bind(this)} 
                                          color="#778899"
                                          />
                                  </View>
                                  <View style={styles.editButton}>
                                      <Button 
                                          title="    저장    "
                                          onPress={this._isSaving.bind(this)}
                                          color="#778899"
                                          />
                                  </View>
                                  <View style={styles.editButton}>
                                      <Button 
                                          title="    삭제    "
                                          onPress={this._deleteList}
                                          color="#778899"
                                          />
                                  </View>

                              </View>
                                      
                                      
                              <Button 
                                  title='   닫기   '
                                  onPress = {() => {  
                                      this.setState({ isVisible:!this.state.isVisible})}}
                                  color={'gray'}
                              />
                           </View>
                                  
                      </Modal>                            
             
                      
                         
                        
                </View>
                <View style={styles.createSection}>
                     <TouchableOpacity 
                        //  onPress={() => this.props.passNavi.navigate('CreatePlan')}
                        onPress={() => this.setState({isVisibleCPM: true})}
                         style={styles.createButton}>
                         <View style={styles.create}>
                             <Text style={styles.createText}>추가 +</Text>
                         </View>  
                     </TouchableOpacity>
                 </View>

                 {this.state.isVisibleCPM ? (
                        <CreatePlanModal 
                            visible={this.state.isVisibleCPM} 
                            vData={(vData) => {
                                //console.log('vData', vData)
                                if(vData === false){
                                    this.setState({
                                        isVisibleCPM:false
                                    })
                                  }
                                 }}
                            MoimId={this.state.MoimId}
                            changeRefresh={(refresh) => {
                                this.setState({getRefresh: refresh})
                            }}
                            refreshPlanList={this.refreshPlanList}
                            />
                          ):(
                        console.log('CreatePlanModal')
                        )}   
                {console.log('isvisibleCPM', this.state.isVisibleCPM)}
                
               
                {/* 테스트입니다.시작. 기존에 있는isVisible로 bool지정 */}
                {/* <Button 
                    title="  TypeInput Modal  "
                    onPress={() => this.setState({isVisible:true})}
                /> */}

                {/* 테스트입니다.끝 */}
            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container:{
       // alignItems:'center',
        flex:1,
        flexDirection:'column',
    },
    upSideBar:{
        flexDirection:'row',
        width:width-0,
        height:50,
        borderBottomWidth:1,
        alignItems:'center',
        alignSelf:'flex-start',
        backgroundColor:'white'
    },
    userBox:{
        width:width-0,
        height:55,
        borderBottomWidth:0.5,
        flexDirection:'row',
        
        
    },
    circle:{
        width:30,
        height:30,
        borderRadius:15,
        borderWidth:7,
        margin:10
    },
    completedCircle: {
        borderColor: "#bbb"
      },
    uncompletedCircle: {
        borderColor: "#bbb"
      },
    modal:{
        justifyContent: 'center',  
       // alignItems: 'center',  
        backgroundColor : "rgba(0,0,0,0.7)",   
        height: "50%" ,  
        // width: width-0,  
        borderRadius:10,  
        borderWidth: 1,  
        borderColor: '#fff',    
        marginTop: 80,  
        flexDirection:'column',
  
       
    },
    expendCircle:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    planList:{
        flex:1,
        justifyContent:'center'
    },
    editButton:{
        padding:3,
        paddingBottom:10
    },
    create:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#006400',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#8FBC8F',
        borderWidth:2
    },
    createText:{
        fontSize:18,
        color:'#F8F8FF'
    },
    createButton:{
        marginBottom:30,
        marginRight:20,
        marginTop:15,
        
    },
    createSection:{
       // flex:1,
        alignItems:'flex-end',
        flexDirection:'column-reverse',
        marginTop:-10
    },
})