import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/EvilIcons';
import DeviceInfo from 'react-native-device-info';

import { Camera as CameraService } from '../services';

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  switch: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#000',
    marginBottom: 15,
  },
});

class RecordingModal extends Component {
  static propTypes = {
    onImage: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    displayFront: true,
  };

  handleTakePicture = () => {
    CameraService.takePicture(this.camera, { metadata: {} })
      .then((returnData) => {
        this.props.onImage(null, returnData);
      })
      .catch(err => this.props.onImage(err));
  };

  handleSwitchCamera = () => {
    this.setState({ displayFront: !this.state.displayFront });
  };

  render() {
    let CameraComponent = Camera;
    if (DeviceInfo.isEmulator()) {
      CameraComponent = View;
    }

    const cameraDirection = this.state.displayFront ? Camera.constants.Type.front : Camera.constants.Type.back;
    return (
      <View style={styles.cameraContainer}>
        <CameraComponent
          ref={cam => (this.camera = cam)}
          type={cameraDirection}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.temp}
          aspect={Camera.constants.Aspect.fill}
        >
          <TouchableHighlight
            style={styles.capture}
            onPress={this.handleTakePicture}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.cancel}
            onPress={this.props.onCancel}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Icon name="close" size={40} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.switch}
            onPress={this.handleSwitchCamera}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <Icon name="refresh" size={45} />
          </TouchableHighlight>
        </CameraComponent>
      </View>
    );
  }
}

export default RecordingModal;
