import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchRelatedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  console.log("params",_params);
  
  const { data } = await http.get(`${API_ENDPOINTS.RELATED_PRODUCTS}?categoryId=${_params.category}`);
  console.log(data);
  return data;
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
  
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.RELATED_PRODUCTS, options],
    
    fetchRelatedProducts
  );
};
