import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { VIEW_LIBRARY as VIEWS } from '../constants';
import { SoundLibrary } from '../services';
import SoundView from './SoundView';

import * as mapDispatchToProps from '../actions';

class App extends Component {
  static propTypes = {
    current: PropTypes.string,
    selectTab: PropTypes.func,
  };

  state = {
    library: {},
  };

  componentDidMount() {
    SoundLibrary.getLibrary().then((library) => {
      this.setState({
        library,
      });
    });
  }

  renderTabBarItems(viewKeys = Object.keys(VIEWS)) {
    return viewKeys.map((itemKey) => {
      const item = VIEWS[itemKey];
      const onPress = () => this.props.selectTab(item.name);
      return (
        <Icon.TabBarItemIOS
          key={item.name}
          iconName={item.icon}
          selected={this.props.current === item.name}
          selectedIconName={item.icon}
          title={item.title}
          onPress={onPress}
        >
          <SoundView view={itemKey} sounds={this.state.library[itemKey] || []} />
        </Icon.TabBarItemIOS>
      );
    });
  }

  render() {
    return (
      <TabBarIOS>
        {this.renderTabBarItems()}
      </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.view.current,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
