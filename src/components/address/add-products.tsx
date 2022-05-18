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
const AddProductForm: React.FC = () => {
  const { t } = useTranslation('common');


  const { mutate: addProduct, isLoading,data } = useAddProductMutation();
  const { closeModal } = useModalAction();
  // const fileInput = useRef();
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  // }, [])
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  // const [file,setFile] =useState(null);
  const [image,setImage] =useState([]);

 
  //   fileReader.readAsDataURL(file);
    
     
  // }
  // const {
  //   data,
      
  //   isLoading: loading,
  //   error,
  // } = useCategoriesQuery({
  //   limit: 15,
  // });
  // console.log(data);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddProductType>();
  
  
   
  // const onChange=(e:any)=>{
  //   setValue("Files", e.target.files[0], { shouldValidate: true })
    
  // }
//   const fileUpload = (e:any) => {  
//     
// };
   
  function onSubmit({ productName,Files,unitPrice,description,}:AddProductType ) {
    
    addProduct({
      productName,
      unitPrice,
      Files,
      description,
      
      
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
            onSubmit={handleSubmit(onSubmit)}
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
                {...register('productName')}
                
              />
          </div>
          
          <div className="flex flex-col mb-3 ">
              <Input
                label={t('forms:price-label')}
                type="number"
                placeholder={t('forms:placeholder-price')}
                variant="outline"
                {...register('unitPrice')}
              />
              
          </div>
          <div className="flex flex-col mb-3 ">
          <TextArea
                  variant="solid"
                  label="forms:description-label"
                  {...register('description')}
                  placeholder="forms:placeholder-briefly-describe"
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
               
                    {/* <input 
                        type='file' 
                        {...register('Files')}
                        // onChange={onChange}
                        placeholder="Upload an Image" 
                        /> */}
                <FileInput {...register('Files')} onDrop={onDrop}/>
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
