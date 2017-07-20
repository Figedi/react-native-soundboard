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
    renderIcon: PropTypes.func,
  };

  static defaultProps = {
    isPlaying: false,
    backgroundStyles: null,
    uri: undefined,
    renderIcon: undefined,
  };

  renderPlayPause(iconStyle) {
    const { isPlaying, renderIcon } = this.props;
    if (renderIcon) {
      return renderIcon(this.props);
    }
    // isPlaying ==> show pause coz we want to signal pause as next action
    const iconName = isPlaying ? 'pause' : 'play';
    return <Icon name={iconName} size={30} style={iconStyle} />;
  }

  renderImage() {
    const { uri, backgroundStyles } = this.props;
    if (uri) {
      return (
        <View>
          <Image source={{ uri }} style={[styles.image, backgroundStyles]} />
          {this.renderPlayPause(styles.fgIcon)}
        </View>
      );
    }
    return (
      <View>
        <Icon name="user-secret" size={50} style={[styles.bgIcon, backgroundStyles]} />
        {this.renderPlayPause(styles.fgIcon)}
      </View>
    );
  }

  render() {
    const { onLongPress, onPress, containerStyles } = this.props;
    return (
      <View style={[styles.itemContainer, containerStyles]}>
        <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
          {this.renderImage()}
        </TouchableOpacity>
      </View>
    );
  }
}

export default SoundItem;
