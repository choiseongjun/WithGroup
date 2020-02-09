import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FooterButton from './FooterButton';
import axios from 'axios';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

class CreateScreen extends Component {
    constructor(props){
        super(props);
        console.log("LoginScreen constroctor - ");
        console.log("props : ", props);

        this.state ={
            isFocused: false,
            id:'',
            pw:'',
            nick:''
        }
    }
    
    handleFocus = event => {
        this.setState({ isFocused: true});
    };

    signup = (id, pw, nick) => {
        console.log("email:"+id+", password:"+pw+", nickname:"+nick);
        alert("email:"+id+", password:"+pw+", nickname:"+nick);
        
        let people = {};
        people.id=id;
        people.pw=pw;
        people.nick=nick;

        let formData = new FormData();
        formData.append('signUpRequest', new Blob([JSON.stringify(people)], {
            type: "application/json;"
        }));
       
            axios.post(`http://52.79.57.173/signup`, {formData},{
                headers:{
                    type:'POST',
                    enctype: 'multipart/form-data',
                        processData: false, //데이터를 쿼리 문자열로 변환하는 jQuery 형식 방지
                        contentType: false,
                        dataType:'json',
                    mimeType:"multipart/form-data",
                    data: formData,
                  }
              }) 
            .then( res => {  
                console.log(res);
                console.log(res.data);     
                {this.props.navigation.navigate('HOME')}  
            })
            .catch( error => { 
                console.log('failed', error) 
            })
    }

    render(){
        const {isFocused} = this.state;

        return(
            <View style={styles.container}>
                <Image 
                    source={require('./logo.png')}
                    style={styles.logo}/>

                <Text style={styles.signupTitle}>회원가입</Text>

                <View style={styles.signupText}>
                    <Feather name='mail' size={30}/>
                    <TextInput 
                        style={styles.inputText}
                        onChangeText={(id) => this.setState({id})}
                        autoCorrect={false}
                        placeholder="이메일 아이디"
                        underlineColorAndroid={
                            isFocused? BLUE : LIGHT_GRAY
                        }
                        onFocus={this.handleFocus}
                    />
                </View>

                <View style={styles.signupText}>
                    <Feather name='lock' size={30}/>
                    <TextInput 
                        style={styles.inputText}
                        onChangeText={(pw) => this.setState({pw})}
                        autoCorrect={false}
                        placeholder="비밀번호"
                        secureTextEntry={true}
                        underlineColorAndroid={
                            isFocused? BLUE : LIGHT_GRAY
                        }
                        onFocus={this.handleFocus}
                    />
                </View>

                <View style={styles.signupText}>
                    <Feather name='lock' size={30}/>
                    <TextInput 
                        style={styles.inputText}
                        onChangeText={(pw) => this.setState({pw})}
                        autoCorrect={false}
                        placeholder="비밀번호 확인"
                        secureTextEntry={true}
                        underlineColorAndroid={
                            isFocused? BLUE : LIGHT_GRAY
                        }
                        onFocus={this.handleFocus}
                    />
                </View>

                <View style={styles.signupText}>
                    <Feather name='nickname' size={30}/>
                    <TextInput 
                        style={styles.inputText}
                        onChangeText={(nick) => this.setState({nick})}
                        autoCorrect={false}
                        placeholder="닉네임"
                        secureTextEntry={true}
                        underlineColorAndroid={
                            isFocused? BLUE : LIGHT_GRAY
                        }
                        onFocus={this.handleFocus}
                    />
                </View>

                <FooterButton 
                    buttonText='Sign Up'
                    style={styles.signupButton}
                    onPress={() => 
                        this.signup(
                            this.state.id,
                            this.state.pw,
                            this.state.nick
                        )
                    }
                />

                <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('HOME')}>
                    <Text style={styles.toLoginText}>Already have account? Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F5F5F5'
    },
    logo:{
        width:160,
        height:158,
    },
    signupTitle:{
        marginTop:20,
        marginBottom:30,
        fontSize:25,
        textAlign:'center',
        color:'rgba(52,52,52,1)'
    },
    signupText:{
        flexDirection:'row',
        alignItems:'center',
    },
    signupButton:{
        width:200,
        height:50,
        marginTop:30,
    },
    toLoginText:{
        color:'rgba(216, 111, 105,0.5)',
        fontSize:15,
       marginTop:70
    },
    inputText:{
        width: 250,
        marginLeft:5
       
    },
})

export default CreateScreen;