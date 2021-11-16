import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';

test('renders a non-empty component without crashing', () => {
	const wrapper = shallow(<App />);
	expect(wrapper.exists()).toBe(true);
});
