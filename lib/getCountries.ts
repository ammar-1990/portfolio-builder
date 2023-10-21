import axios from "axios";



export const getAllCountries = async ()=>{


try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const names = response.data.map((country:any) => country.name.common);
   
  return names.sort()


} catch (error) {
    console.log(error)
}
}