import axios from "axios";
import countries from "../public/all-countries.json";

export const getAllCountries = async () => {
  try {
    const data = JSON.parse(JSON.stringify(countries))
      .map((el: any) => ({ name: el.name.common, flag: el.flags.png }))
      .sort((a: any, b: any) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        else return 0;
      });

    return data;
  } catch (error) {
    console.log(error);
  }
};

// https://restcountries.com/v3.1/all
