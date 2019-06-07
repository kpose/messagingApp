import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Status from './components/Status'
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';

export default class App extends React.Component {
  state = {
    messages: [
      createImageMessage('http://unsplash.it/300/300'),
      createTextMessage('Kpose'),
      createTextMessage('lorem ispium'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
  };

  handlePressMessage = () => {}


  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style = {styles.content}>
        <MessageList messages ={messages} onPress={this.handlePressMessage} />
      </View>
    );
  }

  renderInputMethodEditor() {
    return (
      <View style = {styles.inputMethodEditor}></View>
    );
  }

  renderToolbar() {
    return(
      <View style = {styles.toolbar}></View>
    );
  }

  render() {
    return(
      <View style = {styles.container}>
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content : {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor : 'white',
  },
});
