import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { find, chunk, noop } from 'lodash';

import { SoundItem } from '../components';

const styles = StyleSheet.create({
  pagination: {
    marginBottom: 30,
    position: 'relative',
    flex: 0,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
  },
  innerWrapper: {
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f3f3f3',
  },
  swiperStyle: {
    backgroundColor: '#f3f3f3',
    width: 5,
    height: 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

class SoundCollection extends Component {
  static propTypes = {
    onSwiped: PropTypes.func.isRequired,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    renderSoundItem: PropTypes.func,
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
    max: PropTypes.number,
    children: PropTypes.func,
  };

  static defaultProps = {
    max: 15,
    children: noop,
    renderSoundItem: undefined,
    onPress: noop,
    onLongPress: noop,
  };

  onMomentumScrollEnd = (e, state) => {
    this.props.onSwiped(state.index);
  };

  renderViewSwiped() {
    const { sounds, max } = this.props;
    const index = 0;
    const { height } = Dimensions.get('window');
    const soundViews = chunk(sounds, max).map(bunch => this.renderView(bunch));
    return (
      <Swiper
        index={index}
        loop={false}
        showsButtons
        paginationStyle={styles.pagination}
        height={height}
        dot={<View style={styles.swiperStyle} />}
        style={[{ height: height - 50 }]}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
      >
        {soundViews}
      </Swiper>
    );
  }

  renderSounds(sounds) {
    const { current, renderSoundItem, onPress, onLongPress } = this.props;

    return sounds.map((sound) => {
      const soundState = find(current, { name: sound.name });
      if (renderSoundItem) {
        return renderSoundItem({ soundState, sound }, this.props);
      }
      return (
        <SoundItem
          key={sound.name}
          file={sound.file}
          uri={sound.uri}
          isPlaying={!!(soundState && soundState.playing)}
          onPress={() => onPress(sound.name, sound.file)}
          onLongPress={() => onLongPress(sound.name, sound.file)}
        />
      );
    });
  }

  renderView(sounds = this.props.sounds, i = 0) {
    const { children, max } = this.props;
    if (sounds.length > max) {
      return this.renderViewSwiped();
    }
    const { width, height } = Dimensions.get('window');
    return (
      <View key={i} style={[styles.wrapper, { width, height: height - 50 }]}>
        <View style={[styles.innerWrapper, { width, height: height - 50 }]}>
          {this.renderSounds(sounds)}
          {children()}
        </View>
      </View>
    );
  }

  render() {
    return this.renderView();
  }
}

export default SoundCollection;
