import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,ScrollView,FlatList, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';


const{width, height} = Dimensions.get('window');
export default class SharePlan extends Component{
    state={
        data:[
            {id:1, plan:'noname', percent:0.7,name:'Kyeongti'},
            {id:2, plan:'noname', percent:0.3,name:'CY'},
            {id:3, plan:'noname', percent:0.5,name:'Jun'},
            {id:4, plan:'noname', percent:0.8,names:'Junghu'},
            {id:5, plan:'noname', percent:0.2,names:'Mingu'},
            {id:6, plan:'noname', percent:0.9,names:'Ruru'},

        ],
        isClicked:true
    }
    _clicked(){
        this.setState({
            isClicked: !this.state.isClicked
        })
    }
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.upSideBar}>                   
                  <Text style={{paddingLeft:10,fontWeight:'bold'}}>상태</Text>
                  <Text style={{paddingLeft:26,fontWeight:'bold'}}>글쓴이</Text>
                  <Text style={{paddingLeft:80,fontWeight:'bold'}}>계획</Text>
                  <Text style={{paddingLeft:95,fontWeight:'bold'}}>진행도</Text>
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
                                    {/* 임시로 no title으로 설정 나중에 데이터 채울꺼임*/}
                                    <View style={{flex:1,justifyContent:'center'}}><Text>no title</Text></View>                                    
                                    <View style={{flex:1, justifyContent:'center'}}>
                                        {/* 임시로 랜덤 이부분도 나중에 데이터 채울꺼임 */}
                                        <Progress.Bar progress={Math.random(Math.floor)} width={70} height={20} /> 
                                    </View>     
                                </View>
                            }
                        />
                    
                </View>
                
                {/* */}
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
})