import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  checkHrefAndOnClick,
  getSecureRelForTarget,
} from '../../services';

import {
  ICON_TYPES,
  EuiIcon,
} from '../icon';

const colorToClassNameMap = {
  primary: 'euiButton--primary',
  secondary: 'euiButton--secondary',
  warning: 'euiButton--warning',
  danger: 'euiButton--danger',
  ghost: 'euiButton--ghost',
};

export const COLORS = Object.keys(colorToClassNameMap);

const sizeToClassNameMap = {
  s: 'euiButton--small',
  l: 'euiButton--large',
};

export const SIZES = Object.keys(sizeToClassNameMap);

const iconSideToClassNameMap = {
  left: null,
  right: 'euiButton--iconRight',
};

export const ICON_SIDES = Object.keys(iconSideToClassNameMap);

export const EuiButton = ({
  children,
  className,
  iconType,
  iconSide,
  color,
  size,
  fill,
  isDisabled,
  href,
  target,
  rel,
  onClick,
  type,
  ...rest
}) => {

  const classes = classNames(
    'euiButton',
    colorToClassNameMap[color],
    sizeToClassNameMap[size],
    iconSideToClassNameMap[iconSide],
    className,
    {
      'euiButton--fill': fill,
    },
  );

  // Add an icon to the button if one exists.
  let buttonIcon;

  if (iconType) {
    buttonIcon = (
      <EuiIcon
        className="euiButton__icon"
        type={iconType}
        size="m"
        aria-hidden="true"
      />
    );
  }

  if (href) {
    const secureRel = getSecureRelForTarget(target, rel);

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={secureRel}
        {...rest}
      >
        <span className="euiButton__content">
          {buttonIcon}
          <span>{children}</span>
        </span>
      </a>
    );
  } else {
    return (
      <button
        disabled={isDisabled}
        className={classes}
        onClick={onClick}
        type={type}
        {...rest}
      >
        <span className="euiButton__content">
          {buttonIcon}
          <span>{children}</span>
        </span>
      </button>
    );
  }
};

EuiButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * See EuiIcon
   */
  iconType: PropTypes.oneOf(ICON_TYPES),
  iconSide: PropTypes.oneOf(ICON_SIDES),

  /**
   * Add more focus to an action
   */
  fill: PropTypes.bool,

  /**
   * Define the color of the button
   */
  color: PropTypes.oneOf(COLORS),
  size: PropTypes.oneOf(SIZES),
  isDisabled: PropTypes.bool,
  href: checkHrefAndOnClick,
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,

  /**
   * Standard HTML attribute
   */
  type: PropTypes.string,
};

EuiButton.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary',
  fill: false,
};
