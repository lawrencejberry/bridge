import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EventInfo from './EventInfo';
import EventInterestedBar from './EventInterestedBar';
import HeaderStyles from './HeaderWrapper';

class EventDetailsScreen extends Component {
  static navigationOptions = {
    headerRight: (
      <Icon name='share' size={26} color='#fff' style={{marginRight: 14}} />
    ),
    headerStyle: {...HeaderStyles.viewStyle, shadowOpacity: 0},
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);
    this.refreshed = false;
  }

  componentWillMount() {
    this.setState({event: this.props.navigation.getParam('event')});
  }

  render() {
    var user = this.props.navigation.getParam('user');

    if (user !== null && user !== undefined && this.refreshed == false) {
      this.refreshEvent(user);
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#F18B35' }}>
        <ScrollView>
          <EventInfo
            title={this.state.event.title}
            host={this.state.event.hosts[0]}
            start_time={this.state.event.start_time}
            location={this.state.event.location}
            description={this.state.event.description} />
        </ScrollView>
        <EventInterestedBar onPress={this.buttonPressed} isInterested={true} />
      </View>
    );
  }

  refreshEvent(user) {
    fetch("http://localhost:8000/events/" + this.state.event.id + "/", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": ("Token " + user.token)
        }
    }).then(res => res.status === 400 || res.status === 404 ? null : res.json())
      .then(
        (result) => {
          console.log("Got result:");
          console.log(result);

          if (result === null || result === undefined) {
            // TODO: Tell user incorrect username/password
            console.log("Access denied");
            return;
          }

          this.setState({event: result});
          this.refreshed = true;
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("Got error:");
          console.log(error);

          // TODO: Handle error
        }
      )
  }

  buttonPressed() {

  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#F18B35',
    paddingTop: 25,
    paddingBottom: 10,
    elevation: 2,
    position: 'relative',
    borderBottomWidth: 0
  },
  textStyle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: 'arial'
  }
};

export default EventDetailsScreen;