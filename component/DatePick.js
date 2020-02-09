import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import {View,Text} from 'react-native';

export default class DatePick extends Component {
  constructor(props){
    super(props)
    this.state = {
        startDate:"2020-01-15",
        endDate:"2020-01-15"
    }


  }
  
  render(){
    return (
        <View style={{alignItems:'flex-end', paddingRight:5}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={{fontSize:20}}>시작일</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                maxDate="2020-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(startDate) => {this.setState({startDate: startDate})}}
              />
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:20}}>종료일</Text>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.endDate}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.startDate}
                    maxDate="2020-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(endDate) => {this.setState({endDate: endDate})}}
                />    
            </View>
         
            
            {this.props.onDate(this.state.endDate)}
        </View>
        
    )
  }
}