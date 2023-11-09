import DeletePurchaseReceiptApi from '@/services/api/PurchaseReceipt/delete-purchase-receipt';
import GetSpecificPurchaseReceiptData from '@/services/api/PurchaseReceipt/get-specific-purchase-receipt-api';
import UpdateDocStatusApi from '@/services/api/general/update-docStatus-api';
import getPurchasreceiptListApi from '@/services/api/get-purchase-recipts-list-api';
import {
  getSpecificReceipt,
  get_specific_receipt_data,
} from '@/store/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UseCustomReceiptHook: any = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = useRouter();
  const pathParts = router.asPath.split('/');
  const lastPartOfURL = pathParts[pathParts.length - 1];

  const loginAcessToken = useSelector(get_access_token);
  const SpecificDataFromStore: any = useSelector(get_specific_receipt_data);
  console.log('specific data in custom', SpecificDataFromStore);

  const [kundanListing, setKundanListing] = useState<any>([]);
  const [defaultKarigarData, setDefaultKarigarData] = useState<any>([]);

  const [stateForDocStatus, setStateForDocStatus] = useState<any>(false);

  const HandleDeleteReceipt: any = async (name: any) => {
    let deletePurchaseReceiptApi: any = await DeletePurchaseReceiptApi(
      loginAcessToken?.token,
      name
    );
    console.log('deletereciept api', deletePurchaseReceiptApi);
    if (deletePurchaseReceiptApi?.message?.status === 'success') {
      toast.success(deletePurchaseReceiptApi?.message?.message);
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };

      let updatedData: any = await getPurchasreceiptListApi(
        loginAcessToken,
        capitalizeFirstLetter(lastPartOfURL)
      );

      setKundanListing(updatedData);
    } else {
      // router.back();
      toast.error('Failed to Delete purchase Receipt');
    }
  };

  const HandleUpdateDocStatus: any = async (docStatus: any, name: any) => {
    let updateDocStatus: any = await UpdateDocStatusApi(
      loginAcessToken?.token,
      docStatus,
      query.receiptId
    );
    console.log('updatedocstatus api', updateDocStatus);
    if (updateDocStatus?.hasOwnProperty('data')) {
      console.log('updatedocstatus api inn', updateDocStatus);

      const params: any = {
        token: loginAcessToken?.token,
        name: query?.receiptId,
      };
      dispatch(getSpecificReceipt(params));
    }
  };
  console.log('set default karigar data', defaultKarigarData);
  return {
    setKundanListing,
    kundanListing,
    HandleDeleteReceipt,
    stateForDocStatus,
    setStateForDocStatus,
    HandleUpdateDocStatus,
    defaultKarigarData,
    setDefaultKarigarData,
  };
};

export default UseCustomReceiptHook;
