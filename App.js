import * as React from 'react';
import Navigator from './src/Navigator';
import {useDispatch} from 'react-redux';
import {getUserInfo, setUserInfo} from './src/Store/Actions/Auth';
import {ASYNC_STORAGE_KEYS, getData} from './src/Helper/asyncStorage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    _componentDidMount();
  }, []);

  const _componentDidMount = async () => {
    const token = await getData(ASYNC_STORAGE_KEYS.authToken);
    if (token) dispatch(getUserInfo());
    else dispatch(setUserInfo({}));
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
