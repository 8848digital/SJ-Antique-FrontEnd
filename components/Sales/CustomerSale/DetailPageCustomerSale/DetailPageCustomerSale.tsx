import React from 'react';
import CustomerSalesTable from '../CustomerSalesTable';
import CustomerSalesTable2 from '../CustomerSalesTable2';
import CustomerSalesTable1 from '../CustomerSalesTable1';
import SalesHeader from '@/components/Header/SalesHeader';
import UseCustomerSaleDetailHook from '@/hooks/Sales/Customer-Sales/sales-detail-page-hook';
import CustomerSalesButtonsSection from './CustomerSalesButtonsSection';
import { get_detail_delivery_note_data } from '@/store/slices/Sales/getDetailOfDeliveryNoteApi';
import { useSelector } from 'react-redux';
import NoRecord from '@/components/NoRecord/NoRecord';
import { useRouter } from 'next/router';
import Loader from '@/components/NoRecord/Loader';

const DetailPageCustomerSale = () => {
  const router = useRouter();
  const { query } = useRouter();
  const {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleSalesTableFieldChange,
    handleAddRowForSales,
    handleDeleteRowOfSalesTable,
    selectedCategory,
    setSeletedCategory,
    handleSelectChange,
    itemList,
    handleEmptyDeliveryNote,
    selectedClient,
    setSelectedClient,
    handleDNCreate,
    stateForDocStatus,
    setStateForDocStatus,
    handleUpdateDeliveryNote,
    readOnlyFields,
    setReadOnlyFields,
    showSaveButtonForAmendFlow,
    setShowSaveButtonForAmendFlow,
    HandleUpdateSalesdocStatus,
    HandleAmendButtonForCustomerSales,
    HandleDeleteRecords,
    handleDeliveryNotePrintApi,
    defaultSalesDate,
    isLoading,
    setItemCodeDropdownReset,
  }: any = UseCustomerSaleDetailHook();

  const DetailOfDeliveryNoteFromStore: any = useSelector(
    get_detail_delivery_note_data
  );

  console.log('stateForDocStatus in page', stateForDocStatus);

  return (
    <div className="container-lg">
      <SalesHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {DetailOfDeliveryNoteFromStore?.data?.length === 0 &&
          isLoading === false ? (
            <NoRecord
              title={`No Record Found 😥`}
              heading=""
              backButtonUrl={`/sales/${query?.saleId}`}
            />
          ) : (
            <div>
              <div className={`text-end mb-1`}>
                <CustomerSalesButtonsSection
                  stateForDocStatus={stateForDocStatus}
                  setStateForDocStatus={setStateForDocStatus}
                  handleUpdateDeliveryNote={handleUpdateDeliveryNote}
                  readOnlyFields={readOnlyFields}
                  setReadOnlyFields={setReadOnlyFields}
                  showSaveButtonForAmendFlow={showSaveButtonForAmendFlow}
                  setShowSaveButtonForAmendFlow={setShowSaveButtonForAmendFlow}
                  HandleUpdateSalesdocStatus={HandleUpdateSalesdocStatus}
                  HandleAmendButtonForCustomerSales={
                    HandleAmendButtonForCustomerSales
                  }
                  HandleDeleteRecords={HandleDeleteRecords}
                  handleDeliveryNotePrintApi={handleDeliveryNotePrintApi}
                />
              </div>
              <CustomerSalesTable1
                clientNameListData={clientNameListData}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                defaultSalesDate={defaultSalesDate}
              />
              <CustomerSalesTable2
                kunCsOtCategoryListData={kunCsOtCategoryListData}
                BBCategoryListData={BBCategoryListData}
                selectedCategory={selectedCategory}
                setSeletedCategory={setSeletedCategory}
                handleSelectChange={handleSelectChange}
                readOnlyFields={readOnlyFields}
                keyValue={'edit'}
              />
              <CustomerSalesTable
                handleSalesTableFieldChange={handleSalesTableFieldChange}
                clientNameListData={clientNameListData}
                salesTableData={salesTableData}
                setSalesTableData={setSalesTableData}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                handleAddRowForSales={handleAddRowForSales}
                handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
                selectedCategory={selectedCategory}
                itemList={itemList}
                readOnlyFields={readOnlyFields}
                setStateForDocStatus={setStateForDocStatus}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailPageCustomerSale;
