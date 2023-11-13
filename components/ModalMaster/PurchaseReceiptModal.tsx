import React from 'react';
import ModalMaster from './ModalMaster';
import { Button, Modal } from 'react-bootstrap';

const PurchaseReceiptModal = ({
  tableData,
  showModal,
  closeModal,
  handleModalFieldChange,
  handleAddRow,
  materialWeight,
  setMaterialWeight,
  materialListData,
  calculateRowValue,
  handleDeleteChildTableRow,
  setRecipitData,
  recipitData,
  selectedDropdownValue,
  setSelectedDropdownValue,
  handleSaveModal,
  readOnlyFields,
  setReadOnlyFields,
}: any) => {
  return (
    <div>
      {tableData?.length > 0 &&
        tableData !== null &&
        tableData.map((item: any, index: any) => (
          <Modal size="xl" show={showModal} onHide={closeModal} key={index}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Triggered by Key Press
              </Modal.Title>
            </Modal.Header>
            <ModalMaster
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
              readOnlyFields={readOnlyFields}
              setReadOnlyFields={setReadOnlyFields}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSaveModal(item.id)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
    </div>
  );
};

export default PurchaseReceiptModal;
