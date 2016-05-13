import React, { Component, PropTypes } from 'react';

import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SoundItem extends Component {

  static propTypes = {
    file: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
  }

  constructor() {
    super();
  }

  renderPlayPause() {
    // isPlaying ==> show pause coz we want to signal pause as next action
    let iconName = this.props.isPlaying ? 'pause' : 'play';
    return (
      <Icon
        name={iconName}
        size={30}
        style={styles.icon}
      />
  );
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image
            source={{ uri: this.props.uri }}
            style={styles.image}
          >
          {this.renderPlayPause()}
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    width: 100,
    height: 100,
  },
  image: {
    borderColor: '#000',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'rgba(255,255,255,.8)',
    backgroundColor: 'transparent',
  },
})

export default SoundItem;
