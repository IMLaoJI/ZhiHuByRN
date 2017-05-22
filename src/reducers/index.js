import { combineReducers } from 'redux';

import routes from './routes';
import zhihu from './zhihudaily';

export default combineReducers({
  routes,
  zhihu
});
