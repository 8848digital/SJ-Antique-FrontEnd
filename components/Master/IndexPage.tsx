import useMasterHooks from '@/hooks/master/masterHooks';
import { useRouter } from 'next/router';
import React from 'react'
import MasterKarigar from './MasterKarigar/MasterKarigar';
import MasterMaterialMaster from './MasterMaterial/MasterMaterialMaster';

const IndexPage = () => {
    const {
        karigarList,
        kunKarigarList,
        inputValue,
        HandleInputValue,
        HandleSubmit,
        HandleKunInputValue,
        HandleKunSubmit,
        error,
        setError,
      }:any = useMasterHooks();
      const router = useRouter()
      const pathcontent = router?.asPath?.split('/')
      console.log(pathcontent, 'pathcontent index')
      const key = pathcontent[pathcontent?.length - 1]
      return (
        <>
        {key === 'karigar' &&(
          <MasterKarigar
          karigarData={karigarList}
          inputValue={inputValue}
          HandleInputValue={HandleInputValue}
          HandleSubmit={HandleSubmit}
          error={error}
          setError={setError}
          value={key}
          placeholder={'Enter Karigar Name'}
        />
        )}
        {key === 'kundanKarigar' &&(
          <MasterKarigar
            karigarData={kunKarigarList}
            inputValue={inputValue}
            HandleInputValue={HandleKunInputValue}
            HandleSubmit={HandleKunSubmit}
            error={error}
            setError={setError}
            value={key}
            placeholder={'Enter Kundan Karigar Name'}
          />
        )}
        {key === 'material' &&(
          // <MasterKarigar/>
          <MasterMaterialMaster
          value={key}/>
        )}
        </>
      )
}

export default IndexPage