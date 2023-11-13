import { get_access_token } from "@/store/slices/auth/login-slice";
import { useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import materialApi from "@/services/api/get-material-list-api";
import { toast } from 'react-toastify';
import postMaterialMasterApi from "@/services/api/post-material-master";

const useMaterialHook = () =>{
    const loginAcessToken = useSelector(get_access_token);
    const [materialList, setMaterialList] = useState();
    const [error, setError] = useState('');
    const [nameValue, setNameValue] = useState({
        material: '',
        material_abbr: '',
      });
    useEffect(()=>{
        const getStateData:any = async ()=>{
            const materialData = await materialApi(loginAcessToken.token);
            setMaterialList(materialData);
        }
        getStateData()
    },[])
    
      const HandleNameChange = (e: any) => {
        const { name, value } = e.target;
        setNameValue({ ...nameValue, [name]: value });
      };
      console.log(nameValue, 'namevalue');
      const HandleSave = async () => {
        console.log(nameValue, 'material saved');
        const values = {
          version: 'v1',
          method: 'create_material',
          entity: 'material_post_api',
          data: [nameValue],
        };
        console.log(values, 'valuesname');
        if (
          nameValue.material === '' ||
          nameValue.material === undefined ||
          nameValue.material_abbr === '' ||
          nameValue.material_abbr === undefined
        ) {
          setError('Input field cannot be empty');
          console.log(error);
        } else {
          let apiRes: any = await postMaterialMasterApi(
            loginAcessToken?.token,
            values
          );
          console.log('apires', apiRes);
          if (apiRes?.status === 'success') {
            toast.success('Material Name Created');
            const materialData = await materialApi(loginAcessToken.token);
            setMaterialList(materialData)
          } else {
            toast.error('Material Name already exist');
          }
          setError('');
          setNameValue({
            material: '',
            material_abbr: '',
          });
        }
    }
    return{
        materialList,
        error,
        nameValue,
        HandleNameChange,
        HandleSave
    }
}
export default useMaterialHook