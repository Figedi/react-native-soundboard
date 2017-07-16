import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SoundCollection } from '../components';
import RecordingModal from './RecordingModal';
import { sound as soundActions, record as recordActions, library as libraryActions } from '../actions';
import { selectCurrentAsArray } from '../selectors';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class RecordView extends Component {
  static propTypes = {
    setView: PropTypes.func.isRequired,
    beginPlayLong: PropTypes.func.isRequired,
    beginPlaySong: PropTypes.func.isRequired,
    libraryRemoveAllRecords: PropTypes.func.isRequired,
    current: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ).isRequired,
    sounds: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        file: PropTypes.string,
        uri: PropTypes.string,
      }),
    ).isRequired,
    view: PropTypes.string.isRequired,
  };

  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  handleRemoveAll = () => {
    this.props.libraryRemoveAllRecords();
  };

  handleSwiped = (index) => {
    this.props.setView(this.props.view, index);
  };

  render() {
    const { sounds, current, beginPlayLong, beginPlaySong } = this.props;
    const { width, height } = Dimensions.get('window');

    return (
      <View style={[styles.wrapper, { width, height: height - 50 }]}>
        <Modal animationType={'slide'} transparent={false} visible={this.state.modalVisible}>
          <RecordingModal onHide={this.toggleModal} />
        </Modal>
        <SoundCollection
          sounds={sounds}
          max={14}
          current={current}
          onSwiped={this.handleSwiped}
          onBeginPlayLong={beginPlayLong}
          onBeginPlaySong={beginPlaySong}
        >
          {() =>
            (<ActionButton buttonColor="rgba(231,76,60,1)">
              <ActionButton.Item buttonColor="#9b59b6" title="Sound aufnehmen" onPress={this.toggleModal}>
                <Icon name="plus" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor="#3498db" title="Alle löschen" onPress={this.handleRemoveAll}>
                <Icon name="times" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>)}
        </SoundCollection>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: selectCurrentAsArray(state),
  };
}

const mapDispatchToProps = { ...libraryActions, ...recordActions, ...soundActions };

export default connect(mapStateToProps, mapDispatchToProps)(RecordView);
