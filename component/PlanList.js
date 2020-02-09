import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Button} from 'react-native';

class PlanList extends Component {
    state={
        planData:[
            {id:1, plan:"2020년 계획세우기", checkClicked:false},
            {id:2, plan:"월간 계획세우기", checkClicked:false}
        ],
        clicked:false
    }

    _clicked(item){
        // var i = 0;
        // console.log(this.state.planData.length)
        // console.log(item.id)
        // while(i<this.state.planData.length){
        //     if(item.id-1 === i){
        //        this.state.planData[i].checkClicked = true;
        //     }
        //     i+=1;
            
        // }
        this.setState({clicked:true})
        item.checkClicked = !item.checkClicked;
        console.log(item.checkClicked)
        console.log(this.state.planData[0].checkClicked)
        console.log(this.state.planData[1].checkClicked)

    }

    render(){
        return(
            <FlatList 
                data={this.state.planData}
                renderItem={({item}) => (
                    <View style={styles.planList}>
                        {/* react native 사이클 특이함 this.setstate해줘야 새로고침됨 걍 item.checkClicked 쓰면 새로고침 안되서 작동 안됨 */}
                        <Text style={this.state.clicked ? (item.checkClicked? (styles.completedPlanText) : (styles.planText)) : (styles.planText)}>{item.id}. {item.plan}</Text>
                        <View style={styles.Button}><Button title="체크" color="#F08080" onPress={() =>this._clicked(item)}/></View>
                        <View style={styles.Button}><Button title="보기" color="#ADD8E6" onPress={this.props.seeClicked}/></View>
                    </View>
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    planList:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:0.3,
        paddingTop:5,
        marginLeft:7
    },
    planText:{
        fontSize:20
    },
    completedPlanText:{
        fontSize:20,
        textDecorationLine: "line-through",
        color:'#696969'
    },
    Button:{
        paddingLeft:5
    },
   
})

export default PlanList;