import React, { useRef, useEffect, useState } from "react";
import styles from "./InfinityTable.module.scss";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinityData } from "../../../module/api/fetchInfinityData.ts";
import ToolTip from "../tooltip/ToolTip.tsx";
import { FetchDataResponse } from "../../interface/table.ts";

// 상태 타입 정의
interface ExpandedRows {
  [key: string]: boolean;
}

interface MouseEnterState {
  [key: string]: boolean;
}

const InfinityTable = () => {
  const loadDataRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 dom 체크 ref
  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({}); // 서브 행 상태
  const [mouseEnter, setMouseEnter] = useState<MouseEnterState>(false); // 마우스 호버시 툴팁

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
  } = useInfiniteQuery<InfiniteData<FetchDataResponse>, Error>({
    queryKey: ["infinityData"],
    queryFn: fetchInfinityData,
    initialPageParam: 1, // 초기 페이지 설정
    getNextPageParam: (serverData) => serverData.nextParam, // 다음 페이지
  });

  /** - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  - 함수 : 서브 토글 여는 함수
  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id], // 클릭한 행의 상태를 토글
    }));
  };

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

  const handleWordCount = (word) => {
    if (word.length > 8) {
      return word.slice(0, 8) + "..."; // 8글자까지만 자르고 뒤에 '...' 추가
    } else {
      return word; // 8글자 이하일 경우 그대로 반환
    }
  };
  return (
    <div className={styles["infinity-table-wrapper"]}>
      <div className={styles["grid-table"]}>
        {/* 테이블 제목 */}
        <div className={styles["grid-header"]}>
          <div className={styles["grid-cell"]}>
            <input type="checkbox" />
          </div>
          <div className={styles["grid-cell"]}>조회</div>
          <div className={styles["grid-cell"]}>이름</div>
          <div className={styles["grid-cell"]}>이메일</div>
          <div className={styles["grid-cell"]}>전화번호</div>
          <div className={styles["grid-cell"]}>성별</div>
        </div>
        {/* 테이블 데이터 */}
        {tableDataArr.map((it, idx) => (
          <>
            <div className={styles["grid-row"]} key={it.id}>
              <div
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                <input type="checkbox" />
              </div>
              <div
                onClick={() => toggleRow(it.id)}
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                {expandedRows[it.id] ? "▼" : "▶"}
              </div>
              <div
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                {it.firstname} {it.lastname}
              </div>
              <div
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                {it.email}
              </div>
              <div
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                {it.phone}
              </div>
              <div
                className={
                  expandedRows[it.id]
                    ? styles["grid-cell-select"]
                    : styles["grid-cell"]
                }
              >
                {it.gender}
              </div>
            </div>
            {/* 서브 행 */}
            {expandedRows[it.id] && (
              <div className={styles["sub-row"]} key={it.address.id}>
                <div className={styles["sub-cell"]}> </div>
                <div className={styles["sub-cell"]}></div>
                <div className={styles["sub-cell"]}>ㄴ</div>
                <div className={styles["sub-cell"]}>상세주소</div>
                <div className={styles["sub-cell"]}>{it.address.city}</div>
                <div
                  className={styles["sub-tooltip-cell"]}
                  onMouseEnter={() =>
                    setMouseEnter((prev) => ({
                      ...prev,
                      [it.id]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setMouseEnter((prev) => ({
                      ...prev,
                      [it.id]: false,
                    }))
                  }
                >
                  {handleWordCount(
                    `${it.address.streetName} ${it.address.country}`
                  )}
                  {mouseEnter[it.id] && (
                    <ToolTip
                      text={`${it.address.streetName} ${it.address.country}`}
                    />
                  )}
                </div>
              </div>
            )}
          </>
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
