import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakerapi.it/api/v2",
});

export const fetchfetchInfinityData = async (count) => {
  const response = await axiosInstance.get("/persons", {
    params: {
      _quantity: count,
    },
  });
  return response.data; // 받아온 데이터 반환
};
