import React,{Component} from 'react';
import {Text,View,StyleSheet, TouchableHighlight} from 'react-native';
import {AppInforeply} from '../containers'

export class AppInfomation extends Component{
    state={
        info:[
            {id:1, infomation:' Introduce about StudyFind '},
            {id:2, infomation:'Notice about new information of StudyFind'},
        ],
        version:'1.05'
    }
    render(){
        return(
                <AppInforeply data={this.state.info} version={this.state.version}/>
        );
    }
}
