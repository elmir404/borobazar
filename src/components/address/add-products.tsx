import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import Alert from '@components/ui/alert';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useTranslation } from 'next-i18next';
import Input from '@components/ui/form/input';
import FileInput from '@components/ui/form/fileinput';
import { ChangeEvent,useState,useCallback,useRef } from 'react';
import TextArea from '@components/ui/form/text-area';
import CategorySelectMenu from '@components/ui/category-select';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import {useDropzone} from 'react-dropzone'

import { useAddProductMutation, AddProductType} from '@framework/auth/use-addproduct';
import { FaFileUpload } from 'react-icons/fa';
import { initialState } from '@contexts/cart/cart.reducer';
const AddProductForm: React.FC = () => {
  const { t } = useTranslation('common');


  const { mutate: addProduct, isLoading,data } = useAddProductMutation();
  const { closeModal,openModal } = useModalAction();
  // const fileInput = useRef();
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  // }, [])
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const [Files,setFile] =useState([]);
  const [image,setImage] =useState([]);
//  console.log("files add",Files);
 
if(data?.response.success){
  closeModal();
  openModal('PRODUCT_SUCCESS');
 }
  //   fileReader.readAsDataURL(file);
    
     
  // }
  const {
    data:category,
      
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 15,
  });
  // console.log(data);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddProductType>();
  
  
   
  const onChange=(e:any)=>{
    setValue("Files", e.target.files, { shouldValidate: true })
   setFile(e.target.files)
  }
//   const fileUpload = (e:any) => {  
//     
// };
   
    function onSubmit({ productName,Files,unitPrice,description,city,phone,userName,amount,MarkTypeId,category,email}:AddProductType ) {
    
    

     addProduct({
      productName,
      unitPrice,
      Files,
      description,
      city,
      phone,
      userName,
      amount,
      MarkTypeId,
      category,
      email
      
    });
    
    //  console.log("sadsa:",Files)
    
    // closeModal();
  }
  const onDrop= useCallback(
    (acceptedFiles) => {
    console.log("accepted files:",acceptedFiles);
    const accFiles =acceptedFiles;
    setImage(accFiles);
    setValue("Files", acceptedFiles, { shouldValidate: true })
    },
    [setValue, "Files"],
    
  )
  
  
  // const onDrop = (files: any) => {
  //   setImages(files);
  // };
  // const onDrop = useCallback(acceptedFiles => {
  //   alert(acceptedFiles[0].name)
  //   console.log("Now you can do anything with"+
  //               " this file as per your requirement")
  // }, [])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex bg-skin-fill mx-auto rounded-lg w-full lg:w-[1000px] 2xl:w-[1200px]">
      <CloseButton onClick={closeModal} />
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden w-full">
      <div className="w-full md:w-[55%] xl:w-[50%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12 flex flex-col justify-center">
        <h4 className="text-skin-base font-semibold text-xl sm:text-2xl  sm:pt-3 text-center ">
              {t('common:text-add-product')}
         </h4>

        <form
            onSubmit={handleSubmit( onSubmit)}
            className="flex flex-col justify-center"
            noValidate
            encType="multipart/form-data"
          >
          <div className="flex flex-col mb-3 ">
              <Input
                label={t('forms:label-product-name')}
                type="text"
                placeholder={t('forms:placeholder-product')}

                variant="outline"
                {...register('productName', {
                  required: 'forms:last-name-required',
                })}
                error={errors.productName?.message}
              />
          </div>
          <div className="flex flex-row mb-3 mt-3">
               <div className="block ml-2">
                  <label
                        htmlFor="category"
                        className="block font-normal text-sm leading-none mb-3 cursor-pointer text-skin-base text-opacity-70"
                        
                        
                      >
                        {t('forms:label-category')}
                      </label>
                <div className='relative'>
                        {error ? (
                  <div className="2xl:pe-10">
                    <Alert message={error.message} />
                  </div>
                      ) : loading ? (
                        Array.from({ length: 1 }).map((_, idx) => (
                          <CategoryListCardLoader
                            key={`category-list-${idx}`}  
                            uniqueKey="category-list-card-loader"
                          />
                        ))
                      ) : (
                        <select  {...register('category', {
                          required: 'forms:last-name-required',
                        })}  className='border border-solid border-gray-300 block rounded  focus:border-2 focus:border-skin-primary focus:outline-none py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-skin-base ' >
                        <CategorySelectMenu   items={category?.categories?.data.slice(0,15)} />
                        </select>
                      )}
                  
                </div>
             </div>
             <div className="block ml-2">
                  <label
                        htmlFor="city"
                        className="block font-normal text-sm leading-none mb-3 cursor-pointer text-skin-base text-opacity-70"
                        
                        
                      >
                        {t('forms:label-city-product')}
                      </label>
                <div className='relative'>
                    <select {...register('city', {
                  required: 'forms:last-name-required',
                })} className='border border-solid border-gray-300 block rounded  focus:border-2 focus:border-skin-primary focus:outline-none py-2.5 px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px  font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-skin-base  ' >
                        <option selected>{t('forms:label-city-product')}</option>
                          <option value="1">Baki</option>
                          <option value="2">Gence</option>
                          <option value="3">Qebele</option>
                          <option value="4">Sumqayit</option>
                          <option value="1">Baki</option>
                          <option value="2">Gence</option>
                          <option value="3">Qebele</option>
                          <option value="4">Sumqayit</option>
                          <option value="1">Baki</option>
                          <option value="2">Gence</option>
                          <option value="3">Qebele</option>
                          <option value="4">Sumqayit</option>
                          <option value="1">Baki</option>
                          <option value="2">Gence</option>
                          <option value="3">Qebele</option>
                          <option value="4">Sumqayit</option>
                          <option value="1">Baki</option>
                          <option value="2">Gence</option>
                          <option value="3">Qebele</option>
                          <option value="4">Sumqayit</option>
                    </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-3 ">
              <Input
                label={t('forms:price-label')}
                type="number"
                placeholder={t('forms:placeholder-price')}
                variant="outline"
                {...register('unitPrice', {
                  required: 'forms:last-name-required',
                })}
                error={errors.unitPrice?.message}
              />
              
          </div>
          <div className="flex flex-col mb-3 ">
          <TextArea
                  variant="solid"
                  label="forms:description-label"
                  {...register('description', {
                    required: 'forms:last-name-required',
                  })}
                  placeholder="forms:placeholder-briefly-describe"
                  error={errors.description?.message}
                />
                
           </div>
           <div className="flex flex-col mb-3 "  >
             {/* <label {...getRootProps()} >
              <input
                    {...getInputProps()}
                     {...register('Files')}
                    // onChange={onChange}
                    // error={errors.Files?.message}
                  />
                  <p>drag drop</p>
              </label> */}
               
                    <input 
                        type='file' 
                        // {...register('Files')}
                        // name="Files"
                         onChange={onChange}
                        multiple
                        placeholder="Upload an Image test" 
                        />
                {/* <FileInput {...register('Files')} onDrop={onDrop}/> */}
                <div>
            {/* {
              !!files.length &&(
                <div className='grid gap-1 grid-cols-4 mt-2'>
                   {files.map((file) => {
                     return (
                      <div key={file.name}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: '100px', height: '100px' }}
                        />
                      </div>
                    )
                   })}
                </div>
              )
            } */}
      </div> 
               {/* <input type="file"  {...register('Files', {
                })} /> */}
                 
           </div>
           <hr/>
           {/* <Heading variant="title" className="mb-5 mt-1.5">
           {t('forms:personal-information')}
           </Heading>
           <div className="flex flex-col mb-3 ">
            <Input
                  label={t('forms:label-name')}
                  placeholder={t('forms:placeholder-name')}

                  type="text"
                  // 
                  variant="outline"
                  {...register('userName', {
                    required: 'forms:name-required',
                  })}
                  error={errors.userName?.message}
                />
           </div> */}
           {/* <div className="flex flex-row mb-3 ">
                <Input
                      label={t('forms:label-email-star')}
                      type="text"
                      // 
                      placeholder={t('forms:placeholder-email')}
                      variant="outline"
                      {...register('email', {
                        required: 'forms:email-required',
                      })}
                      error={errors.email?.message}
                    />
                <Input
                  label={t('forms:label-phone')}
                  type="text"
                  // 
                  placeholder={t('forms:placeholder-phone')}

                  variant="outline"
                  {...register('phone', {
                    required: 'forms:phone-required',
                  })}
                  error={errors.phone?.message}
                />
           </div> */}
           <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="h-11 md:h-12 w-full mt-2 font-15px md:font-15px tracking-normal"
                  variant="formButton"
                >
                  {t('common:button-submit')}
                </Button>
              </div>
         </form>
      </div>
      <div className="w-full md:w-[45%] xl:w-[50%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12 flex flex-col bg-emerald-200">
      <h4 className="text-skin-base font-semibold text-xl sm:text-2xl  sm:pt-3 text-center ">
              {t('common:product-terms')}
         </h4>
          <ul className="list-disc mt-5">
          <li>Now this is a story all about how,  upside down</li>
          <li>my life got flipped turned</li>
          <li>my life got flipped turned</li>
          <li>my life got flipped turned</li>
          </ul>
      </div>
      </div>
    </div>
  );
};

export default AddProductForm;
