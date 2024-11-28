import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import style from "./searchable.module.css";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // string, string[], undefined로 추론되기에 as string으로 단언
  const q = router.query.q as string;

  // q값이 변하면 q에 값이 있다면 q값을 넣고 없다면 빈 문자열을 넣음.
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // 입력한 value값 search state에 넣어주기
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 비어있거나 현재 페이지와 내용이 같다면 이동하지 않음. 다르면 이동.
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  // enter키 입력시 이동
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} onKeyDown={onKeyDown} onChange={onChangeSearch} placeholder="검색어를 입력하세요 ..." />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
