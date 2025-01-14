import React, { useState } from "react";
import styles from "./InfinityTool.module.scss";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInfinityData } from "../module/api/fetchInfinityData.ts";

const InfinityTool = () => {
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [sortOrder, setSortOrder] = useState(""); // 정렬 순서 상태
  const queryClient = useQueryClient();

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 : 이름 정렬 함수수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleSort = (order) => {
    console.log(order);
    const sortedData = [
      ...(data?.pages.flatMap((page) => page.data) || []),
    ].sort((a, b) => {
      if (sortOrder === "desc") return a.firstname.localeCompare(b.firstname);
      else return b.firstname.localeCompare(a.firstname);
    });

    // 캐시 업데이트
    queryClient.setQueryData(["infinityData"], (oldData) => ({
      ...oldData,
      pages: [{ data: sortedData }],
    }));

    setSortOrder(order);
  };

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 : 리액트 쿼리의 캐싱된 값을 가져온다
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["infinityData"], // 검색어 포함
      queryFn: ({ pageParam = 1 }) =>
        fetchInfinityData({ pageParam, gender: searchKeyword }), // 검색어 전달
      initialPageParam: 1, // 초기 페이지 설정
      getNextPageParam: (serverData) => serverData.nextParam, // 다음 페이지
    });

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 : 리액트 쿼리 최신 데이터 리패치
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const handleSearch = () => {
    console.log(searchKeyword);
    console.log(searchKeyword !== "femail", searchKeyword !== "mail");
    if (searchKeyword === "femail" || searchKeyword === "mail") {
      refetch();
    } else {
      alert("api상 femail 혹은 mail만 검색 가능합니다.");
      return;
    }
  };

  return (
    <div className={styles["infinity-item-block"]}>
      <h3>이름 정렬</h3>
      <div className={styles["item-sort-block"]}>
        <button
          className={`${sortOrder === "asc" ? styles["active"] : ""}`}
          onClick={() => {
            handleSort("asc");
          }}
        >
          오름차순
        </button>
        <button
          className={`${sortOrder === "desc" ? styles["active"] : ""}`}
          onClick={() => {
            handleSort("desc");
          }}
        >
          내림차순
        </button>
      </div>
      <h3>검색</h3>
      <div className={styles["item-search-block"]}>
        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="femail / mail 로만 검색 가능"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default InfinityTool;
