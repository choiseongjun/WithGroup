import React,{Component} from 'react';
import {View,Text,TextInput,StyleSheet, Modal, Button, Dimensions} from 'react-native';

const{width, height} = Dimensions.get('window');

class SeeButtonModal extends Component {
    state={
        planToDo:''
    }
    _controlPlan = (text) =>{
        this.setState({planToDo:text})
    }
    render(){
        return(
                <Modal 
                    animationType='slide'
                    transparent={false}
                    visible={this.props.openModal}>
                    
                    <View style={styles.modal}>
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
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 20,
        width:"80%"
    }
})

export default SeeButtonModal;