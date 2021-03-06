/* eslint-disable no-undef */
import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import DropdownMenu from '../src/DropdownMenu';
import { Item as MenuItem, ItemGroup as MenuItemGroup } from 'rc-menu';

describe('DropdownMenu', () => {
  it('renders correctly', () => {
    const menuItems = [
      <MenuItemGroup key="group1">
        <MenuItem key="1">1</MenuItem>
      </MenuItemGroup>,
      <MenuItemGroup key="group2">
        <MenuItem key="2">2</MenuItem>
      </MenuItemGroup>,
    ];

    const wrapper = render(
      <DropdownMenu
        menuItems={menuItems}
        value={[{ key: '1' }]}
      />
    );

    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('save first active item', () => {
    const menuItems = [
      <MenuItem key="1">1</MenuItem>,
      <MenuItem key="2">2</MenuItem>,
    ];

    const wrapper = mount(
      <DropdownMenu
        menuItems={menuItems}
        value={[{ key: '1' }]}
      />
    );

    expect(wrapper.instance().firstActiveItem.props.children).toBe('1');
  });

  it('set active key to menu', () => {
    const menuItems = [
      <MenuItem key="1">1</MenuItem>,
      <MenuItem key="2">2</MenuItem>,
    ];

    const wrapper = mount(
      <DropdownMenu
        menuItems={menuItems}
        value={[{ key: '1' }]}
      />
    );

    wrapper.setProps({ visible: true });
    expect(wrapper.find('Menu').props().activeKey).toBe('1');

    wrapper.setProps({ inputValue: 'foo' });
    expect(wrapper.find('Menu').props().activeKey).toBe('');
  });

  it('save visible and inputValue when update', () => {
    const wrapper = mount(
      <DropdownMenu />
    );

    wrapper.setProps({ visible: true, inputValue: 'foo' });

    expect(wrapper.instance().lastVisible).toBe(true);
    expect(wrapper.instance().lastInputValue).toBe('foo');
  });

  it('not update when next visible is false', () => {
    const wrapper = mount(
      <DropdownMenu />
    );

    expect(wrapper.instance().shouldComponentUpdate({ visible: true })).toBe(true);
    expect(wrapper.instance().shouldComponentUpdate({ visible: false })).toBe(false);
  });
});
