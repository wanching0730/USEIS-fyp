import React from 'react';
import {Faq} from './components/Faq'; 
import { shallow } from 'enzyme';
import "./test/helpers"

describe('Faq Component', () => {
    it('renders the Faq wrapper', () => {
      const wrapper = shallow(
        <Faq />);
      expect(wrapper.find('li')).to.have.length(22);
  });
});

