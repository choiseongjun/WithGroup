// import React,{Component} from 'react';
// import {View,
//         Text,
//         StyleSheet,
//         Image,
//         TextInput,
//         TouchableOpacity} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import FooterButton from './FooterButton';
// import axios from 'axios';
// import {AsyncStorage} from 'react-native';


// const BLUE = '#428AF8';
// const LIGHT_GRAY = '#D3D3D3';

// class LoginScreen extends Component{
//     constructor(props){
//         super(props);
//         this.state ={
//             isFocused: false,
//             email:'',
//             password:''
//         }
//     }
//     handleEmail = (text) => {
//         this.setState({ email: text })
//      }
//      handlePassword = (text) => {
//         this.setState({ password: text })
//      }
//      login = (email, password) => {
//         alert('email: ' + email + ' password: ' + password)
        
//         axios.post(`http://52.79.57.173/signin`,{email:email,
//         password:password})
//         .then(res => {
//             console.log("res.data.jwt.accessToken : ", res.data.jwt.accessToken)
//             const token = res.data.jwt.accessToken;
//             AsyncStorage.setItem("access_token", token);

//             {this.props.navigation.navigate('Main')}
//         })
//    }
       

//     handleFocus = event => {
//         this.setState({ isFocused: true});
//     };

//     render(){
//         const {isFocused} = this.state;
//         return(
//             <View style={styles.container}>
//                 <Image 
//                     source={require('./logo.png')}
//                     style={styles.logo}/>
//                 <Text style={styles.welcome}>
//                     스터디 모임 플랫폼에 오신걸 환영합니다.</Text>
//                 <View style={styles.loginText}>
//                     <Feather name='mail' size={30}/>
//                     <TextInput 
//                         style={styles.idtext}
//                         onChangeText = {this.handleEmail}
//                         autoCorrect={false}
//                         placeholder=":"
//                         underlineColorAndroid={
//                             isFocused? BLUE : LIGHT_GRAY
//                         }
//                         onFocus={this.handleFocus}
                        
//                         />
//                 </View>
//                 <View style={styles.loginText}>
//                     <Feather name='lock' size={30}/>
//                     <TextInput 
//                         style={styles.idtext}
//                         onChangeText = {this.handlePassword}
//                         autoCorrect={false}
//                         placeholder=":"
//                         secureTextEntry={true}
//                         underlineColorAndroid={
//                             isFocused? BLUE : LIGHT_GRAY
//                         }
//                         onFocus={this.handleFocus}

//                         />
//                 </View>
//                 <FooterButton 
//                     buttonText='Login'
//                     style={styles.loginButton}
//                     onPress = {
//                         () => this.login(this.state.email, this.state.password)
//                      }/>
//                 <TouchableOpacity
//                     onPress={() => this.props.navigation.navigate('Find')}>
//                     <Text style={styles.forgotPassword}>Forgot to your Password?</Text>
//                 </TouchableOpacity>
    
//                 <TouchableOpacity 
//                     onPress={() => this.props.navigation.navigate('Create')}>
//                     <Text style={styles.createAccountText}>Don't have account? Create one</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor: '#F5F5F5',
//         flexDirection:'column'
//     },
//     logo:{
//         width:160,
//         height:158,
        
//     },
//     welcome:{
//         marginTop:20,
//         marginBottom:30,
//         fontSize:15,
//         textAlign:'center',
//         color:'rgba(0,0,0,0.3)'
//     },
//     idtext:{
//         width: 250,
//         marginLeft:5
       
//     },
//     loginText:{
//         flexDirection:'row',
//         alignItems:'center',
//     },
//     loginButton:{
//         width:200,
//         height:50,
//         marginTop:30,
//     },
//     forgotPassword:{
//         fontSize:13,
//         color: 'rgba(0,0,0,0.2)',
//         marginTop:20
//     },
//     createAccountText:{
//         color:'rgba(216, 111, 105,0.5)',
//         fontSize:15,
//        marginTop:70
//     },
  
// })
// export default LoginScreen;


import React,{ useState, useRef} from 'react';
import {View,
        Text,
        StyleSheet,
        Image,
        TextInput,
        TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FooterButton from './FooterButton';
import axios from 'axios';
import {AsyncStorage} from 'react-native';


const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

const LoginScreen  = (props) => {
    const [isFocused, setIsFocused] = useState(false);    
    const [email, setEmail] = useState('');    
    const [password, setPassword] = useState('');    
    
    
    const handleEmail = (text) => {
        setEmail(text);
    }
    const handlePassword = (text) => {
        setPassword(text);
    }
    const handleFocus = () => {
        setIsFocused(true);
    } 

    const login = (email, password) => {
        axios.post(`http://52.79.57.173/signin`,{email:email,
        password:password})
        .then(res => {
            console.log("res.data.jwt.accessToken : ", res.data.jwt.accessToken)
            const token = res.data.jwt.accessToken;
            AsyncStorage.setItem("access_token", token);

            props.navigation.navigate('Main');
        })
    }  
   
    return(
        <View style={styles.container}>
            <Image 
                source={require('./logo.png')}
                style={styles.logo}/>
            <Text style={styles.welcome}>
                스터디 모임 플랫폼에 오신걸 환영합니다.</Text>
            <View style={styles.loginText}>
                <Feather name='mail' size={30}/>
                <TextInput 
                    style={styles.idtext}
                    onChangeText = { handleEmail }
                    autoCorrect={false}
                    placeholder=":"
                    underlineColorAndroid={
                        isFocused? BLUE : LIGHT_GRAY
                    }
                    onFocus={ handleFocus }
                    
                    />
            </View>
            <View style={styles.loginText}>
                <Feather name='lock' size={30}/>
                <TextInput 
                    style={styles.idtext}
                    onChangeText = { handlePassword }
                    autoCorrect={false}
                    placeholder=":"
                    secureTextEntry={true}
                    underlineColorAndroid={
                        isFocused? BLUE : LIGHT_GRAY
                    }
                    onFocus={ handleFocus }

                    />
            </View>
            <FooterButton 
                buttonText='Login'
                style={styles.loginButton}
                onPress = {  () => login(email, password)  }/>
            <TouchableOpacity
                onPress={() => navigation.navigate('Find')}>
                <Text style={styles.forgotPassword}>Forgot to your Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Create')}>
                <Text style={styles.createAccountText}>Don't have account? Create one</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#F5F5F5',
        flexDirection:'column'
    },
    logo:{
        width:160,
        height:158,
        
    },
    welcome:{
        marginTop:20,
        marginBottom:30,
        fontSize:15,
        textAlign:'center',
        color:'rgba(0,0,0,0.3)'
    },
    idtext:{
        width: 250,
        marginLeft:5
       
    },
    loginText:{
        flexDirection:'row',
        alignItems:'center',
    },
    loginButton:{
        width:200,
        height:50,
        marginTop:30,
    },
    forgotPassword:{
        fontSize:13,
        color: 'rgba(0,0,0,0.2)',
        marginTop:20
    },
    createAccountText:{
        color:'rgba(216, 111, 105,0.5)',
        fontSize:15,
       marginTop:70
    },
  
})
export default LoginScreen;
