import { CarProps } from "@/types";
import dotenv from "dotenv";
dotenv.config();

const model: string = "carrera";
const apiKey: string = process.env.API_KEY || ""; // Provide a default value

const url = `https://api.api-ninjas.com/v1/cars?limit=all&model=${model}`;


console.log("URL:", url); // Log the URL for debugging purposes
console.log("API Key:", apiKey); 

fetch(url, {
  method: "GET",
  headers: {
    "X-Api-Key": apiKey,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Request failed:", error.message);
  });

export async function fetchCars() {
  const headers = {
    "X-Api-Key": apiKey,
  };

  const response = await fetch(url, {
    headers: headers,
  });

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; //Base rental price per day in naira

  const mileageFactor = 0.1; //Additional rate per mile

  const ageFactor = 0.05; //Additional rate per year of vehicle age

  //calculate additioinal rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  //Calculate total rent rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};


export const generateCarImageUrl = (car: CarProps, angle?:string) =>{
 const url = new URL('https://cdn.imagin.studio/getimage');

 const {make, year, model} = car;

 url.searchParams.append('customer', 'hrjavascript-mastery');
 url.searchParams.append('make', make)
 url.searchParams.append('modelFamily', model.split(' ')[0])
 url.searchParams.append('zoomType', 'fullscreen');
 url.searchParams.append('modelYear', `${year}`)
 url.searchParams.append('angle', `${angle}`)

 return `${url}`
}