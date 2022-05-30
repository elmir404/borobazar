import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { List } from 'lodash';
export interface AddProductType {
  email: string;
  productName:string,
  category:string,
  // Files:File;
  phone:number,
  userName: string;
  city:string,
  unitPrice:any,
  amount:number,
  description:string,
  MarkTypeId:number,
  Files:any
}
  async function addProduct(input: AddProductType) {

    const formdata= new FormData();
    
    for (let i = 0 ; i < input.Files.length ; i++) {
      formdata.append("Files", input.Files[i]);
      console.log("file input:",input.Files[i]);
      }
    formdata.append("Note",input.description);
    // formdata.append("files",input.Files);
    formdata.append("Name",input.productName);
    formdata.append("CategoryId",input.category);
    formdata.append("City",input.city);
    // formdata.append("productName",input.productName);
    formdata.append("UnitPrice",input.unitPrice);
    formdata.append("MarkTypeId","3");
    formdata.append("Email","3@Sasas");
    formdata.append("Phone","3233");
    formdata.append("Model","3233");



    




  let data  =await  http.post(API_ENDPOINTS.ADDPRODUCT,formdata 
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
      
      // closeModal();
    },
    onError: (error) => {
      
      console.log(error, 'login error response');
    },
  });
};