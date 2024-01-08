import React, { useState } from 'react';
import styles from '../../../styles/readyReceipts.module.css';

import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable1 from '../CustomerSale/CustomerSalesTable1';
import CustomerSalesTable from '../CustomerSale/CustomerSalesTable';

const SaleReturnsMaster = () => {
  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <div
          className="nav nav-pills mb-3 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <div className="nav-tabs tabs-container w-50" role="presentation">
            <button
              className="nav-link active w-100 border p-1"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Sale Returns
            </button>
          </div>
          <div className="nav-tabs tabs-container w-50" role="presentation">
            <button
              className="nav-link w-100 border p-1"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Create new sales Return
            </button>
          </div>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            Sale Returns
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
                  // onClick={handleEmptyDeliveryNote}
                  className=" btn btn-outline-primary px-2 py-0 form-submit-button"
                >
                  New
                </button>
                <button
                  type="button"
                  // onClick={handleDNCreate}
                  className={`btn btn-outline-primary form-submit-button px-2 py-0 ms-3`}
                >
                  Create
                </button>
              </div>
              <CustomerSalesTable1
              // clientNameListData={clientNameListData}
              // selectedClient={selectedClient}
              // setSelectedClient={setSelectedClient}
              // handleSelectClientGroup={handleSelectClientGroup}
              // clientGroupList={clientGroupList}
              />
              {/* <CustomerSalesTable2
              kunCsOtCategoryListData={kunCsOtCategoryListData}
              BBCategoryListData={BBCategoryListData}
              selectedCategory={selectedCategory}
              setSeletedCategory={setSeletedCategory}
              handleSelectChange={handleSelectChange}
            /> */}
              <CustomerSalesTable
              // handleSalesTableFieldChange={handleSalesTableFieldChange}
              // clientNameListData={clientNameListData}
              // salesTableData={salesTableData}
              // setSalesTableData={setSalesTableData}
              // selectedItemCodeForCustomerSale={selectedItemCodeForCustomerSale}
              // setSelectedItemCodeForCustomerSale={
              //   setSelectedItemCodeForCustomerSale
              // }
              // handleAddRowForSales={handleAddRowForSales}
              // handleDeleteRowOfSalesTable={handleDeleteRowOfSalesTable}
              // selectedCategory={selectedCategory}
              // itemList={itemList}
              // itemCodeDropdownReset={itemCodeDropdownReset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReturnsMaster;
