import Timeline from 'react-native-timeline-flatlist';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class TimeLineReply extends Component {
  constructor() {
    super();
    this.renderDetail = this.renderDetail.bind(this);

    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
    ];
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Timeline
          style={styles.list}
          data={this.data}
          renderCircle={() => {}}
          // separator={false}
          showTime={false}
          lineWidth={0}
          renderDetail={this.renderDetail}
        />
      </View>
    );
  }

  renderDetail(rowData, sectionID, rowID) {
    return (
      <View style={{flex: 1}}>
        <Text>{rowData.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
  },
});
