import React,{Component} from 'react';
import {View,Button,Text,StyleSheet,Dimensions,Modal,ScrollView,FlatList, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import DatePick from './DatePick';
import PlanList from './PlanList';
import SeeButtonModal from './SeeButtonModal';
import { symbol } from 'prop-types';

const{width, height} = Dimensions.get('window');
export default class SharePlan extends Component{
    state={
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
        seeClicked:false
       
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
    }
    // _lastDate = (formDate) => this.setState({endDate:formDate})

    //planList에서 보기 클릭했을때 동작
    _seeClicked(){
        this.setState({seeClicked: true})
    }
    _closeSeeClicked(){
        this.setState({seeClicked: !this.state.seeClicked})
    }

    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.upSideBar}>                   
                  <Text style={{paddingLeft:10,fontWeight:'bold'}}>상태</Text>
                  <Text style={{paddingLeft:80,fontWeight:'bold'}}>계획</Text>
                  <Text style={{paddingLeft:90,fontWeight:'bold'}}>작성자</Text>
                  <Text style={{paddingLeft:75,fontWeight:'bold'}}>진행도</Text>
                </View>  
                                    {/* 임시  데이터 나중에 데이터 받아서 flatList로 처리할 예정 */}
                                    <View style={styles.userBox}>
                                        <View style={[styles.planList,{paddingLeft:8}]}><Text>{this.state.data[0].status}</Text></View>
                                        <TouchableOpacity
                                            style={styles.planList}
                                            onPress={() => this.setState({isVisible: true})}
                                            >
                                          <View style={{flex:1,justifyContent:'center'}}>
                                            <Text>{this.state.data[0].plan}</Text>
                                            {this.state.isSaving ? (<Text>{this.state.formDate}</Text>) : (console.log('nothing'))}
                                          </View>
                                                                      
                                        </TouchableOpacity>
                                        <View style={styles.planList}><Text>{this.state.data[0].name}</Text></View>
                                        <View style={styles.planList}>
                                            <Progress.Bar progress={this.state.data[0].percent} width={70} height={20} />
                                        </View>

                                        <Modal
                                            animationType={'fade'}
                                            transparent={true}
                                            visible={this.state.isVisible}
                                            onRequestClose= {() => {console.log("Modal has been closed.")}}
                                        >
                                            <View style={styles.modal}>
                                                {/* endDate불러오기 */}
                                               
                                                {/* 계획리스트 데이터 */}
                                                <PlanList seeClicked={this._seeClicked.bind(this)}/>
                                                
                                                <SeeButtonModal openModal={this.state.seeClicked} closeModal={this._closeSeeClicked.bind(this)}/>

                                                <DatePick onDate={(formDate)=> {
                                                     console.log('formdate',formDate)
                                                     this.state.formDate = formDate
                                                        }}/>
                                               
                                               
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
                                       
                                      


                <View style={{flex:1}}>
                
                        <FlatList 
                            data={this.props.datas}
                            renderItem={({item}) => 
                    
                                <View style={styles.userBox}>
                                      
                                        <TouchableOpacity 
                                            style={{justifyContent:'center'}}
                                            onPress={this._clicked.bind(this)}>
                                        <View style={[styles.circle, this.state.isClicked ? styles.completedCircle : styles.uncompletedCircle]}></View>
                                        </TouchableOpacity>
                                        <View style={{flex:1,justifyContent:'center'}}><Text>{item.name}</Text></View>

                                        <Modal
                                            animationType={'fade'}
                                            transparent={true}
                                            visible={this.state.isVisible}
                                            onRequestClose= {() => {console.log("Modal has been closed.")}}
                                        >
                                            <View style={styles.modal}>
                                                
                                                <Button 
                                                    title='   닫기   '
                                                    onPress = {() => {  
                                                        this.setState({ isVisible:!this.state.isVisible})}}
                                                    color={'gray'}
                                                />
                                            </View>
                                            
                                        </Modal>

                                        {/* 임시로 no title으로 설정 나중에 데이터 채울꺼임*/}
                                        <TouchableOpacity
                                            style={{flex:1}}
                                            onPress={() => this.setState({isVisible: true})}
                                            >
                                          <View style={{flex:1,justifyContent:'center'}}><Text>no title</Text></View>                                    
                                        </TouchableOpacity>
                                        <View style={{flex:1, justifyContent:'center'}}>
                                            {/* 임시로 랜덤 이부분도 나중에 데이터 채울꺼임 */}
                                            <Progress.Bar progress={Math.random(Math.floor)} width={70} height={20} /> 
                                        </View>     
                              
                                </View>
                       
                      
                               
                            }
                        />
                    
                </View>
                

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
        backgroundColor : "rgba(0,0,0,0.2)",   
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
    }
})