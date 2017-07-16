import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button } from 'react-native';
import Camera from 'react-native-camera';
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
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

class RecordingModal extends Component {
  static propTypes = {
    onImage: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  handleTakePicture = () => {
    CameraService.takePicture(this.camera, { metadata: {} })
      .then((returnData) => {
        this.props.onImage(null, returnData);
      })
      .catch(err => this.props.onImage(err));
  };

  render() {
    let CameraComponent = Camera;
    if (DeviceInfo.isEmulator()) {
      CameraComponent = View;
    }
    return (
      <View style={styles.cameraContainer}>
        <CameraComponent
          ref={cam => (this.camera = cam)}
          type={Camera.constants.Type.front}
          style={styles.preview}
          captureTarget={Camera.constants.CaptureTarget.temp}
          aspect={Camera.constants.Aspect.fill}
        >
          <Button title="[CAPTURE]" style={styles.capture} onPress={this.handleTakePicture} />
          <Button title="[Abort]" style={styles.capture} onPress={this.props.onCancel} />
        </CameraComponent>
      </View>
    );
  }
}

export default RecordingModal;
