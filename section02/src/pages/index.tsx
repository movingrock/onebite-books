import { useRouter } from "next/router";
import style from "./index.module.css";
import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate: 3,
  };
};

// export const getServerSideProps = async () => {
//   // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
//   // return 값을 page component에게 넘겨줌.
//   // 사전 렌더링 과정에서 서버 측에서 단 1번만 실행됨.
//   // return 값은 반드시 props라는 객체 프로퍼티를 포함하는 단 하나의 객체여야만 함.
//   // InferGetStaticPropsType<typeof getServerSideProps>
//   const [allBooks, recoBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요." />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
