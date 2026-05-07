export interface School {
  id: string;
  name: string;
  city: string;
}

export const PARTNERED_SCHOOLS: readonly School[] = [
  { id: "1",  name: "Delhi Public School (Electronic City)",   city: "Bangalore" },
  { id: "2",  name: "National Public School (Indiranagar)",    city: "Bangalore" },
  { id: "3",  name: "Bishop Cotton Boys' School",              city: "Bangalore" },
  { id: "4",  name: "Greenwood High International School",     city: "Bangalore" },
  { id: "5",  name: "Inventure Academy",                       city: "Bangalore" },
  { id: "6",  name: "Canadian International School",           city: "Bangalore" },
  { id: "7",  name: "Indus International School",              city: "Bangalore" },
  { id: "8",  name: "Ryan International School (Bannerghatta)",city: "Bangalore" },
  { id: "9",  name: "St. Joseph's Indian High School",         city: "Bangalore" },
  { id: "10", name: "The International School Bangalore",      city: "Bangalore" },
  { id: "11", name: "Bangalore International School",          city: "Bangalore" },
  { id: "12", name: "Christ Academy Institute",                city: "Bangalore" },
  { id: "13", name: "NIFT Bangalore",                          city: "Bangalore" },
  { id: "14", name: "R.V. College of Engineering",             city: "Bangalore" },
  { id: "15", name: "M.S. Ramaiah Institute of Technology",    city: "Bangalore" },
  { id: "16", name: "BMS College of Engineering",              city: "Bangalore" },
  { id: "17", name: "Jyoti Nivas College",                     city: "Bangalore" },
] as const;
