import axios from "axios";
import { useState } from "react";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";


const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;



export const useDeleteImage = ()=>{

const [loading, setLoading] = useState('')
const router = useRouter()

   const deleteImage = async(url:string)=>{



    const getPublicIdFromUrl = (url:string) => {

        const match = url.match(regex);
        return match ? match[1] : null;
      };


      const generateSHA1 =(data: any) => {
        const hash = crypto.createHash("sha1");
        hash.update(data);
        return hash.digest("hex");
    }
    
    const generateSignature = (publicId: string, apiSecret: string) => {
      const timestamp = new Date().getTime();
      return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };


      
      const publicId = getPublicIdFromUrl(url);
      console.log(publicId)

      const cloudName = 'drhzjli1l';
      const timestamp = new Date().getTime();
      const apiKey = 681863964833258;
      const apiSecret ='IqjDFLka_nkUWvWYjyg-ZM6n45g' //todo : check why doesn,t accept env
      const signature = generateSHA1(generateSignature(publicId!, apiSecret));
      console.log(signature)
      const theUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    
      try {

        setLoading(url)
        const response = await axios.post(theUrl, {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        });

      
    
      
    
      } catch (error) {
        console.error(error);
        toast({title:'Image',description:"Something went wrong",variant:'destructive'})
        throw Error('something went wrong')
       
      } finally{
        setLoading('')
      }


}

return {loading,deleteImage }

}



