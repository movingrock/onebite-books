import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";

// SSG
// SSG는 빌드타임에 딱 한 번 실행됨.
// 그렇기에 query string은 사용자가 직접 입력한 값이 들어오기에 build타임에서는 알 수 없음.
// 그러므로 SSG 방식에서는 page Component에서 직접 데이터 패칭을 해줘야함.
// ==============불가능한 코드
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

// SSR
// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요." />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
