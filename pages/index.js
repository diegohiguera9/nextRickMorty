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
        {err && <p>Something went wrong...</p>}
        {rick.length === 0 && <p>No characters found...</p>}
        <div className={styles.main}>
          {rick.length > 0 &&
            rick.map((character, index) => {
              return (
                <Link
                  key={`${index}${character.name}`}
                  className={styles.cardConatiner}
                  href={`character/${character.id}`}
                >
                  <div className={styles.cardConatiner__image}>
                    <Image
                      alt={`${character.name}`}
                      src={character.image}
                      width={400}
                      height={400}
                      priority={index < 2}
                    />
                  </div>
                  <div className={styles.cardConatiner__text}>
                    <h2>{character.name}</h2>
                    <div>{`${character.status}-${character.species}`}</div>
                    <span></span>
                    <div>Last known location</div>
                    <div>{character.location.name}</div>
                    <span></span>
                    <div>First seen in</div>
                    <div>{character.origin.name}</div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps({req,res}) {
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
