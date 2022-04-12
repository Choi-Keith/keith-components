import { mount, render } from 'enzyme';
import Button from '@keith/button';
import React from 'react';

describe('Button', () => {
  it('renders correctly', () => {
    try {
      const html = render(<Button />);
      expect(html).toMatchSnapshot();
    } catch (error) {
      console.log(error);
    }
  });

  it('button size', () => {
    const wrapper1 = mount(<Button size="large">click me</Button>);
    expect(wrapper1.find('.btn-size-large').length).toBe(1);
    const wrapper2 = mount(<Button size="small">click me</Button>);
    expect(wrapper2.find('.btn-size-small').length).toBe(1);
    const wrapper3 = mount(<Button>click me</Button>);
    expect(wrapper3.find('.btn-size-middle').length).toBe(1);
  });
});
