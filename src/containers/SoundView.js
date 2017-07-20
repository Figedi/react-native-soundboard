import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sound as mapDispatchToProps } from '../actions';
import { SoundCollection } from '../components';
import { selectCurrentAsArray } from '../selectors';

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
  };

  handleSwiped = (index) => {
    this.props.setView(this.props.view, index);
  };

  render() {
    const { sounds, current, beginPlayLong, beginPlaySong } = this.props;

    return (
      <SoundCollection
        sounds={sounds}
        max={15}
        current={current}
        onSwiped={this.handleSwiped}
        onLongPress={beginPlayLong}
        onPress={beginPlaySong}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    current: selectCurrentAsArray(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundView);
