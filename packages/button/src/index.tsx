/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import type { FC } from 'react';
import classNames from 'classnames';

import './index.less';

export interface ButtonProps {
  size?: 'small' | 'middle' | 'large' | undefined;
  shape?: 'circle' | 'round';
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    size = 'middle',
    shape = 'round',
    type = 'default',
    className,
    onClick,
  } = props;

  const classes = classNames(
    {
      [`btn-shape-${shape}`]: shape, // Note: Shape also has `default`
      [`btn-type-${type}`]: type,
      [`btn-size-${size}`]: size,
    },
    className,
  );

  function spaceChildren(children: React.ReactNode) {
    let isPrevChildPure: boolean = false;
    const childList: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
      const type = typeof child;
      const isCurrentChildPure = type === 'string' || type === 'number';
      if (isPrevChildPure && isCurrentChildPure) {
        const lastIndex = childList.length - 1;
        const lastChild = childList[lastIndex];
        childList[lastIndex] = `${lastChild}${child}`;
      } else {
        childList.push(child);
      }

      isPrevChildPure = isCurrentChildPure;
    });

    // Pass to React.Children.map to auto fill key
    return React.Children.map(childList, (child) => insertSpace(child as React.ReactChild));
  }

  function insertSpace(child: React.ReactChild) {
    // Check the child if is undefined or null.
    if (child === null || children === undefined) {
      return;
    }
    if (isReactFragment(child)) {
      return <span>{child}</span>;
    }
    return child;
  }

  function isReactFragment(node: React.ReactNode) {
    return React.isValidElement(node) && node.type === React.Fragment;
  }

  const kids = children || children === 0 ? spaceChildren(children) : null;

  return (
    <button className={classes} onClick={onClick}>
      {kids}
    </button>
  );
};
export default Button;
