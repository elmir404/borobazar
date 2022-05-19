import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey,pageParam=1}: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(`${API_ENDPOINTS.PRODUCTS}?_page=${pageParam}`,
       
    );
  return {
    data: shuffle(data) as Product[],
    paginatorInfo: {
      nextPageUrl:""
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam:  (_lastPage:any,pages:any)=>{
        
        if (_lastPage.pages<_lastPage.total_pages) return _lastPage +1;
        else{
          return false;
        }
      },
    }
  );
};

export { useProductsQuery, fetchProducts };
