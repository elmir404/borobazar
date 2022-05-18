import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';

function CategoryMenuItem({  item }: any) {
  // const { t } = useTranslation('common');
  const { name, subCategories: items, id } = item;
  return (
   
     <optgroup label={name}>
     
        {Array.isArray(items) ? (
         
           <>
              <option value={id}>{name}</option>
              {items?.map((currentItem) => {
                return(
                  
                  <CategoryMenuItem1 item={currentItem} />
                );
               
              })}
          </>
          
        ) :   (
          <>
               <option value={id}>{name}</option>
          </>
        )     }
        </optgroup>
      
  );
}
function CategoryMenuItem1({  item }: any) {
  // const { t } = useTranslation('common');
  const { name, subCategories: items, id } = item;
  return (
    <>
     
        {Array.isArray(items) ? (
         
           <>
              <option value={id}>{name}</option>
              {items?.map((currentItem) => {
                return(
                  <CategoryMenuItem2 item={currentItem} />
                );
               
              })}
          </>
          
        ) : (
          <>
               <option value={id}>{name}</option>
          </>
        )}
      </>
  );
}
function CategoryMenuItem2({  item }: any) {
  // const { t } = useTranslation('common');
  const { name, subCategories: items, id } = item;
  return (
    <>
     
        {Array.isArray(items) ? (
         
           <>
              <option value={id}>{name}</option>
              {items?.map((currentItem) => {
                return(
                  <option value={currentItem.id}>{currentItem.name}</option>
                );
               
              })}
          </>
          
        ) : (
          <>
          <option value={id}>{name}</option>
             </>
        )}
      </>
  );
}
function CategorySelectMenu({ items, className }: any) {
  

  return (
  <select  className='border border-solid border-gray-300 block rounded  focus:border-2 focus:border-skin-primary focus:outline-none py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-skin-base ' >
         <option value="">Siyahıdan seçin</option>
        
         {items?.map((item1: any) => (
            
           <CategoryMenuItem item={item1} />
        
      ))}
  </select>
  );
}

export default CategorySelectMenu;
