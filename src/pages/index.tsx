import { useRouter } from "next/router";

import style from "./index.module.css";
import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1 className={style.h1}>인덱스</h1>
      <h1 className={style.h2}>인덱스</h1>
      <button onClick={() => router.push("/search")}>search 이동</button>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
