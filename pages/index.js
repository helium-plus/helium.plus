import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";

// import styled from "@emotion/styled";

// const ToolCard = styled.a``;

import ToolCard from "../components/ToolCard";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function Home() {
  return (
    <>
      <NavBar />
      <Head>
        <title>Helium+</title>
      </Head>

      <main className="flex items-center justify-center flex-col pt-16">
        <section className="p-4 flex items-center lg:items-start justify-end flex-col lg:flex-row lg:flex-row-reverse w-full max-w-xl lg:max-w-4xl pb-20">
          <img
            className="h-auto lg:pb-6 pl-12 lg:pt-12 w-2/3 lg:w-1/2"
            src="/hotspot.png"
          />
          <div className="max-w-xl w-full lg:max-w-none flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-md lg:max-w-none text-white font-display lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              A Helium toolkit for power users
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              Helium is growing rapidly. Helium+ can help you make better sense
              of how it works, and find your path toward helping it grow even
              faster.
            </p>
          </div>
        </section>
        <section className="bg-white w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-4xl mx-auto p-4">
            <h2 className="font-display text-black text-3xl font-bold pt-6">
              Tools
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-4 gap-5">
              <ToolCard
                link="/earnings-calculator"
                title="Hotspot Earnings Calculator"
                description="A calculator to help you get a sense of how much you can expect your Helium-compatible gateway to earn based on the current blockchain data and your situation"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="hpblue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </ToolCard>
              <ToolCard
                link="/chain-vars"
                title="Chain Variables"
                description="The chain variables and their current values"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
                  />
                </svg>
              </ToolCard>

              <ToolCard
                link="/hnt-current-price"
                title="HNT Current Price"
                description="The current HNT price"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </ToolCard>

              <ToolCard
                link="/simple-earnings-calculator"
                title="Simple Earnings Calculator"
                description="A simplified version of the earnings calculator"
              >
                <svg
                  className="stroke-current text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </ToolCard>

              {/* <Link href="/simple-earnings-calculator">
                <ToolCard className="zh-5 bg-hpblue-900 w-1/2 p-6 rounded-lg">
                  Simple Earnings Calculator
                </ToolCard>
              </Link>
              <Link href="/hnt-current-price">
                <ToolCard className="zh-5 bg-hpblue-900 w-1/2 p-6 rounded-lg">
                  HNT Current Price
                </ToolCard>
              </Link> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
