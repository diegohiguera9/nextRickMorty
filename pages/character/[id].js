import PageLayout from "../../components/PageLayout";
import styles from '../../styles/Home.module.scss'
import Image from "next/image";

export default function Character({ rick }) {
  return (
    <PageLayout>
        <div className={styles.oneWraper}>
      <div
        className={styles.cardConatiner}
      >
        <div className={styles.cardConatiner__image}>
          <Image
            alt={`${rick.name}`}
            src={rick.image}
            width={400}
            height={400}
          />
        </div>
        <div className={styles.cardConatiner__text}>
          <h2>{rick.name}</h2>
          <div>{`${rick.status}-${rick.species}`}</div>
          <span></span>
          <div>Last known location</div>
          <div>{rick.location.name}</div>
          <span></span>
          <div>First seen in</div>
          <div>{rick.origin.name}</div>
          <span></span>
          <div>Gender</div>
          <div>{rick.gender}</div>
        </div>
      </div>
      </div>
    </PageLayout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${params.id}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const results = await response.json();
      return {
        props: {
          rick: results,
        },
      };
    }
    throw new Error("Something went wrong");
  } catch (err) {
    console.log(err);
  }
}
