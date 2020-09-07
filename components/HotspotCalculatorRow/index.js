import React from "react";
import { propTypes } from "react-currency-format";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const hpGreen = `#42DE9F`;
const hpBlue = `#42D1E4`;
const hpLightGrey = `#CCC`;
const hpWhite = `#FFF`;

const Prose = styled.p`
  /* font-family: Open Sans; */
  font-weight: 400;
  color: ${hpLightGrey};
  margin: 1.25em 0;
  font-size: 1em;
  line-height: 1.75em;
`;

const Container = styled.div`
  /* background-color: #1e2b37;
  width: 100%;
  border-radius: 15px; */

  /* display: flex; */
  /* flex-direction: column; */
`;

const DensityOptionCardTitle = styled.p`
  color: white;
  font-size: 16px;
`;

const HotspotCalculatorRow = (props) => {
  const DensityOptionCard = styled.button`
    /* background-color: #334a60; */
    /* width: 150px; */
    /* height: 150px; */
    /* margin: 16px; */
    /* border-radius: 5px; */
    /* :focus {
      border: 2px solid ${hpGreen};
      outline: none;
    } */
  `;
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-black p-3 rounded-b-lg ml-6 flex flex-row items-center">
          <p className="font-display text-hpgreen-100">{props.name}</p>

          {!props.firstRow && (
            <button
              className="font-body text-black text-sm font-bold p-1 ml-4 bg-gray-900 rounded-full focus:outline-none focus:border-none"
              onClick={props.removeRowHandler}
            >
              <svg
                className={`w-4 h-auto stroke-text text-gray-600`}
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
            </button>
          )}
        </div>
      </div>

      <div className="px-8 pb-10 pt-2">
        <Prose className="font-body">
          How many hotspots are currently active near the location where you're
          planning on putting this hotspot?
        </Prose>

        <div className="flex flex-col lg:flex-row justify-start align-start">
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 1
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density1Handler}
          >
            <p className="text-base text-white">None</p>
          </button>
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 2
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density2Handler}
          >
            <p className="text-base text-white">A few</p>
          </button>
          <button
            className={`w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600  p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0 focus:border-solid focus:outline-none ${
              props.selectedDensity === 3
                ? "border-solid border-2 border-hpgreen-100 focus:shadow-none"
                : ""
            }`}
            onClick={props.density3Handler}
          >
            <p className="text-base text-white">Several</p>
          </button>
        </div>
      </div>
      <div className="bg-hpblue-1000 h-px w-full" />
    </>
  );
};

export default HotspotCalculatorRow;
