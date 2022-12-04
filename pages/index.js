import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import PageLayout from "../components/PageLayout";

export default function Home({ rick, err }) {
  const router = useRouter();
  return (
    <PageLayout title="NewsApp-Home">
      <div className={styles.container}>
        <h1 className={styles.container__other}>Aprendiendo next js desde 0</h1>
        <Link className={styles.about} href="/about">
          Link a about
        </Link>
        <button className={styles.button} onClick={() => router.push("/about")}>
          Boton para navegar a about
        </button>
        {err && <p>Something went wrong...</p>}
        {rick.length === 0 && <p>No characters found...</p>}
        {rick.length > 0 &&
          rick.map((character, index) => {
            return (
              <div key={`${index}${character.name}`}>
                <div>{character.name}</div>
                <Image alt={`${character.name}`} src={character.image} width={300} height={450} layout='responsive'/>
              </div>
            );
          })}
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character", {
      method: "GET",
    });
    if (response.ok) {
      const { results } = await response.json();
      return {
        props: {
          rick: results,
        },
      };
    }
    throw new Error("Something went wrong");
  } catch (err) {
    err = JSON.stringify(err);
    return {
      props: {
        rick: [],
        err,
      },
    };
  }
}
