import { combineReducers } from '@reduxjs/toolkit';
import GetAccessTokenScreen from '../store/slices/auth/login-slice';
import GetSpecificReceiptDataReducer from './slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import GetDetailOfDeliveryNoteDataReducer from '../store/slices/Sales/getDetailOfDeliveryNoteApi';
import GetDetailOfSalesReturnReducer from '../store/slices/Sales/get-detail-sales-return-slice';
// import GetClientGroupDataReducer from '../store/slices/Master/get-client-group-slice';
const appReducer = combineReducers({
  GetAccessTokenScreen: GetAccessTokenScreen,
  GetSpecificReceiptDataScreen: GetSpecificReceiptDataReducer,
  GetDetailOfDeliveryNoteDataScreen: GetDetailOfDeliveryNoteDataReducer,
  GetDetailOfSalesReturnScreen: GetDetailOfSalesReturnReducer,
  // GetClientGroupDataScreen: GetClientGroupDataReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
