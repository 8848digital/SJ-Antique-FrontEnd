import React from 'react';
import SearchSelectInputField from '../SearchSelectInputField/SearchSelectInputField';

const ReportFilterListing: any = ({
  reportName,
  voucherNumber,
  setSearchItem,
  searchItem,
  selectDropDownReset,
  setSelectDropDownReset,
  searchVoucherNum,
  setSearchVoucherNum,
  itemList,
  HandleSearchInput,
  searchName,
  setSearchName,
  name,
}: any) => {
  console.log('@report item voucher number', itemList);
  return (
    <div className="d-flex justify-content-start ">
      {reportName === 'Item Status Report' && (
        <div className="col-sm-2 mx-1">
          <label className="text-grey">Item</label>
          <SearchSelectInputField
            karigarData={
              itemList?.length > 0 &&
              itemList !== null &&
              itemList.map((data: any) => ({
                karigar_name: data.name,
              }))
            }
            placeholder="Item"
            className="form-control input-fields custom-input-field line-height"
            style="max-width"
            selectedDropdownValue={searchItem}
            setSelectedDropdownValue={setSearchItem}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
      <div className="col-sm-3 p-0 mx-1">
        <label className="text-grey">FromDate</label>
        <div>
          <input
            type="date"
            name="from_date"
            className="form-control input-fields custom-input-field line-height  "
            onChange={HandleSearchInput}
          />
        </div>
      </div>
      <div className="col-sm-3 p-0 mx-1">
        <label className="text-grey">To Date</label>
        <div>
          <input
            type="date"
            name="to_date"
            className="form-control input-fields custom-input-field line-height "
            onChange={HandleSearchInput}
          />
        </div>
      </div>
      {reportName === 'Item Status Report' && (
        <div className="col-sm-2 p-0 mx-1">
          <label className="text-grey">Voucher Name</label>
          <SearchSelectInputField
            karigarData={voucherNumber}
            placeholder="Voucher Number"
            className="form-control input-fields custom-input-field line-height"
            style={'max-width'}
            selectedDropdownValue={searchVoucherNum}
            setSelectedDropdownValue={setSearchVoucherNum}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
      {reportName === 'Daily Quantity Status Report' && (
        <div className="col-md-3 p-0 mx-1">
          <label className="text-grey">Name</label>
          <SearchSelectInputField
            karigarData={name}
            placeholder="Name"
            className="form-control input-fields custom-input-field line-height "
            style="max-width"
            selectedDropdownValue={searchName}
            setSelectedDropdownValue={setSearchName}
            selectDropDownReset={selectDropDownReset}
            setSelectDropDownReset={setSelectDropDownReset}
          />
        </div>
      )}
    </div>
  );
};

export default ReportFilterListing;
