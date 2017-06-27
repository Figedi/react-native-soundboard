import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { find, chunk } from 'lodash';

import * as mapDispatchToProps from '../actions';
import { SoundItem } from '../components';
import { VIEW_LIBRARY } from '../constants';
import { selectCurrentAsArray } from '../selectors';

const SOUND_MAX = 15;

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 30,
    position: 'relative',
    flex: 0,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.85)',
  },
  innerWrapper: {
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

class SoundView extends Component {
  static propTypes = {
    beginPlayLong: PropTypes.func.isRequired,
    beginPlaySong: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired,
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
    views: PropTypes.shape(
      Object.keys(VIEW_LIBRARY).reduce(
        (acc, view) => ({
          ...acc,
          [view]: PropTypes.shape({ index: PropTypes.number }),
        }),
        {},
      ),
    ).isRequired,
  };

  onMomentumScrollEnd = (e, state) => {
    this.props.setView(this.props.view, state.index);
  };

  renderViewSwiped() {
    const sounds = this.props.sounds;
    const index = (this.props.views && this.props.views[this.props.view].index) || 0;
    const { height } = Dimensions.get('window');
    const soundViews = chunk(sounds, SOUND_MAX).map(bunch => this.renderView(bunch));
    return (
      <Swiper
        index={index}
        loop={false}
        showsButtons
        paginationStyle={styles.pagination}
        height={height}
        dot={
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,.9)',
              width: 5,
              height: 5,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        style={[{ height: height - 50 }]}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
      >
        {soundViews}
      </Swiper>
    );
  }

  renderSounds(sounds) {
    return sounds.map((sound) => {
      const soundState = find(this.props.current, { name: sound.name });
      const isPlaying = !!(soundState && soundState.playing);
      const onPress = () => this.props.beginPlaySong(sound.name, sound.file);
      const onLongPress = () => this.props.beginPlayLong(sound.name, sound.file);
      return (
        <SoundItem
          key={sound.name}
          file={sound.file}
          uri={sound.uri}
          isPlaying={isPlaying}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      );
    });
  }

  renderView(sounds = this.props.sounds, i = 0) {
    if (sounds.length > SOUND_MAX) {
      return this.renderViewSwiped();
    }
    const { width, height } = Dimensions.get('window');
    return (
      <View key={i} style={[styles.wrapper, { width, height: height - 50 }]}>
        <View style={[styles.innerWrapper, { width, height: height - 50 }]}>
          {this.renderSounds(sounds)}
        </View>
      </View>
    );
  }

  render() {
    return this.renderView();
  }
}

function mapStateToProps(state) {
  return {
    views: state.view.views,
    playing: state.sound.playing,
    current: selectCurrentAsArray(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundView);
