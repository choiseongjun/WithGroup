import React, {Component} from 'react';
import {View, Text, StyleSheet,Button,FlatList,Image,TouchableOpacity, Dimensions, Alert} from 'react-native';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
//import defaultimg from '../image/ddd.jpg';

const{width, height} = Dimensions.get('window');

class Data1 extends Component{
    constructor(props){
        super(props)
        this.state ={
            moims:[],
            names:[],
            data:[],
            page:1,
            pageTotal:null,
            loading:false,
            spinner:false,
           
    
        }
    }
    
      _handleLoadMore = () => {
        //   alert("this.state.page : " + this.state.page)
        if(this.state.page > this.state.pageTotal ){
            return;
        }        
        
            if(!this.state.loading){
                this._getData();


            }
            
        
      }
   
    _getData = async () =>{
        
        this.setState({ loading: true });
        this.setState({ spinner: true });
        // alert("getData ")
        setTimeout( () =>
         { 
            axios.get(`http://52.79.57.173/rest/moimlistView?page=` + this.state.page)
            .then(res => {
              
                console.log(res)
                this.setState({
                    moims:this.state.moims.concat(res.data.moimList.content),
                    page:this.state.page + 1,
                   
                })

                if(this.state.pageTotal == null){
                    this.setState({pageTotal: res.data.moimList.totalPages})
                }
                this.setState({loading: false });
                this.setState({ spinner: false });
            })
           
         }, 1000)
    }
    
    // componentWillMount(){
    //          axios.get(`http://52.79.57.173/rest/moimlistView?page=` + this.state.page)
    //         .then(res => {
              
    //             console.log(res)
                
    //         })
    // }

    componentDidMount(){
        // alert("comp did mnt")
        this._getData();
        
    }

    render(){

        const {moims} = this.state;
        const logo = require('../image/ddd.jpg');
        
        return(
            <View style={styles.container}>
                <Spinner 
                visible={this.state.spinner}
                textContent={'Loading...'}
 
                ></Spinner>
                <View style={styles.elem}>
                    <View style={styles.userInfo}>
                        <FlatList
                            // data={this.state.data}
                            data={moims}
                            renderItem={({item}) =>  
                                <TouchableOpacity 
                                onPress={() => this.props.children.navigation.navigate('MoimDetail',{id: item.id} )}
                                style={styles.section}>
                                    <View style={{flexDirection:'row',flex:1}}>
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
                                    </View>
                                    
                                        <TouchableOpacity
                                            onPressOut={() => 
                                                // {console.log('모달',item.peopleList.map(x=>x.name))}
                                                // <View style={styles.modar}>
                                                //    <Text>{item.peopleList.map(x=>x.name)}</Text> 
                                                // </View>
                                                Alert.alert(
                                                    'Parties',
                                                    String(item.peopleList.map(x=>x.name))
                                                )
                                                }>
                                                {/* <Text style={styles.peopleNum}>{item.peopleList.length}</Text> */}
                                        </TouchableOpacity>
                                
                                </TouchableOpacity> 
                            }
                            keyExtractor={(item, index) => item.id}
                            onEndReached={this._handleLoadMore}
                            onEndReachedThreshold={1}
                           
                        />    
                      
                              
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
    // _onCliked = () =>{
    //     <Text>{item.peopleList.map(x=>x.name)}</Text>
    // }
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
        justifyContent:'space-between',
 
        
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
    peopleNum:{
        margin:20,
        fontSize:22,
        color:'#FF8C00',
        flex:1,
        fontWeight:'bold',
        textDecorationLine:'underline'
    },
    modar:{
        width:300,
        height:300,
        backgroundColor:'gray',
        flex:1
    }


})



export default Data1;