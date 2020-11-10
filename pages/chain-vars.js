import { useState } from "react";
import NavBar from "../components/core/NavBar";
import MetaTags from "../components/core/MetaTags";

const ChainVars = ({ chainVars }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const populateDescription = (key) => {
    // Default description
    let description = "[Default description]";

    switch (key) {
      case "min_score":
        description =
          "The minimum score for a hotspot to be eligible to get elected to a consensus group.";
        break;
      // TODO: add descriptions for the rest of the variables
      case "var_name":
        description = "Description.";
        break;
    }

    return description;
  };

  const copyText = (key) => {
    const el = document.createElement("textarea");
    el.value = chainVars.data[key];
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const sortVars = (varsObject) => {
    // TODO: convert object into an array so it can more easily be manipulated on the client side (give user sorting options, etc.)
    let chainVarsArray = [];
    Object.keys(chainVars.data).map((key, index) => {});
    return chainVarsArray;
  };

  return (
    <>
      <NavBar />
      <MetaTags
        title={"Helium Chain Variables — Helium Plus"}
        description={
          "All the chain variables and their current values as returned by the Helium API"
        }
        ogImageUrl={"https://helium.plus/images/og/c-v.png"}
        url="https://helium.plus/chain-vars"
      />
      <main className="flex items-center justify-center flex-col pt-4 lg:pt-20">
        <section className="p-4 flex items-start lg:items-start justify-start flex-col lg:flex-row w-full max-w-xl lg:max-w-4xl pb-12 lg:pb-20">
          <div className="max-w-xl w-full flex items-start justify-start flex-col">
            <h1 className="text-5xl max-w-xl text-white font-display pt-6 lg:pt-12 leading-tight lg:text-6xl text-left font-bold pr-2">
              Helium Chain Variables
            </h1>
            <p className="max-w-md text-lg font-body pt-4 text-gray-500 text-left">
              These are all of the current chain variables and the current
              values as returned by the API.
            </p>
          </div>
        </section>
        <section className="bg-gray-200 w-full flex items-center lg:items-start justify-end flex-col pb-64">
          <div className="max-w-xl w-full lg:max-w-4xl mx-auto p-4">
            <h2 className="font-display text-black text-3xl font-bold pt-6 pb-6">
              Chain Variables
            </h2>
            <div className="pb-10">
              <div className="lg:w-1/2 w-full relative">
                <button
                  className="absolute right-0 my-2 mx-2 py-1 px-1"
                  onClick={() => {
                    setFilterText("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4 text-gray-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <input
                  className="p-2 w-full"
                  value={filterText}
                  onChange={handleFilterTextChange}
                  placeholder="Filter variables"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10z lg:grid-cols-4 lg:p-1 lg:bg-gray-300 lg:rounded-lg">
              {Object.keys(chainVars.data).map((key, index) => {
                if (filterText === "" || key.includes(filterText)) {
                  return (
                    <>
                      <div
                        className={`${
                          index % 2 === 0 ? "lg:bg-gray-100" : ""
                        } col-span-4 lg:col-span-2 bg-white border px-4 py-2 text-hpgreen-100 font-display font-md break-normal`}
                      >
                        <p>{key}</p>

                        <p
                          className={`${
                            index % 2 === 0 ? "lg:bg-gray-100" : ""
                          } text-gray-500 font-body font-sm pb-12z pr-4 break-normal`}
                        >
                          {populateDescription(key)}
                        </p>
                      </div>
                      <div className="mb-10 lg:mb-0 col-span-4 lg:col-span-2 flex flex-row justify-between bg-hpblue-900 border border-gray-900 px-4 py-2">
                        <p
                          id={key}
                          className={`pr-4 pt-2 text-hpblue-100 font-body font-md break-normal w-full`}
                        >
                          {Array.isArray(chainVars.data[key]) ? (
                            <div className="break-all">
                              {chainVars.data[key].map(
                                (dataArrayItem, index) => {
                                  return (
                                    <div className="py-2 flex flex-row">
                                      <span className="text-gray-700 pr-2">
                                        {index}
                                      </span>
                                      <p
                                        className={`pb-3 ${
                                          index + 1 !==
                                          chainVars.data[key].length
                                            ? "border-b border-gray-800"
                                            : ""
                                        }`}
                                      >
                                        {dataArrayItem}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            chainVars.data[key]
                          )}
                        </p>
                        <div className="p-1">
                          <button
                            className="px-2 py-0 bg-gray-800 hover:bg-gray-700 h-10 rounded-md font-xs text-gray-200"
                            onClick={() => copyText(key)}
                          >
                            <svg
                              className="w-5 stroke-text text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const chainVarsRes = await fetch(`https://api.helium.io/v1/vars`);
  const chainVars = await chainVarsRes.json();
  const statsRes = await fetch(`https://api.helium.io/v1/stats`);
  const stats = await statsRes.json();

  return {
    revalidate: 60,
    props: { chainVars, stats },
  };
}

export default ChainVars;
