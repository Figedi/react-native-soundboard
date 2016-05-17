import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SOUND_LIBRARY as SOUNDS, VIEW_LIBRARY as VIEWS } from '../constants';
import SoundView from './SoundView';

import * as mapDispatchToProps from '../actions'

class App extends Component {

  renderTabBarItems(viewKeys = Object.keys(VIEWS)) {
    return viewKeys.map((itemKey) => {
      let item = VIEWS[itemKey];
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
          <SoundView
            view={itemKey}
            sounds={SOUNDS[itemKey]}
          />
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
