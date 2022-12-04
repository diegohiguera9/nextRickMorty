import "../styles/globals.css";


//Componente que envuelve toda nuestra aplicacion

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
