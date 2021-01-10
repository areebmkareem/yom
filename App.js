import * as React from 'react';
import Navigator from './src/Navigator';
import {useDispatch} from 'react-redux';
import {getUserInfo, setUserInfo} from './src/Store/Actions/Auth';
import {ASYNC_STORAGE_KEYS, getData} from './src/Helper/asyncStorage';

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

  return <Navigator />;
}

export default App;
