import axios from "axios";



export const getAllCountries = async ()=>{


try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
   

  const data =  response.data.map((el:any)=>({name:el.name.common,flag:el.flags.png})).sort((a:any,b:any)=>{ if(a.name < b.name) return -1; if(a.name > b.name) return 1 ;else return 0}) 

  return data


} catch (error) {
    console.log(error)
}
}