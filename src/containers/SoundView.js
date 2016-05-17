import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { find } from 'lodash';
import autobind from 'autobind-decorator';

import { eachChunks } from '../common/utils';
import * as mapDispatchToProps from '../actions'
import { SoundItem } from '../components';

const SOUND_MAX = 15;

class SoundView extends Component {

  static propTypes = {
    beginPlayLong: PropTypes.func,
    beginPlaySong: PropTypes.func,
    current: PropTypes.array,
    playing: PropTypes.bool.isRequired,
    setView: PropTypes.func,
    sounds: PropTypes.array.isRequired,
    view: PropTypes.string.isRequired,
    views: PropTypes.object.isRequired,
  }

  @autobind
  _onMomentumScrollEnd(e, state) {
    this.props.setView(this.props.view, state.index);
  }

  renderViewSwiped() {
    let sounds = this.props.sounds

    let out = [];
    eachChunks(SOUND_MAX, sounds, (bunch) => {
      out.push(this.renderView(bunch));
    });
    let index = this.props.views[this.props.view].index;
    return (
      <Swiper
        index={index}
        loop={false}
        showsButtons
        paginationStyle={styles.pagination}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      >
        {out}
      </Swiper>
    );
  }


  renderSounds(sounds) {
    return sounds.map((sound) => {
      let soundState = find(this.props.current, { name: sound.name });
      let isPlaying = soundState && soundState.playing;
      let onPress = () => this.props.beginPlaySong(sound.name, sound.file);
      let onLongPress = () => this.props.beginPlayLong(sound.name, sound.file);
      return (
        <SoundItem
          key={sound.name}
          file={sound.file}
          uri={sound.uri}
          isPlaying={isPlaying}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      )
    })
  }

  renderView(sounds = this.props.sounds, i = 0) {
    if (sounds.length > SOUND_MAX) {
      return this.renderViewSwiped()
    } else {
      const { width, height } = Dimensions.get('window');
      return (
          <View
            key={i}
            style={[styles.wrapper, { width, height: height - 50 }]}
          >
            <View style={[styles.innerWrapper, { width, height: height - 50 }]}>
              {this.renderSounds(sounds)}
            </View>
          </View>
      );
    }
  }

  render() {
    return this.renderView();
  }
}

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 30,
    position: 'relative',
    flex: 0,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrapper: {
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})

function mapStateToProps(state) {
  return {
    views: state.view.views,
    ...state.sound,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundView);
