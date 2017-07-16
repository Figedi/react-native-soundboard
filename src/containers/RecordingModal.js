import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View, Button, ImageBackground } from 'react-native';

import { record as recordActions, library as libraryActions } from '../actions';
import {
  selectCurrentProgress,
  selectCurrentRecordState,
  selectCurrentRecordPath,
  selectCurrentRecordImage,
} from '../selectors';
import { RECORD_STATES } from '../constants';
import { CameraView, RecordView } from '../components';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  microphoneWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    recordPressIn: PropTypes.func.isRequired,
    recordPressOut: PropTypes.func.isRequired,
    libraryMoveImage: PropTypes.func.isRequired,
    recordImage: PropTypes.func.isRequired,
    recordReset: PropTypes.func.isRequired,
    libraryRemoveRecord: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
    soundFilePath: PropTypes.string.isRequired,
    imageFilePath: PropTypes.string.isRequired,
    state: PropTypes.string,
  };

  static defaultProps = {
    state: RECORD_STATES.FINISHED,
  };

  state = {
    shouldDisplayCamera: false,
  };

  componentWillReceiveProps({ state: newState }) {
    const oldState = this.props.state;
    if (oldState === RECORD_STATES.PROGRESS && newState === RECORD_STATES.FINISHED) {
      Alert.alert('Take picture?', 'Do you want to take a picture for this dank sound?', [
        { text: 'Sure!', onPress: this.enableCamera },
        { text: 'Hell nah' },
      ]);
    }
  }

  enableCamera = () => {
    this.setState({ shouldDisplayCamera: true });
  };

  /**
   *
   * @todo updating the store for recordImage is async?.... we should probably put this in a saga
   */
  handleImage = (error, returnData) => {
    if (error) {
      console.error('Error while taking image..', error);
      return this.hideCamera();
    }
    this.props.recordImage(returnData.path);
    this.props.libraryMoveImage();
    return this.hideCamera();
  };

  handleImageCancel = () => {
    console.info('Image taking cancelled');
    return this.hideCamera();
  };

  hideCamera() {
    return this.setState({ shouldDisplayCamera: false });
  }

  // reset or not
  handleHide(remove = false) {
    const { soundFilePath, libraryRemoveRecord, recordReset, onHide } = this.props;
    if (remove) {
      libraryRemoveRecord(soundFilePath);
    }
    recordReset();
    onHide();
  }

  // when there is a recorded audio AND it's state is finished, then we can take pictures
  hasSoundFile() {
    return this.props.state === RECORD_STATES.FINISHED && this.props.progress > 0;
  }

  renderButtonRow() {
    return (
      <View style={styles.buttonRow}>
        <Button onPress={() => this.handleHide(true)} title="Cancel" />
        {this.hasSoundFile() && <Button onPress={this.enableCamera} title="Retake picture" />}
        <Button onPress={() => this.handleHide(false)} title="Save" />
      </View>
    );
  }

  render() {
    const { progress, recordPressIn, recordPressOut, imageFilePath } = this.props;
    if (this.state.shouldDisplayCamera) {
      return <CameraView onCancel={this.handleImageCancel} onImage={this.handleImage} />;
    }
    let BackgroundComponent = View;
    let componentAttrs = { style: styles.container };
    if (imageFilePath && imageFilePath.length) {
      BackgroundComponent = ImageBackground;
      componentAttrs = { style: [styles.container, styles.imageContainer], source: { uri: imageFilePath } };
    }
    return (
      <BackgroundComponent {...componentAttrs}>
        <RecordView onStart={recordPressIn} onStop={recordPressOut} progress={progress} />
        {this.renderButtonRow()}
      </BackgroundComponent>
    );
  }
}

const mapStateToProps = state => ({
  progress: selectCurrentProgress(state),
  state: selectCurrentRecordState(state),
  soundFilePath: selectCurrentRecordPath(state),
  imageFilePath: selectCurrentRecordImage(state),
});

const mapDispatchToProps = { ...libraryActions, ...recordActions };

export default connect(mapStateToProps, mapDispatchToProps)(RecordingModal);
