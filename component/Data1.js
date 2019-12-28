import React, {Component} from 'react';
import {View, Text, StyleSheet,Button,FlatList,Image,TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';
import defaultimg from '../image/ddd.jpg';

const{width, height} = Dimensions.get('window');

class Data1 extends Component{
    constructor(props){
        super(props)
        this.state ={
            moims:[],
        
            
          
        }
    }

    componentDidMount(){
  
        axios.get(`http://52.79.57.173/rest/moimlistView`)
        .then(res => {
          const moims = res.data.moimList.content;
          this.setState({ moims });
          console.log('모임', moims)
        
        
        //   테스트
        //   console.log('사람', moims[0].peopleList[1].name)
        //   console.log('몇명?', moims[0].peopleList.length)
          
        //   const i = 0;
        //   const peopleNum =[]
          
        //   while(i<moims[0].peopleList.length){
        //       peopleNum.push( moims[0].peopleList[i].name);
        //       i+=1;
        //   }
        // for(i;i<4;i++){
        //     peopleNum.push( moims[0].peopleList[i].name);
        //     console.log('참여사람들1', peopleNum)

        // }
        //   console.log('참여사람들2', peopleNum)
        // })
    //    moims[0].peopleList.map(moim => (
    //        {moim.name}
    //    ))
        
            
        }
        )}

     
 
    render(){

        const {moims} = this.state;
        const logo = require('../image/ddd.jpg');

        return(
            <View style={styles.container}>
                <View style={styles.elem}>
                    <View styke={styles.userInfo}>
                        <FlatList
                            data={moims}
                            renderItem={({item}) =>  
                            <TouchableOpacity 
                            onPress={() => this.props.children.navigation.navigate('MoimDetail',{id: item.id} )}
                            style={styles.section}>
                                  <Image 
                                    source={item.imageName === null ? require('../image/ddd.jpg')  : {uri:'http://52.79.57.173/getMoimImage/'+item.imageName+'.'+item.imageExtension}} 
                                    style={{width: 100, height: 75}} 
                                    /> 
                                <View style={styles.textMoim}>
                                    <Text style={{fontSize:15, fontWeight:'bold',marginTop:1}}>
                                        {item.title}
                                    </Text> 
                                    <Text>
                                        {item.intro}
                                    </Text>
                                    <Text>
                                        {item.people.name}
                                    </Text>
                           
                                </View>
                               
                            </TouchableOpacity> }/>    

                    </View>
               
                    <View style={styles.createSection}>
                        <TouchableOpacity 
                            onPress={() => this.props.children.navigation.navigate('CREATESTUDY')}
                            style={styles.createButton}>
                            <View style={styles.create}>
                                <Text style={styles.createText}>개설 +</Text>
                            </View>  
                        </TouchableOpacity>
                    </View>
               
               </View>
                
           </View>
                
                
                
   
                
                    
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
   
    section:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor:'white',
        borderBottomWidth:1,   
        width:width-0,
        height:75,
        marginTop:3,
        
    },
  
    create:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:'#FF6347',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#F4A460',
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
    userInfo:{
        flexDirection:'row',
        
        
    },
    elem:{
        width:width-0,
    },
    createSection:{
        flex:1,
        alignItems:'flex-end',
        flexDirection:'column-reverse',
        marginTop:-10
    },
    textMoim:{
        flexDirection:'column',
        marginLeft:5
    },
   

})



export default Data1;