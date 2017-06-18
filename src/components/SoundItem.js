import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
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
});

class SoundItem extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    // isPlaying: PropTypes.boolean,
    onLongPress: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isPlaying: false,
  };

  renderPlayPause() {
    // isPlaying ==> show pause coz we want to signal pause as next action
    const iconName = this.props.isPlaying ? 'pause' : 'play';
    return <Icon name={iconName} size={30} style={styles.icon} />;
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onLongPress={this.props.onLongPress} onPress={this.props.onPress}>
          <Image source={{ uri: this.props.uri }} style={styles.image}>
            {this.renderPlayPause()}
          </Image>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SoundItem;
