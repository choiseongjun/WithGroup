import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet, Modal, Button, Dimensions,TouchableOpacity} from 'react-native';

const{width, height} = Dimensions.get('window');

class SeeButtonModal extends Component {
    state={
        planToDo:this.props.passData, //데이터를 새로고침해야 가져온다. 네비게이션 써보기
    }
    // _getPlan = () => {
    //     this.setState({planToDo:this.props.passData})
    // }
    _controlPlan = (text) =>{
        this.setState({planToDo:text})
        console.log(this.state.planToDo)
    }
    render(){
       // console.log('this.state.getPlan', this.state.getPlan)
        return(
                <Modal 
                    animationType='slide'
                    transparent={false}
                    visible={this.props.openModal}>
                    
                    <View style={styles.modal}>
                        <View style={{flexDirection:'row'}}>
                            <TextInput 
                                style={styles.input}
                                placeholder = {"Plan here"}
                                value={this.state.planToDo}
                                onChangeText={this._controlPlan}
                                placeholderTextColor={"#999"}
                                returnKeyType={"done"}
                                autoCorrect={false}
                            
                            />
                            <TouchableOpacity
                                style={{justifyContent:'center'}}
                            >
                                <View style={styles.square}><Text style={{fontSize:30,color:'white'}}>+</Text></View>
                            </TouchableOpacity>
                        </View>
                        <TextInput 
                            style={styles.inputText}
                            multiline={true}
                            autoCorrect={false}
                            placeholder={"Specific Plan"}
                        />
                    </View>
                    <Button 
                         title='   닫기   '
                         onPress = {  
                            this.props.closeModal
                        }
                         color={'gray'}
                        />
                </Modal>
  
           
        );
    }
}

const styles = StyleSheet.create({
    modal:{
        flex:1,
        //justifyContent:'center',
        alignItems:"flex-start",
        
    },
    input:{
        margin:10,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 15,
        width:"80%"
    },
    inputText:{
        marginLeft:10,
        width:width-20,
        height:"80%",
        borderWidth:1,
        borderColor:'#bbb'
    },
    square:{
        width:50,
        height:40,
        borderRadius:3,
        backgroundColor:'darkgray',
        alignItems:'center',
        justifyContent:'center'
    }

})

export default SeeButtonModal;