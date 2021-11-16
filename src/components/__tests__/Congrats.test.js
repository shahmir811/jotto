import { shallow } from 'enzyme';

import Congrats from '../Congrats';
import { findByTestAttr } from '../../../tests/testUtils';

const setup = (props = {}) => {
	return shallow(<Congrats {...props} />);
};

it('renders a component without error', () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, 'component-congrats');
	expect(component.length).toBe(1);
});

it('renders no text when `success` prop is false', () => {
	const wrapper = setup({ success: false });
	const component = findByTestAttr(wrapper, 'component-congrats');
	expect(component.text()).toBe('');
});

it('renders non-empty congrats message when `success` prop is true', () => {
	const wrapper = setup({ success: true });
	const message = findByTestAttr(wrapper, 'congrats-message');
	expect(message.text().length).not.toBe(0);
});
