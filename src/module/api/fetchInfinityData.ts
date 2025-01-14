import axiosInstance from "../instance/axiosInstance.ts";

export const fetchInfinityData = async ({ pageParam = 1 }) => {
  const response = await axiosInstance.get("/persons", {
    params: {
      _quantity: 10, // 한 페이지당 항목 수
      _gender: "female",
      _birthday_start: "2005-01-01",
      _page: pageParam,
    },
  });

  return {
    data: response.data.data, // 서버에서 데이터
    nextParam: pageParam + 1, // 다음 페이지지
  };
};
