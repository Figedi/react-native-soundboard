import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { findIndex } from 'lodash';

import { SoundCollection, SoundItem } from '../components';
import RecordingModal from './RecordingModal';
import { sound as soundActions, record as recordActions, library as libraryActions } from '../actions';
import { selectCurrentAsArray } from '../selectors';

// todo: move state to reducer (avoids flickering between setState and reducer logic)

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
  deleteIconStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, .8)',
    left: 40,
    top: 35,
    // todo
  },
  deleteBackgroundIconStyle: {
    opacity: 0.4,
    // todo
  },
  deleteContainerStyle: {},
});

class RecordView extends Component {
  static propTypes = {
    setView: PropTypes.func.isRequired,
    beginPlayLong: PropTypes.func.isRequired,
    beginPlaySong: PropTypes.func.isRequired,
    libraryRemoveAllRecords: PropTypes.func.isRequired,
    libraryRemoveRecords: PropTypes.func.isRequired,
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
    deleteMode: false,
    deleteRecords: [],
  };

  getExtraCollectionAttributes() {
    if (this.state.deleteMode) {
      return {
        renderSoundItem: ({ soundState, sound }) => {
          // boo O(n*m)
          const contained = findIndex(this.state.deleteRecords, record => record.name === sound.name) > -1;
          const icon = contained ? 'check' : 'times';
          return (
            <SoundItem
              key={sound.name}
              file={sound.file}
              uri={sound.uri}
              isPlaying={!!(soundState && soundState.playing)}
              onPress={() => this.handleMarkForDeletion(sound.name, sound.file)}
              onLongPress={() => this.handleMarkForDeletion(sound.name, sound.file)}
              renderIcon={() => <Icon name={icon} size={30} style={styles.deleteIconStyle} />}
              backgroundStyles={styles.deleteBackgroundIconStyle}
              containerStyles={styles.deleteContainerStyle}
            />
          );
        },
      };
    }
    return {
      onLongPress: this.props.beginPlayLong,
      onPress: this.props.beginPlaySong,
    };
  }

  handleMarkForDeletion(name, path) {
    const index = findIndex(this.state.deleteRecords, record => record.name === name);
    if (index > -1) {
      // already contained, remove it
      this.setState({
        deleteRecords: [...this.state.deleteRecords.slice(0, index), ...this.state.deleteRecords.slice(index + 1)],
      });
    } else {
      // not contained, add it
      this.setState({ deleteRecords: [...this.state.deleteRecords, { name, path }] });
    }
  }

  handleGetActionButton = () => {
    if (this.state.deleteMode) {
      return (
        <ActionButton buttonColor="rgba(231, 76, 60, 1.0)" icon={<Icon name="trash" style={styles.actionButtonIcon} />}>
          <ActionButton.Item buttonColor="#27ae60" title="Löschen übernehmen" onPress={this.handleRemoveConfirm}>
            <Icon name="check" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#c0392b" title="Löschen verwerfen" onPress={this.handleRemoveSingle}>
            <Icon name="times" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    }
    return (
      <ActionButton buttonColor="rgba(231, 76, 60, 1.0)">
        <ActionButton.Item buttonColor="#8e44ad" title="Sound aufnehmen" onPress={this.toggleModal}>
          <Icon name="plus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        {this.props.sounds.length >= 1 &&
          <ActionButton.Item buttonColor="#8C2A20" title="Alle löschen" onPress={this.handleRemoveAll}>
            <Icon name="ban" style={styles.actionButtonIcon} />
          </ActionButton.Item>}
        {this.props.sounds.length >= 1 &&
          <ActionButton.Item buttonColor="#c0392b" title="Einzelne löschen" onPress={this.handleRemoveSingle}>
            <Icon name="trash" style={styles.actionButtonIcon} />
          </ActionButton.Item>}
      </ActionButton>
    );
  };

  handleRemoveConfirm = () => {
    const records = this.state.deleteRecords.map(record => record.path);
    this.props.libraryRemoveRecords(records);
    this.setState({ deleteRecords: [], deleteMode: false });
  };

  handleRemoveAll = () => {
    Alert.alert('Alle löschen', 'Wirklich alle löschen?', [
      { text: 'Noo' },
      { text: 'Yep', onPress: this.props.libraryRemoveAllRecords },
    ]);
  };

  handleRemoveSingle = () => {
    this.setState({ deleteRecords: [], deleteMode: !this.state.deleteMode });
  };

  handleSwiped = (index) => {
    this.props.setView(this.props.view, index);
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  render() {
    const { sounds, current } = this.props;
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
          {...this.getExtraCollectionAttributes()}
        >
          {this.handleGetActionButton}
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
