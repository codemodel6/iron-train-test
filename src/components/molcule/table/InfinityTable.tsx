import React, { useRef, useEffect } from "react";
import styles from "./InfinityTable.module.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinityData } from "../../../module/api/fetchInfinityData.ts";

const InfinityTable = () => {
  const loadDataRef = useRef(null); // 무한스크롤 dom 체크 ref

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 : 무한스크롤 useQuery
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["infinityData"],
    queryFn: fetchInfinityData,
    initialPageParam: 1, // 초기 페이지 설정
    getNextPageParam: (serverData) => serverData.nextParam, // 다음 페이지
  });

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 훅 : 가장 하단 접근 시 다음 데이터를 가져온다
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  useEffect(() => {
    // 특정 DOM 요소 접근 확인
    const observer = new IntersectionObserver(
      ([entry]) => {
        /**
         * entry.isIntersecting: 요소가 화면에 보이면 true.
         * hasNextPage: 서버에서 더 가져올 데이터가 있는지 여부.
         * isFetchingNextPage: 이미 데이터를 로드 중인지 확인. 중복 요청 방지.
         */
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // 다음 페이지 요청
        }
      },
      { threshold: 0.9 } // 요소가 90% 보여야 실행
    );

    // 돔요소 관찰 시작
    if (loadDataRef.current) {
      observer.observe(loadDataRef.current);
    }

    // 언마운트시 옵저버 해제
    return () => {
      if (loadDataRef.current) observer.unobserve(loadDataRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지 객체 데이터를 하나의 배열로 합친다
  const tableDataArr = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className={styles["infinity-table-wrapper"]}>
      <div className={styles["grid-table"]}>
        {/* 테이블 제목 */}
        <div className={styles["grid-header"]}>
          <div className={styles["grid-cell"]}>
            <input type="checkbox" />
          </div>
          <div className={styles["grid-cell"]}>조회</div>
          <div className={styles["grid-cell"]}>구분</div>
          <div className={styles["grid-cell"]}>이름</div>
          <div className={styles["grid-cell"]}>아이디</div>
        </div>
        {/* 테이블 데이터 */}
        {tableDataArr.map((it, idx) => (
          <div className={styles["grid-row"]} key={it.id}>
            <div className={styles["grid-cell"]}>
              <input type="checkbox" />
            </div>
            <div className={styles["grid-cell"]}>▶ {it.id}</div>
            <div className={styles["grid-cell"]}>선생님</div>
            <div className={styles["grid-cell"]}>
              {it.firstname} {it.lastname}
            </div>
            <div className={styles["grid-cell"]}>{it.email}</div>
          </div>
        ))}
      </div>
      {/* 테이블 끝 */}
      <div ref={loadDataRef}>
        {isFetchingNextPage ? (
          <p className={styles["infinity-table-loading"]}>Loading...</p>
        ) : (
          hasNextPage && (
            <p className={styles["infinity-table-loading"]}>Scroll down</p>
          )
        )}
      </div>
    </div>
  );
};

export default InfinityTable;
