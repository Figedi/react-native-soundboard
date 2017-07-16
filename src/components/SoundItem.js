import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    width: 100,
    height: 100,
    backgroundColor: '#2f2f2f',
    borderRadius: 50,
  },
  image: {
    borderColor: '#000',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgIcon: {
    position: 'absolute',
    color: 'rgba(255, 255, 255,.8)',
    left: 30,
    top: 30,
  },
  fgIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .5)',
    left: 40,
    top: 35,
  },
});

class SoundItem extends Component {
  static propTypes = {
    uri: PropTypes.string,
    isPlaying: PropTypes.bool,
    onLongPress: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isPlaying: false,
    uri: undefined,
  };

  renderPlayPause(iconStyle = styles.icon) {
    // isPlaying ==> show pause coz we want to signal pause as next action
    const iconName = this.props.isPlaying ? 'pause' : 'play';
    return <Icon name={iconName} size={30} style={iconStyle} />;
  }

  renderImage() {
    if (this.props.uri) {
      return (
        <View>
          <Image source={{ uri: this.props.uri }} style={styles.image} />
          {this.renderPlayPause(styles.fgIcon)}
        </View>
      );
    }
    return (
      <View>
        <Icon name="user-secret" size={50} style={styles.bgIcon} />
        {this.renderPlayPause(styles.fgIcon)}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onLongPress={this.props.onLongPress} onPress={this.props.onPress}>
          {this.renderImage()}
        </TouchableOpacity>
      </View>
    );
  }
}

export default SoundItem;
