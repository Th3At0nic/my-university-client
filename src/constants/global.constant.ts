import { capitalize } from "../utils/capitalizeFirstLetter";

export const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

const genders: string[] = ["male", "female", "others"];

export const genderOptions = genders.map((item) => ({
  value: item,
  label: capitalize(item), //values are small letter, so capitalized them to use as label
}));

const bloodGroups: string[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
