import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import { VIEW_LIBRARY as VIEWS } from '../constants';
import SoundView from './SoundView';
import RecordView from './RecordView';

import { sound as mapDispatchToProps } from '../actions';
import { selectCurrentView, selectLibrary } from '../selectors';

const activeViews = {
  ...VIEWS,
  records: {
    icon: 'microphone',
    title: 'Record',
    name: 'records',
    Component: RecordView,
  },
};

class App extends Component {
  static propTypes = {
    current: PropTypes.string.isRequired,
    selectTab: PropTypes.func.isRequired,
    library: PropTypes.shape(
      Object.keys(activeViews).reduce((acc, viewName) => ({ ...acc, [viewName]: PropTypes.array }), {}),
    ).isRequired,
  };

  renderTabBarItems(views) {
    const { current, library, selectTab } = this.props;
    return Object.keys(views).map((itemKey) => {
      const item = views[itemKey];
      const onPress = () => selectTab(item.name);
      const ViewComponent = item.Component || SoundView;
      return (
        <Icon.TabBarItemIOS
          key={item.name}
          iconName={item.icon}
          selected={current === item.name}
          selectedIconName={item.icon}
          title={item.title}
          onPress={onPress}
        >
          <ViewComponent view={itemKey} sounds={library[itemKey] || []} />
        </Icon.TabBarItemIOS>
      );
    });
  }

  render() {
    return (
      <TabBarIOS>
        {this.renderTabBarItems(activeViews)}
      </TabBarIOS>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: selectCurrentView(state),
    library: selectLibrary(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
