import React from 'react';
import MasterKarigar from './MasterKarigar/MasterKarigar';
import useReadyReceiptKarigar from '@/hooks/readyReceiptKarigarHooks';
import MasterMaterial from './MasterMaterial/MasterMaterial';
import useMasterHooks from '@/hooks/masterHooks';

const MasterComponent = () => {
  const {
    karigarList,
    kunKarigarList,
    materialList,
    inputValue,
    nameValue,
    HandleInputValue,
    HandleSubmit,
    HandleKunInputValue,
    HandleKunSubmit,
    HandleNameChange,
    HandleSave,
  } = useMasterHooks();

  return (
    <div className="container-lg ">
      {/* <MasterListing/> */}
      <MasterKarigar
        karigarData={kunKarigarList}
        inputValue={inputValue}
        HandleInputValue={HandleKunInputValue}
        HandleSubmit={HandleKunSubmit}
      />
      <MasterMaterial
        materialList={materialList}
        nameValue={nameValue}
        HandleNameChange={HandleNameChange}
        HandleSave={HandleSave}
      />
    </div>
  );
};

export default MasterComponent;
