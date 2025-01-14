interface AddressProps {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string; // 날짜 형식 문자열
  gender: "male" | "female" | "other"; // 성별
  address: AddressProps;
  website: string;
  image: string;
}

export interface FetchDataResponse {
  data: User[];
}

export interface FetchInfinityDataParams {
  pageParam?: number;
  gender?: string;
}

export interface FetchInfinityDataResponse {
  data: FetchDataResponse;
  nextParam: number;
}
