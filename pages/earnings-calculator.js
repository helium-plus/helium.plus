import Head from "next/head";

export default function EarningsCalculator() {
  return (
    <div className="container">
      <Head>
        <title>Helium Hotspot Earnings Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Helium Hotspot Earnings Calculator</h1>
        <input type="number" placeholder={15} />
      </main>
    </div>
  );
}
