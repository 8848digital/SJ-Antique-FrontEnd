import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from '../CustomerSale/CustomerSalesTable';
import CustomerSalesTable1 from '../CustomerSale/CustomerSalesTable1';
import TabSection from '@/components/TabSection';
import UseSalesReturnMasterHook from '@/hooks/Sales/Sales-Returns/sales-return-master-hook';
import UseCustomSalesReturnHook from '@/hooks/Sales/Sales-Returns/custom-sales-return-hook';
import DetailsPageSalesReturn from './DetailPageSalesReturn/DetailsPageSalesReturn';
import KundanListing from '@/components/KundanReadyReceipts/KundanReadyReceiptsListing';
import UseSalesReturnDetailHook from '@/hooks/Sales/Sales-Returns/sales-return-detail-hook';

const SaleReturnsMaster = () => {
  const {
    salesReturnTableData,
    setSalesReturnTableData,
    itemList,
    clientNameListData,
    selectedClient,
    setSelectedClient,
    handleSRCreate,
    selectedItemCodeForCustomerSale,
    setSelectedItemCodeForCustomerSale,
    handleAddRowForSalesReturn,
    handleDeleteRowOfSalesReturnTable,
    handleSalesReturnTableFieldChange,
    handleEmptySaleReturnData,
    itemCodeDropdownReset,
    handleSelectClientGroup,
    setItemCodeDropdownReset,
    HandleUpdateDocStatus
  }: any = UseSalesReturnMasterHook();

  const { saleReturnDeliveryNoteListing, handleDeleteSalesReturn } =
    UseSalesReturnDetailHook();

  const salesReturnListing =
    saleReturnDeliveryNoteListing && saleReturnDeliveryNoteListing.length > 0
      ? saleReturnDeliveryNoteListing.filter((data: any) => {
        return data.is_return === 1;
      })
      : [];

  return (
    <div className="container-lg px-0">
      <SalesHeader />
      <div>
        <TabSection
          firstTabHeading="Sale Returns"
          secondTabHeading="Create new sales Return"
        />

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <KundanListing
              kundanListing={salesReturnListing}
              karigarData={
                clientNameListData?.length > 0 &&
                clientNameListData !== null &&
                clientNameListData.map((data: any) => ({
                  karigar_name: data.client_name,
                }))
              }
              colPlaceholder1={'Delivery Note No.'}
              colPlaceholder2={'Client '}
              HandleDeleteReceipt={handleDeleteSalesReturn}
              HandleUpdateDocStatus={HandleUpdateDocStatus}
              printApiMethod={'get_print_purchase_receipt'}
              printApiEntity={'print_purchase_receipt'}
              deleteApiVersion={'v1'}
              deleteApiMethod={'delete_delivery_note_api'}
              deleteApiEntity={'delivery_note_api'}
            // purchasRecieptListParams={deliveryNoteListParams}
            />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div>
              <div className={`text-end mb-1`}>
                <button
                  type="submit"
                  onClick={handleEmptySaleReturnData}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  onClick={handleSRCreate}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  Create
                </button>
              </div>
              <CustomerSalesTable1
                clientNameListData={clientNameListData}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
                handleSelectClientGroup={handleSelectClientGroup}
                clientGroupList={
                  clientNameListData?.length > 0 &&
                  clientNameListData !== null &&
                  clientNameListData.map((clientData: any) => ({
                    ...clientData,
                    client_group: clientData.client_group,
                  }))
                }
                title="Sales Return No"
              />

              <CustomerSalesTable
                handleSalesTableFieldChange={handleSalesReturnTableFieldChange}
                salesTableData={salesReturnTableData}
                setSalesTableData={setSalesReturnTableData}
                selectedItemCodeForCustomerSale={
                  selectedItemCodeForCustomerSale
                }
                setSelectedItemCodeForCustomerSale={
                  setSelectedItemCodeForCustomerSale
                }
                handleAddRowForSales={handleAddRowForSalesReturn}
                handleDeleteRowOfSalesTable={handleDeleteRowOfSalesReturnTable}
                itemList={itemList}
                itemCodeDropdownReset={itemCodeDropdownReset}
                setItemCodeDropdownReset={setItemCodeDropdownReset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReturnsMaster;
