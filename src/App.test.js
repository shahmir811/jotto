import { shallow } from 'enzyme';
import { findByTestAttr } from '../tests/testUtils';
import App from './App';

const setup = () => {
	return shallow(<App />);
};

test('renders without errors', () => {
	const wrapper = setup();
	const appComponent = findByTestAttr(wrapper, 'component-app');
	expect(appComponent).toHaveLength(1);
});
