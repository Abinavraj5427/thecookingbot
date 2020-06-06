import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';
import SignUp from './SignUp';
import Consent from './Consent';

const SignUpNavig = createMaterialTopTabNavigator({
  Login: {screen: Login},
  SignUp: {screen: SignUp},
  Consent: {screen: Consent},
});

export default createAppContainer(SignUpNavig);