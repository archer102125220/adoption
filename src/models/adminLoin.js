
import { GET_admin, POST_admin, PUT_admin, DELETE_admin } from '../services/adminLoin';
export default {

  namespace: 'adminLoin',

  state: {
    adminLoin: [],
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *GET_adminLoin({ payload, callback, loading }, { call, put }) {
      try {
        const response = yield call(GET_admin, payload);
        // console.log(response.message);
        yield put({ type: 'SAVE_admin', payload: response });
        if (loading) { loading(false); }
        if (callback) { callback(); }
      } catch (error) {
        console.log(error.message);
      }
    },
    *POST_adminLoin({ payload, callback, loading }, { call, put }) {
      try {
        const response = yield call(POST_admin, payload);
        console.log(response.message);
        yield put({ type: 'SAVE_admin', payload: response });
        if (loading) { loading(false); }
        if (callback) { callback(); }
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  reducers: {
    SAVE_admin(state, { payload }) {
      return {
        ...state, //過去的state狀態
        admin: payload //更新後的state狀態  
      };
    }
  },

};
