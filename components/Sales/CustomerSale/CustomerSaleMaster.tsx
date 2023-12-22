import SalesHeader from '@/components/Header/SalesHeader';
import CustomerSalesTable from './CustomerSalesTable';
import CustomerSaleTable1 from './CustomerSalesTable1';
import CustomerSalesTable2 from './CustomerSalesTable2';
import UseCustomerSaleHook from '@/hooks/Sales/Customer-Sales/customer-sale-hook';

const CustomerSaleMaster = () => {
  const {
    salesTableData,
    setSalesTableData,
    kunCsOtCategoryListData,
    BBCategoryListData,
    clientNameListData,
    selectedDropdownValue,
    setSelectedDropdownValue,
  }: any = UseCustomerSaleHook();

  console.log('kunCsOtCategoryListData', kunCsOtCategoryListData);
  return (
    <div className="container-lg">
      <SalesHeader />
      <div>
        <CustomerSaleTable1
          clientNameListData={clientNameListData}
          selectedDropdownValue={selectedDropdownValue}
          setSelectedDropdownValue={setSelectedDropdownValue}
        />
        <CustomerSalesTable2
          kunCsOtCategoryListData={kunCsOtCategoryListData}
          BBCategoryListData={BBCategoryListData}
        />
        <CustomerSalesTable
          salesTableData={salesTableData}
          setSalesTableData={setSalesTableData}
        />
      </div>
    </div>
  );
};

export default CustomerSaleMaster;
