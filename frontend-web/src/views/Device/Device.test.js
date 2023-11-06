import React from 'react';
import ReactDOM from 'react-dom';
import Device from './Device';
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Device />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  shallow(<Device />);
});
