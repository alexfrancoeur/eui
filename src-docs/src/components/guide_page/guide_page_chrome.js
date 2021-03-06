import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

import {
  Link,
} from 'react-router';

import {
  EuiFieldSearch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiSideNav,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

import {
  GuideThemeSelector,
} from '../guide_theme_selector';

export class GuidePageChrome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  onSearchChange = event => {
    this.setState({
      search: event.target.value,
    });
  };

  scrollTo = position => {
    $('html, body').animate({
      scrollTop: position,
    }, 250);
  };

  onClickLink = id => {
    // Scroll to element.
    this.scrollTo($(`#${id}`).offset().top - 20);
  };

  renderIdentity() {
    const homeLink = (
      <Link
        to="/"
        className="guideLogo"
      >
        <EuiIcon type="logoElastic" size="l" />
      </Link>
    );

    return (
      <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
        <EuiFlexItem grow={false}>
          {homeLink}
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <GuideThemeSelector
            onToggleTheme={this.props.onToggleTheme}
            selectedTheme={this.props.selectedTheme}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }

  renderSubSections = (subSections = []) => {
    if (subSections.length <= 1) {
      return;
    }

    return subSections.map(({ title, id }) => ({
      id: `subSection-${id}`,
      name: title,
      onClick: this.onClickLink.bind(this, id),
    }));
  }

  renderGuidelineNavItems() {
    const matchingItems = this.props.guidelines.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const items = matchingItems.map(item => {
      const {
        name,
        path,
        sections,
      } = item;

      return {
        id: `guideline-${path}`,
        name,
        href: `#/${path}`,
        items: this.renderSubSections(sections),
        isSelected: name === this.props.currentRouteName,
      };
    });

    if (!items.length) {
      return;
    }

    return {
      name: 'Guidelines',
      id: 'guidelines',
      items,
    };
  }

  renderServiceNavItems() {
    const matchingItems = this.props.services.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const items = matchingItems.map(item => {
      const {
        name,
        path,
        sections,
      } = item;

      return {
        id: `service-${path}`,
        name,
        href: `#/${path}`,
        items: this.renderSubSections(sections),
        isSelected: name === this.props.currentRouteName,
      };
    });

    if (!items.length) {
      return;
    }

    return {
      name: 'Services',
      id: 'services',
      items,
    };
  }

  renderComponentNavItems() {
    const matchingItems = this.props.components.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const items = matchingItems.map(item => {
      const {
        name,
        path,
        sections,
      } = item;

      return {
        id: `component-${path}`,
        name,
        href: `#/${path}`,
        items: this.renderSubSections(sections),
        isSelected: name === this.props.currentRouteName,
      };
    });

    if (!items.length) {
      return;
    }

    return {
      name: 'Components',
      id: 'components',
      items,
    };
  }

  rendePatternNavItems() {
    const matchingItems = this.props.patterns.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const items = matchingItems.map(item => {
      const {
        name,
        path,
        sections,
      } = item;

      return {
        id: `pattern-${path}`,
        name,
        href: `#/${path}`,
        items: this.renderSubSections(sections),
        isSelected: name === this.props.currentRouteName,
      };
    });

    if (!items.length) {
      return;
    }

    return {
      name: 'Patterns',
      id: 'patterns',
      items,
    };
  }

  renderSandboxNavItems() {
    const matchingItems = this.props.sandboxes.filter(item => (
      item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const items = matchingItems.map(item => {
      const {
        name,
        path,
      } = item;

      return {
        id: `sandbox-${path}`,
        name,
        href: `#/${path}`,
        isSelected: name === this.props.currentRouteName,
      };
    });

    if (!items.length) {
      return;
    }

    return {
      name: 'Sandboxes',
      id: 'sandboxes',
      items,
    };
  }

  render() {
    const sideNav = [
      this.renderGuidelineNavItems(),
      this.renderServiceNavItems(),
      this.renderComponentNavItems(),
      this.rendePatternNavItems(),
      this.renderSandboxNavItems(),
    ].filter(section => section);

    let sideNavContent;

    if (sideNav.length) {
      sideNavContent = (
        <EuiSideNav
          mobileTitle="Navigate components"
          toggleOpenOnMobile={this.toggleOpenOnMobile}
          isOpenOnMobile={this.state.isSideNavOpenOnMobile}
          items={sideNav}
        />
      );
    } else {
      sideNavContent = (
        <EuiText color="subdued" size="s">
          <p>No matches</p>
        </EuiText>
      );
    }

    return (
      <div>
        {this.renderIdentity()}

        <EuiSpacer size="m" />

        <EuiFieldSearch
          placeholder="Search..."
          value={this.state.search}
          onChange={this.onSearchChange}
        />

        <EuiSpacer size="m" />

        {sideNavContent}
      </div>
    );
  }
}

GuidePageChrome.propTypes = {
  currentRouteName: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  guidelines: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  patterns: PropTypes.array.isRequired,
  sandboxes: PropTypes.array.isRequired,
};
