import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import * as mapDispatchToProps from '../actions'
import SoundItem from '../components/SoundItem';

class SoundView extends Component {

  static propTypes = {
    sounds: PropTypes.array.isRequired,
  }

  renderSounds() {
    return this.props.sounds.map((sound) => {
      let isPlaying = this.props.playing && this.props.current.name === sound.name;
      let onPress = () => this.props.beginPlaySong(sound.name, sound.file);
      return (
        <SoundItem
          key={sound.name}
          file={sound.file}
          uri={sound.uri}
          isPlaying={isPlaying}
          onPress={onPress}
        />
      )
    })
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={[styles.wrapper, { width, height: height - 50 }]}>
        <View style={[styles.innerWrapper, { width, height: height - 50 }]}>
          {this.renderSounds()}
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})

function mapStateToProps(state) {
  return {
    ...state.sound,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundView);
