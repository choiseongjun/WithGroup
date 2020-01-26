import React,{Component} from 'react';
import {Text,View,StyleSheet, TouchableHighlight} from 'react-native';

export class AppInforeply extends Component{
    constructor(){
        super();
        this.state={
            clicked:false,
            clicked2:false
        }
        this._clickIntro = this._clickIntro.bind(this)
        this._clickIntro2 = this._clickIntro2.bind(this)
        this._introText = this._introText.bind(this)
    }
    _clickIntro(){
        this.setState({
            clicked: !this.state.clicked
        })

    }
    _clickIntro2(){
        this.setState({
            clicked2: !this.state.clicked2
        })

    }
    _introText(){
        if(this.state.clicked === true){
            return <Text>{this.props.data[0].infomation}</Text>
        }
    }
    _introText2(){
        if(this.state.clicked2 === true){
            return <Text>{this.props.data[1].infomation}</Text>        }
    }
    render(){
        return(
            <View style={styles.intro}>
                <TouchableHighlight 
                    style={styles.introFactor}
                    onPress={this._clickIntro}>
                    <Text style={styles.introText}>소개페이지</Text>
                </TouchableHighlight>
                {this._introText()}
                <TouchableHighlight 
                    style={styles.introFactor}
                    onPress={this._clickIntro2}>
                    <Text style={styles.introText}>공지사항</Text>
                </TouchableHighlight>
                {this._introText2()}
                <View style={styles.introFactorVersion}>
                    <Text style={styles.introText}>버전</Text>
                    <Text>{this.props.version}</Text>
                </View>               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    intro:{
        flex:1,
        alignItems:'center',
    },
    introFactor:{
        width:'90%',
        height:50,
        justifyContent:'center',
        borderBottomWidth:0.5,
    },
    introText:{
        fontSize:20,
        
    },
    introFactorVersion:{
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'90%',
        height:50,
        borderBottomWidth:0.5,

    }
})