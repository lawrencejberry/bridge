import React from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';

import HeaderWrapper from './HeaderWrapper'
import HeaderStyles from './HeaderWrapper'

import sendRequest from '../sendRequest'

class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    headerStyle: HeaderStyles.viewStyle,
    headerTitleStyle: HeaderStyles.textStyle
  }

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.screenProps.userData,
      extendedUserData: {first_name: '', last_name: '', user_category: null, university_age_category: '', matriculation_year: '', subject: ''},
      password: {oldPassword: "", newPassword: "", confirmPassword: ""},
      warningMessage: "Tap Submit to confirm",
      isWarning: false
    };
  }

  componentWillMount() {
    this.props.navigation.addListener('willFocus', (playload) => {
      this.setState({...this.state,
        password: {oldPassword: "", newPassword: "", confirmPassword: ""},
        warningMessage: "Tap Submit to confirm",
        isWarning: false
      });
    });

    sendRequest({
      address: 'users/me/',
      method: 'GET',
      authorizationToken: this.state.user.token,
      successHandler: (result) => {
        if (result.matriculation_year !== null && result.matriculation_year !== undefined) {
          result.matriculation_year = result.matriculation_year.toString();
        }

        this.setState({...this.state, extendedUserData: result})
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F18B35' }}>
        <ScrollView>
          <View style={styles.viewStyle}>

            <View style={styles.titleViewStyle}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Account info</Text>
            </View>

            <View style={styles.textViewStyle}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Email: </Text>
              <Text style={{fontSize: 14}}>{this.state.user.email}</Text>
            </View>

            {this.generateExtendedUserDataComponents()}

            <View style={{...styles.titleViewStyle, marginTop: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Password</Text>
            </View>

            <View style={styles.textViewStyle}>
              <TextInput
                style={{flex: 1}}
                onChangeText={(text) => this.setState({
                  user: this.state.user,
                  password: {...this.state.password, oldPassword: text}
                })}
                value={this.state.password.oldPassword}
                placeholder="Old password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.textViewStyle}>
              <TextInput
                style={{flex: 1}}
                onChangeText={(text) => this.setState({
                  user: this.state.user,
                  password: {...this.state.password, newPassword: text}
                })}
                value={this.state.password.newPassword}
                placeholder="New password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.textViewStyle}>
              <TextInput
                style={{flex: 1}}
                onChangeText={(text) => this.setState({
                  user: this.state.user,
                  password: {...this.state.password, confirmPassword: text}
                })}
                value={this.state.password.confirmPassword}
                placeholder="Confirm password"
                secureTextEntry={true}
              />
            </View>

            <View style={styles.infoTextViewStyle}>
              <Text style={{fontSize: 12, fontWeight: 'bold',
                            color: this.state.isWarning ? '#d55' : '#888'}}>{this.state.warningMessage}</Text>
            </View>

            <TouchableOpacity style={{...styles.buttonStyle, backgroundColor: '#5555ff'}}
              onPress={() => this.submitNewAccountInfo()} >
              <Text style={{fontSize: 14, color: '#fff'}}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.buttonStyle, backgroundColor: '#ff5555'}}
              onPress={() => this.logOut()} >
              <Text style={{fontSize: 14, color: '#fff'}}>Logout</Text>
            </TouchableOpacity>
          </View>

          <Text style={{color: '#fff', textAlign: 'center'}}>
            Society category icons
          </Text>
          <Text style={{color: '#fff', textAlign: 'center', marginBottom: 12}}>
            designed by Freepik from Flaticon
          </Text>
        </ScrollView>
      </View>
    );
  }

  generateExtendedUserDataComponents() {
    return (
      <View>
        <View style={styles.textViewStyle}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Name: </Text>
          <Text style={{fontSize: 14}}>
            {this.state.extendedUserData.first_name + ' ' + this.state.extendedUserData.last_name}
          </Text>
        </View>

        <View style={styles.textViewStyle}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>College: </Text>
          <Text style={{fontSize: 14}}>
            {this.state.extendedUserData.user_category !== null ? this.state.extendedUserData.user_category.name : null}
          </Text>
        </View>

        {this.state.extendedUserData.university_age_category !== null && this.state.extendedUserData.university_age_category !== undefined
         ?  <View style={styles.textViewStyle}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Academic level: </Text>
              <Text style={{fontSize: 14}}>
                {this.state.extendedUserData.university_age_category}
              </Text>
            </View>
         : null}

        {this.state.extendedUserData.matriculation_year !== null && this.state.extendedUserData.matriculation_year !== undefined
         ?  <View style={styles.textViewStyle}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Matriculation year: </Text>
              <Text style={{fontSize: 14}}>
                {this.state.extendedUserData.matriculation_year}
              </Text>
            </View>
         : null}

        {this.state.extendedUserData.subject !== null && this.state.extendedUserData.subject !== undefined
         ?  <View style={styles.textViewStyle}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Subject: </Text>
              <Text style={{fontSize: 14}}>
                {this.state.extendedUserData.subject}
              </Text>
            </View>
         : null}
      </View>
    );
  }

  submitNewAccountInfo() {
    if (this.state.password.oldPassword.length <= 0) {
      this.setState({...this.state, warningMessage: "Must enter your old password", isWarning: true});
      return;
    }
    else if (this.state.password.newPassword.length <= 0 || this.state.password.confirmPassword.length <= 0) {
      this.setState({...this.state, warningMessage: "Must enter a new password", isWarning: true});
      return;
    }
    else if (this.state.password.newPassword !== this.state.password.confirmPassword) {
      this.setState({...this.state, warningMessage: 'The "new" and "confirm" password fields must match', isWarning: true});
      return;
    }

    sendRequest({
      address: "password/",
      method: "POST",
      authorizationToken: this.state.user.token,
      body: {current_password: this.state.password.oldPassword, new_password: this.state.password.newPassword},
      responseHandlerNoJson: (response) => {
        if (response.status < 400) {
          this.setState({...this.state, warningMessage: "Password changed successfully", isWarning: false});
        }
        else {
          this.setState({...this.state, warningMessage: "Incorrect old password, or new password too weak", isWarning: true});
        }
      },
      errorHandler: (error) => {
        this.setState({...this.state, warningMessage: "There was an error processing your request", isWarning: true});
        console.log("There was an error...");
        console.log(error);
      }
    });
  }

  logOut() {
    AsyncStorage.removeItem('@Bridge:user_data');
    this.props.screenProps.logout();
  }

}

const styles = {
  viewStyle: {
    backgroundColor: '#fff',

    borderRadius: 6,

    margin: 10,
    padding: 15
  },
  textViewStyle: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleViewStyle: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoTextViewStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  }
}

const SettingsScreenWrapper = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    initialRouteName: 'Settings'
  }
);

export default SettingsScreenWrapper;
