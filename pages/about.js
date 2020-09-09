import Head from "next/head";
import NavBar from "../components/NavBar";

const About = () => {
  return (
    <>
      <Head>
        <title>About Helium+</title>
      </Head>
      <NavBar />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-end flex-col lg:flex-row-reverse w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="h-auto lg:pb-6 w-1/3 lg:w-1/2 lg:pt-12">
            <img className="w-full" src="/h+.png" />
          </div>
          <div className="max-w-xl w-full lg:max-w-none flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-md lg:max-w-none text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              About Helium+
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              Hi there, and thanks for stopping by! I'm working on this website
              as a passion project because I've recently become obsessed with
              Helium.
            </p>

            <a
              href="https://twitter.com/helium_plus"
              target="_blank"
              className="focus:outline-none focus:border-none max-w-md text-lg font-body mt-4 text-hpblue-100 text-left"
            >
              Follow Helium+ on Twitter!
            </a>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              And feel free to{" "}
              <a
                href="mailto:dcj@hey.com"
                className="text-hpgreen-100 focus:outline-none focus:border-none"
              >
                reach out
              </a>
              ! <span className="text-gray-700 font-body">(dcj@hey.com)</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
