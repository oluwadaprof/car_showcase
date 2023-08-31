import dotenv from "dotenv";
dotenv.config();

const model: string = "camry";
const apiKey: string = process.env.REACT_APP_API_KEY || ""; // Provide a default value

const url = `https://api.api-ninjas.com/v1/cars?model=corolla`;

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
