import React from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableHighlight, BackHandler, } from 'react-native';

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
    fullscreenImageId: null,
  };

  componentWillMount() {
    this.subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const { fullscreenImageId } = this.state;

        if (fullscreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }

        return false;
      },
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }


  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null});
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return null;

    const image = messages.find(message => message.id === fullscreenImageId);

    if (!image) return null;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  handlePressMessage = ({id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete Message?',
          'Are you sure you want to parmanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                const{ message } =this.state;
                this.setState({messages: messages.filter(message => message.id !==id)
                });
              },
            },
          ],
        );
        break;
        case 'image':
        this.setState({ fullscreenImageId: id});
        break;
        default:
        break;
    }
  };


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
      <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
        {this.renderFullscreenImage()}
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
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
    },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
