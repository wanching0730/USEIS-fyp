import React from 'react';
import {Faq} from './components/Faq'; 
import { shallow } from 'enzyme';
import "./test/helpers"

// to test whether there are 24 items in Faq component
describe('Faq Component', () => {
    it('renders the Faq wrapper', () => {
      const wrapper = shallow(
        <Faq />);
      expect(wrapper.find('li')).to.have.length(24);
  });
});

