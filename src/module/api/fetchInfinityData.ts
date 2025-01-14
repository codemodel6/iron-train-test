import axiosInstance from "../instance/axiosInstance.ts";

export const fetchInfinityData = async (count) => {
  const response = await axiosInstance.get("/persons", {
    params: {
      _quantity: count,
      _gender: "female",
      _birthday_start: "2005-01-01",
    },
  });
  return response.data;
};
