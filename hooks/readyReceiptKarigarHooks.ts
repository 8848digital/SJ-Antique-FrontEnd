import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { get_access_token } from '@/store/slices/auth/login-slice';
import { toast } from 'react-toastify';
import UseCustomReceiptHook from './custom-receipt-hook';
import UpdatePurchaseReceiptApi from '@/services/api/PurchaseReceipt/update-purchase-receipt-api';
import { getSpecificReceipt } from '@/store/slices/PurchaseReceipt/getSpecificPurchaseReceipt-slice';
import AmendPurchaseReceiptApi from '@/services/api/PurchaseReceipt/Amend-purchase-receipt-api';
import purchaseReceiptApi from '@/services/api/PurchaseReceipt/post-purchase-receipt-api';
import getKarigarApi from '@/services/api/PurchaseReceipt/get-karigar-list-api';
import materialApi from '@/services/api/PurchaseReceipt/get-material-list-api';
import kundanKarigarApi from '@/services/api/PurchaseReceipt/get-kundan-karigar-list-api';
import getPurchasreceiptListApi from '@/services/api/PurchaseReceipt/get-purchase-recipts-list-api';
import postMaterialApi from '@/services/api/PurchaseReceipt/post-material-api';

const useReadyReceiptKarigar = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const router: any = useRouter();
  const pathParts: any = router?.asPath?.split('/');
  const lastPartOfURL: any = pathParts[pathParts?.length - 1];

  const inputRef = useRef<any>(null);
  const lastInputRef = useRef<any>(null);
  const firstInputRef = useRef<any>(null);
  const [readyReceiptType, setReadyReceiptType] = useState<any>('');
  const [recipitData, setRecipitData] = useState({
    custom_karigar: ' ',
    remarks: '',
    custom_ready_receipt_type: readyReceiptType,
    posting_date: '',
  });

  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [clicks, setClick] = useState<boolean>(false);
  const [karigarData, setKarigarData] = useState<any>();
  const [kundanKarigarData, setKundanKarigarData] = useState<any>();
  const [materialListData, setMaterialListData] = useState<any>();
  const [activeModalId, setActiveModalId] = useState<any>(null);
  const [kunKarigarDropdownReset, setKunKarigarDropdownReset] =
    useState<any>(false);
  const loginAcessToken = useSelector(get_access_token);
  console.log(loginAcessToken, 'loginAcessToken');
  let disabledValue: any;

  const [selectedDropdownValue, setSelectedDropdownValue] = useState<any>('');
  const [
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
  ] = useState('');
  useEffect(() => {
    setRecipitData({
      ...recipitData,
      custom_ready_receipt_type: readyReceiptType,
    });
  }, [readyReceiptType]);

  const {
    HandleDeleteReceipt,
    setKundanListing,
    kundanListing,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    stateForDocStatus,
    setStateForDocStatus,
    readOnlyFields,
    setReadOnlyFields,
    HandleUpdateDocStatus,
    tableData,
    setTableData,
    materialWeight,
    setMaterialWeight,
    UpdateMaterialWeight,
    handleClearFileUploadInput,
    calculateEditTotal,
    handleFileUpload,
    handleDeleteRow,
    handleDeleteChildTableRow,
    calculateRowValue,
    handleModal,
    indexVal,
    showModal,
    setShowModal,
    handleFieldChange,
    purchasRecieptListParams,
  }: any = UseCustomReceiptHook();

  const initialState: any = {
    idx: 1,
    product_code: '',
    custom_kun_karigar: '',
    custom_net_wt: '',
    custom_few_wt: '',
    custom_gross_wt: '',
    custom_mat_wt: '',
    custom_other: '',
    custom_total: '',
    custom_add_photo: '',
    totalModalWeight: 0,
    totalAmount: 0,
    table: [
      {
        idx: materialWeight === undefined ? 1 : materialWeight?.length,
        material_abbr: '',
        material: '',
        pcs: '',
        piece_: '',
        carat: '',
        carat_: '',
        weight: '',
        gm_: '',
        amount: '',
      },
    ],
  };
  console.log('table data updated', tableData);

  useEffect(() => {
    const getPurchaseList = async () => {
      const capitalizeFirstLetter = (str: any) => {
        return str?.charAt(0)?.toUpperCase() + str?.slice(1);
      };
      if (Object?.keys(query)?.length > 0) {
        const listData = await getPurchasreceiptListApi(
          loginAcessToken,
          capitalizeFirstLetter(query.receipt)
        );
        console.log('listdataa', listData);
        if (listData?.data?.message?.status === 'success') {
          setKundanListing(listData?.data?.message?.data);
        }
      }
    };
    getPurchaseList();
  }, [clicks, router]);

  useEffect(() => {
    const getStateData: any = async () => {
      const stateData: any = await getKarigarApi(loginAcessToken.token);
      const KundanKarigarAPI = await kundanKarigarApi(loginAcessToken.token);
      const materialListApi = await materialApi(loginAcessToken.token);
      console.log(KundanKarigarAPI, 'stateData');
      setKarigarData(stateData);
      setKundanKarigarData(KundanKarigarAPI);
      setMaterialListData(materialListApi);
    };
    getStateData();
  }, []);

  const handleModalFieldChange = (
    id: number,
    val: any,
    field: string,
    newValue: any
  ) => {
    console.log('field change data', id, val, field, newValue);

    const formatInput = (value: any) => {
      const floatValue = parseFloat(value);
      if (!isNaN(floatValue)) {
        if (field === 'piece_' || field === 'carat_' || field === 'gm_') {
          return parseFloat(floatValue.toFixed(2)); // Format to 2 decimal places for custom_total
        } else {
          return parseFloat(floatValue.toFixed(3)); // Format to 3 decimal places for other fields
        }
      }
      return null;
    };
    const updatedModalData =
      materialWeight?.length > 0 &&
      materialWeight?.map((item: any, i: any) => {
        if (i === id) {
          return { ...item, [field]: 0 || formatInput(newValue) };
        }
        return item;
      });

    setMaterialWeight(updatedModalData);
    setStateForDocStatus(true);
  };

  const handleSaveModal = async (id: any) => {
    const modalValue = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        weight,
        gm_,
        amount,
        id,
        ...rest
      }: any) => ({
        ...rest,
      })
    );
    console.log(modalValue, 'modalValue');
    if (inputRef.current) {
      disabledValue = inputRef.current.value;
    } else {
      console.error('The ref to the input element is not available.');
    }

    const totalAmmount = materialWeight.map(
      ({
        pcs,
        piece_,
        carat,
        carat_,
        gm_,
        id,
        material_abbr,
        material,
        weight,
        ...rest
      }: any) => ({ ...rest })
    );
    console.log(totalAmmount, 'bfggh');
    const weightAddition = materialWeight.reduce((accu: any, val: any) => {
      console.log(accu, 'accu23');
      let weight = val.weight;
      if (val.weight === '') {
        weight = 0;
      }
      const total = Number(accu) + Number(weight);
      return total;
    }, 0);
    const updatedMaterialVal = materialWeight.map((item: any) => {
      return {
        ...item,
        amount: disabledValue,
      };
    });

    const totalvalues = materialWeight.map(
      (row: any) =>
        row.pcs * row.piece_ + row.carat * row.carat_ + row.weight * row.gm_
    );
    let numbers: any;
    if (Array.isArray(totalvalues) && totalvalues.length === 1) {
      numbers = totalvalues[0];
    } else {
      numbers = totalvalues.reduce((accu: any, val: any) => {
        return accu + val;
      }, 0);
    }
    // setTotalModalAmount(totalvalues);
    console.log(totalvalues, 'totalvalues ');
    const totalAmmountValues = totalvalues.reduce((accu: any, val: any) => {
      return accu + val;
    }, 0);
    console.log();
    const updatedMaterialWeight =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          const numbersParsed = Number(numbers);
          return {
            ...row,
            totalModalWeight: weightAddition,
            totalAmount: totalAmmountValues,
            table: materialWeight.map(({ id, ...rest }: any) => ({ ...rest })),
            custom_mat_wt: weightAddition,
            custom_gross_wt:
              Number(row.custom_net_wt) +
              Number(row.custom_few_wt) +
              Number(weightAddition),
            custom_total: numbersParsed,
          };
        }
        return row;
      });

    const updatedDataVal = updatedMaterialWeight.map((row: any, i: any) => {
      if (row.idx === indexVal) {
        return {
          ...row,
          table: row.table.map((tableItem: any) => ({
            ...tableItem,
            amount:
              (Number(tableItem.pcs) || 0) * (Number(tableItem.piece_) || 0) +
              (Number(tableItem.carat) || 0) * (Number(tableItem.carat_) || 0) +
              (Number(tableItem.weight) || 0) * (Number(tableItem.gm_) || 0),
          })),
        };
      }
      return row;
    });

    console.log(updatedDataVal, 'updatedDataVa');
    setTableData(updatedDataVal);
    if (totalvalues.length > 0) {
      setClickBtn(true);
    } else {
      setClickBtn(false);
    }
    const values = {
      version: 'v1',
      method: 'create_material',
      entity: 'material_post_api',
      data: modalValue,
    };
    console.log(updatedMaterialWeight, 'data45');
    const materialApiVal = await postMaterialApi(loginAcessToken.token, values);
    setShowModal(false);
    setStateForDocStatus(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveModalId(null);
  };

  const handleRecipietChange = (e: any) => {
    setRecipitData({ ...recipitData, [e.target.name]: e.target.value });
    setStateForDocStatus(true);
  };

  const handleAddRow = (value: any) => {
    console.log('add row', value);
    const newRow = {
      idx: tableData?.length + 1,
      product_code: '',
      custom_kun_karigar: '',
      custom_net_wt: '',
      custom_few_wt: '',
      custom_gross_wt: '',
      custom_mat_wt: '',
      custom_other: '',
      custom_total: '',
      custom_add_photo: '',
      table: [
        {
          idx: materialWeight !== undefined ? materialWeight?.length + 1 : 1,
          material_abbr: '',
          material: '',
          pcs: '',
          piece_: '',
          carat: '',
          carat_: '',
          weight: '',
          gm_: '',
          amount: '',
        },
      ],
    };
    if (value === 'tableRow') {
      setTableData([...tableData, newRow]);
    } else {
      setMaterialWeight([...materialWeight, ...newRow?.table]);
    }

    setStateForDocStatus(true);
  };

  const handleTabPressOnModal = (event: any, id: any) => {
    if (event.key === 'Tab') {
      handleAddRow('modalRow');
    }
    setStateForDocStatus(true);
  };

  const handleTabPress = (event: any, id: any, keyValue: any) => {
    if (event.key === 'Tab' && id === tableData[tableData.length - 1].idx) {
      // if (query?.hasOwnProperty('receiptId')) {
      // } else {
      //   // handleCreate();
      // }
      handleAddRow('tableRow');
    }
    setStateForDocStatus(true);
  };

  const handleCreate = async () => {
    console.log(tableData, 'table56', recipitData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          const customOther = parseFloat(row.custom_other);
          const totalAmount = parseFloat(row.totalAmount);

          if (!isNaN(customOther) && !isNaN(totalAmount)) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: totalAmount + customOther,
            };
          } else if (!isNaN(customOther)) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: customOther,
            };
          } else {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: totalAmount,
            };
          }
        }
        return row;
      });

    const modalValue = updatedtableData?.map(
      ({ id, totalModalWeight, totalAmount, ...rest }: any) => ({
        ...rest,
      })
    );

    const values = {
      ...recipitData,
      items: modalValue,
    };
    const isEmptyProductCode = values?.items?.some(
      (obj: any) => obj.product_code === ''
    );
    const isEmptyMaterial = values?.items?.some((obj: any) =>
      obj.table.some((vals: any) => vals.material === '')
    );
    const productVal = values.custom_karigar;

    if (isEmptyProductCode || productVal === '') {
      toast.error('Mandatory fields Item code Or Karigar');
    } else if (productVal === ' ') {
      toast.error('Mandatory field Karigar');
    } else {
      const purchaseReceipt: any = await purchaseReceiptApi(
        loginAcessToken.token,
        values
      );
      console.log(purchaseReceipt?.data?.message?.message, 'handleCreate');
      if (
        purchaseReceipt.status === 200 &&
        purchaseReceipt?.data?.hasOwnProperty('message')
      ) {
        router.push(
          `${readyReceiptType}/${purchaseReceipt?.data?.message?.message}`
        );

        toast.success('Purchase Receipt Created Sucessfully');
      } else {
        toast.error('Error in Creating Purchase Receipt');
      }
    }
  };

  const HandleEmptyReadyReceiptForm: any = () => {
    setRecipitData({
      custom_karigar: ' ',
      remarks: '',
      custom_ready_receipt_type: readyReceiptType,
      posting_date: '',
    });
    setTableData([initialState]);
    setSelectedDropdownValue('');
    setSelectedKundanKarigarDropdownValue('');
    setKunKarigarDropdownReset(true);
  };

  const handleUpdateReceipt: any = async () => {
    console.log('update receipt', tableData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          if (
            row.totalAmount !== undefined &&
            row.custom_other !== '' &&
            row.custom_total !== '' &&
            row.custom_other !== 0
          ) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.totalAmount) + Number(row.custom_other),
            };
          } else if (row.totalAmount === undefined && row.custom_other === 0) {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.custom_total),
            };
          } else {
            return {
              ...row,
              custom_gross_wt:
                Number(row.custom_net_wt) +
                Number(row.custom_few_wt) +
                Number(row.custom_mat_wt),
              custom_total: Number(row.custom_total),
            };
          }
        }
        return row;
      });

    const updatedMergedList = updatedtableData.map((obj: any) => ({
      ...obj,
      custom_purchase_receipt_item_breakup: '',
      item_group: 'All Item Groups',
    }));

    const values = {
      ...recipitData,
      items: updatedMergedList,
    };
    // const NoDataInReceiptTableData = values?.items?.some(
    //   (item: any) => Object?.keys(item)?.length === 0
    // );
    // console.log('NoDataInReceiptTableData', NoDataInReceiptTableData);

    // List of keys to be excluded from the API request
    const keyToExclude = ['posting_date'];

    const updatedReceiptData: any = { ...values };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);

    console.log('santitizedData', updatedReceiptData);
    let updateReceiptApi: any = await UpdatePurchaseReceiptApi(
      loginAcessToken.token,
      updatedReceiptData,
      query?.receiptId
    );
    console.log('updated purchase receipt api res', updateReceiptApi);
    if (Object?.keys(updateReceiptApi?.data)?.length > 0) {
      if (Object?.keys(updateReceiptApi?.data?.message)?.length > 0) {
        setStateForDocStatus(false);
        const params: any = {
          token: loginAcessToken?.token,
          name: query?.receiptId,
        };
        dispatch(getSpecificReceipt(params));
      }
    }
  };

  const HandleAmendButtonForDuplicateChitti: any = async () => {
    console.log('tabledata in amend', tableData);
    const updatedtableData =
      tableData?.length > 0 &&
      tableData !== null &&
      tableData?.map((row: any, i: any) => {
        if (row.idx === indexVal) {
          if (row.custom_other !== '' && row.custom_total !== '') {
            return {
              ...row,
              custom_total: Number(row.totalAmount) + Number(row.custom_other),
            };
          } else if (row.custom_other !== '') {
            return {
              ...row,
              custom_total: Number(row.custom_other),
            };
          } else {
            return {
              ...row,
              custom_total: Number(row.totalAmount),
            };
          }
        }
        return row;
      });

    // Change key name from 'product_code' to 'item_code' in the tableData
    const updatedTableDataWithRenamedKey = updatedtableData?.map((row: any) => {
      return {
        ...row,
        item_code: row.product_code,
      };
    });

    // List of keys to be excluded from the API request
    const keyToExclude = ['docstatus'];

    const updatedReceiptData: any = { ...recipitData };
    keyToExclude?.forEach((key: any) => delete updatedReceiptData[key]);
    console.log('santitizedData', updatedReceiptData);

    const values = {
      ...updatedReceiptData,
      amended_from: lastPartOfURL,
      items: updatedTableDataWithRenamedKey,
    };
    try {
      let amendReceiptApi: any = await AmendPurchaseReceiptApi(
        loginAcessToken.token,
        values,
        query?.receiptId
      );

      if (amendReceiptApi?.data?.hasOwnProperty('data')) {
        const newURL = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;
        const asPath = `/readyReceipt/${readyReceiptType}/${amendReceiptApi?.data?.data?.name}`;

        // Update the URL with the required query parameter
        router.push(newURL, asPath);
        setStateForDocStatus(false);
        setShowSaveButtonForAmendFlow(false);
      } else {
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };
  // useEffect(() => {}, [tableData]);

  return {
    setClick,
    kundanListing,
    handleCreate,
    handleRecipietChange,
    handleAddRow,
    recipitData,
    karigarData,
    setRecipitData,
    handleFieldChange,
    tableData,
    handleDeleteRow,
    handleTabPress,
    setTableData,
    kundanKarigarData,
    handleModal,
    handleModalFieldChange,
    materialWeight,
    materialListData,
    calculateRowValue,
    handleDeleteChildTableRow,
    setMaterialWeight,
    closeModal,
    handleSaveModal,
    showModal,
    lastPartOfURL,
    HandleDeleteReceipt,
    selectedDropdownValue,
    setSelectedDropdownValue,
    readyReceiptType,
    setReadyReceiptType,
    stateForDocStatus,
    setStateForDocStatus,
    indexVal,
    handleUpdateReceipt,
    readOnlyFields,
    setReadOnlyFields,
    setShowSaveButtonForAmendFlow,
    showSaveButtonForAmendFlow,
    HandleUpdateDocStatus,
    setKundanListing,
    HandleAmendButtonForDuplicateChitti,
    handleTabPressOnModal,
    HandleEmptyReadyReceiptForm,
    selectedKundanKarigarDropdownValue,
    setSelectedKundanKarigarDropdownValue,
    kunKarigarDropdownReset,
    setKunKarigarDropdownReset,
    calculateEditTotal,
    handleClearFileUploadInput,
    purchasRecieptListParams,
    lastInputRef,
    firstInputRef,
  };
};

export default useReadyReceiptKarigar;
