import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ManageParticipant from './ManageParticipant'; 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('ManageParticipant Component', () => {
  it('renders the ManageParticipant wrapper', () => {
    const wrapper = shallow(<ManageParticipant />);
    expect(wrapper.find('table')).to.have.length(1);
  });

  // it('passes all props to Counter wrapper', () => {
  //   const wrapper = shallow(<App />);
  //   let counterWrapper = wrapper.find(Counter);

  //   expect(counterWrapper.props().counter).to.equal(0);

  //   wrapper.setState({ counter: -1 });

  //   counterWrapper = wrapper.find(Counter);
  //   expect(counterWrapper.props().counter).to.equal(-1);
  // });
});
