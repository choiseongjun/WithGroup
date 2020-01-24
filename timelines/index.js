import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TextInput,
  Button,
} from 'react-native';

import Timeline from 'react-native-timeline-flatlist';
import {TimeLineReply} from '../containers';

export class TimeLinesScreen extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.data = [
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor: '#009688',
        icon: require('../image/archery.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
      },
      {
        time: '10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: require('../image/badminton.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
      },
      {
        time: '12:00',
        title: 'Lunch',
        icon: require('../image/lunch.png'),
      },
      {
        time: '14:00',
        title: 'Watch Soccer',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor: '#009688',
        icon: require('../image/soccer.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg',
      },
      {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        icon: require('../image/dumbbell.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
      },
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor: '#009688',
        icon: require('../image/archery.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
      },
      {
        time: '10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: require('../image/badminton.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
      },
      {
        time: '12:00',
        title: 'Lunch',
        icon: require('../image/lunch.png'),
      },
      {
        time: '14:00',
        title: 'Watch Soccer',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor: '#009688',
        icon: require('../image/soccer.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg',
      },
      {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        icon: require('../image/dumbbell.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
      },
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor: '#009688',
        icon: require('../image/archery.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
      },
      {
        time: '10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: require('../image/badminton.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
      },
      {
        time: '12:00',
        title: 'Lunch',
        icon: require('../image/lunch.png'),
      },
      {
        time: '14:00',
        title: 'Watch Soccer',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor: '#009688',
        icon: require('../image/soccer.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg',
      },
      {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        icon: require('../image/dumbbell.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
      },
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor: '#009688',
        icon: require('../image/archery.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
      },
      {
        time: '10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: require('../image/badminton.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
      },
      {
        time: '12:00',
        title: 'Lunch',
        icon: require('../image/lunch.png'),
      },
      {
        time: '14:00',
        title: 'Watch Soccer',
        description:
          'Team sport played between two teams of eleven players with a spherical ball. ',
        lineColor: '#009688',
        icon: require('../image/soccer.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg',
      },
      {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)',
        icon: require('../image/dumbbell.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
      },
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
        lineColor: '#009688',
        icon: require('../image/archery.png'),
        imageUrl:
          'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg',
      },
    ];
    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
      selected: null,
    };
  }

  onRefresh() {
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false,
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
      this.setState({waiting: true});

      //fetch and concat data
      setTimeout(() => {
        //refresh to initial data
        var data = this.state.data.concat([
          {
            time: '16:30',
            title: 'Go to Fitness center',
            description:
              'Look out for the Best Gym & Fitness Centers around me :)',
            icon: require('../image/dumbbell.png'),
            imageUrl:
              'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
          },
          {
            time: '16:30',
            title: 'Go to Fitness center',
            description:
              'Look out for the Best Gym & Fitness Centers around me :)',
            icon: require('../image/dumbbell.png'),
            imageUrl:
              'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
          },
          {
            time: '16:30',
            title: 'Go to Fitness center',
            description:
              'Look out for the Best Gym & Fitness Centers around me :)',
            icon: require('../image/dumbbell.png'),
            imageUrl:
              'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
          },
          {
            time: '16:30',
            title: 'Go to Fitness center',
            description:
              'Look out for the Best Gym & Fitness Centers around me :)',
            icon: require('../image/dumbbell.png'),
            imageUrl:
              'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg',
          },
        ]);

        this.setState({
          waiting: false,
          data: data,
        });
      }, 1000);
    }
  }

  renderFooter() {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    } else {
      return <Text>~</Text>;
    }
  }

  onEventPress(data) {
    this.setState({selected: data});
  }

  renderSelected() {
    if (this.state.selected)
      return (
        <>
          <Text style={[styles.title]}>{this.state.selected.title}</Text>
          <View style={styles.descriptionContainer}>
            <Image
              source={{uri: this.state.selected.imageUrl}}
              style={styles.image}
            />
            <Text style={[styles.textDescription]}>
              {this.state.selected.description}
            </Text>
          </View>
          <View style={{height: 140}}>
            <TimeLineReply />
          </View>
        </>
      );
  }
  renderWriteForm() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Wirte New Timeline"
            style={{height: 40, borderColor: 'gray', borderWidth: 1, flex: 1}}
          />
          <Button title="작성" />
        </View>
      </View>
    );
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{uri: rowData.imageUrl}} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{flex: 1}}>
        {title}
        {desc}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderWriteForm()}
        {this.renderSelected()}
        <Timeline
          style={styles.list}
          data={this.state.data}
          circleSize={20}
          circleColor="rgba(0,0,0,0)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{minWidth: 52, marginTop: -5}}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          showTime={false}
          iconStyle={{marginTop: 20}}
          descriptionStyle={{color: 'gray'}}
          options={{
            style: {paddingTop: 5},
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached,
          }}
          innerCircle={'icon'}
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // paddingTop: 65,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});
