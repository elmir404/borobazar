import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { List } from 'lodash';
export interface AddProductType {
  // email: string;
  productName:string,
  // category:string,
  // Files:File;
  // phone:number,
  // userName: string;
  // city:string,
  unitPrice:number,
  // amount:number,
  description:string,
  // MarkTypeId:number,
  Files:any
}
async function addProduct(input: AddProductType) {
  let data  = await http.post(API_ENDPOINTS.ADDPRODUCT,
    JSON.stringify({
    // Email: input.email,  
    Name: input.productName,
    // CategoryId: input.category,
    
    Files: input.Files,
    // Phone:input.phone,
    // City:input.city ,
    UnitPrice:input.unitPrice,
    Note:input.description,
    // Model:input.userName,
    // MarkTypeId:3
  }),
  {
    // headers: {
    //   // 'Accept': 'application/json',
    //   'Content-Type': 'multipart/form-data;',
      
    // }
   }
  
  );
  return {
    response:data.data
  }
}
export const useAddProductMutation = () => {
  const {closeModal } = useUI();
  return useMutation((input: AddProductType) => addProduct(input), {
    
    onSuccess: (data) => {
      // Cookies.set('auth_token',);
      if(data.response.success){
        
        closeModal();
      }
      // closeModal();
    },
    onError: (error) => {
      
      console.log(error, 'login error response');
    },
  });
};