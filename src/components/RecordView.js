import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  microphoneWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecordView = ({ progress, onStart, onStop }) =>
  (<View style={styles.microphoneWrapper}>
    <TouchableWithoutFeedback onPressIn={onStart} onPressOut={onStop}>
      <View>
        <ProgressCircle
          percent={progress}
          radius={50}
          borderWidth={4}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
        >
          <Icon name="microphone" size={35} color="#5f5f5f" />
        </ProgressCircle>
      </View>
    </TouchableWithoutFeedback>
  </View>);

RecordView.propTypes = {
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
};

export default RecordView;
