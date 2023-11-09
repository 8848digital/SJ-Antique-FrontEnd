import UseKundanKarigarDetailHook from '@/hooks/KundanKarigarHook/kundan-karigar-hook';
import React, { useEffect } from 'react';
import KundanTable from '../KundanReadyReceipts/KundanTable';
import KundanKarigarReadyReceiptMasterTable from '../KundanReadyReceipts/KundanKarigarReadyReceiptMasterTable';
import useReadyReceiptKarigar from '@/hooks/readyReceiptKarigarHooks';
import DocStatusButtonChanges from '../ButtonChanges/DocStatusButtonChanges';
import PurchaseReceiptModal from '../ModalMaster/PurchaseReceiptModal';

const DetailPageReadyReceipt = () => {
  const { defaultKarigarData } = UseKundanKarigarDetailHook();
  const {
    setClick,
    kundanListing,
    handleCreate,
    handleRecipietChange,
    handleAddRow,
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
    recipitData,
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
    handleUpdateReceipt,
  } = useReadyReceiptKarigar();
  console.log('default dataa', defaultKarigarData);

  useEffect(() => {
    if (defaultKarigarData?.length > 0 && defaultKarigarData !== null) {
      defaultKarigarData.map((data: any) => {
        setTableData(data?.items);
        setRecipitData(data);
        setReadyReceiptType(data?.custom_ready_receipt_type);
        setSelectedDropdownValue(data?.custom_karigar);
      });
    }
  }, [defaultKarigarData]);

  return (
    <div className="container">
      <div>
        {defaultKarigarData?.length > 0 &&
          defaultKarigarData !== null &&
          defaultKarigarData.map((data: any) => (
            <DocStatusButtonChanges
              data={data}
              stateForDocStatus={stateForDocStatus}
              handleUpdateReceipt={handleUpdateReceipt}
            />
          ))}

        <div className=" table">
          <KundanTable
            handleRecipietChange={handleRecipietChange}
            recieptData={recipitData}
            karigarData={karigarData}
            setRecipitData={setRecipitData}
            selectedDropdownValue={selectedDropdownValue}
            setSelectedDropdownValue={setSelectedDropdownValue}
            defaultKarigarData={defaultKarigarData}
            setReadyReceiptType={setReadyReceiptType}
            setStateForDocStatus={setStateForDocStatus}
          />
        </div>
        <div className="container d-flex justify-content-end p-o">
          <button
            className="btn btn-link p-0"
            onClick={() => handleAddRow('tableRow')}
          >
            Add Row
          </button>
        </div>
        <div className="table">
          <KundanKarigarReadyReceiptMasterTable
            handleFieldChange={handleFieldChange}
            tableData={tableData}
            handleDeleteRow={handleDeleteRow}
            handleTabPress={handleTabPress}
            setTableData={setTableData}
            kundanKarigarData={kundanKarigarData}
            handleModal={handleModal}
            setStateForDocStatus={setStateForDocStatus}
          />
        </div>
        <PurchaseReceiptModal
          tableData={tableData}
          showModal={showModal}
          closeModal={closeModal}
          handleModalFieldChange={handleModalFieldChange}
          handleAddRow={handleAddRow}
          materialWeight={materialWeight}
          setMaterialWeight={setMaterialWeight}
          materialListData={materialListData}
          calculateRowValue={calculateRowValue}
          handleDeleteChildTableRow={handleDeleteChildTableRow}
          setRecipitData={setRecipitData}
          recipitData={recipitData}
          selectedDropdownValue={selectedDropdownValue}
          setSelectedDropdownValue={setSelectedDropdownValue}
          handleSaveModal={handleSaveModal}
          setStateForDocStatus={setStateForDocStatus}
        />
      </div>
    </div>
  );
};

export default DetailPageReadyReceipt;
