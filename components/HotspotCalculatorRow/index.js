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

const CalculateButton = styled.button`
  height: 40px;
  background-color: #42de9f;
  border-radius: 5px;
  /* margin: 5px; */
  /* padding: 5px; */
  min-width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* font-family: Open Sans; */
  font-weight: 400;
  font-size: 1em;
  line-height: 1.75em;
  color: #000;
`;

const AddRowButton = styled.button`
  height: 40px;
  background-color: #1e2b37;
  color: white;
  border-radius: 5px;
  /* margin: 5px; */
  /* padding: 5px 15px; */
  /* font-family: Open Sans; */
  font-weight: 400;
  font-size: 1em;
  line-height: 1.75em;
  color: #969696;
`;
const RemoveRowButton = styled.button`
  /* height: 30px; */
  /* font-size: 12px; */
  /* background-color: #2b3a47; */
  /* border-radius: 5px; */
  /* margin: 20px 10px; */
  /* padding: 5px; */
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
    <Container>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <p className="font-display text-hpgreen-100 bg-black p-3 rounded-b-lg ml-6">
          {props.name}
        </p>

        {!props.firstRow && (
          <button
            className="font-body text-black text-sm font-bold px-2 py-1 m-2 bg-hpblue-700 rounded-lg"
            onClick={props.removeRowHandler}
          >
            Remove -
          </button>
        )}
      </div>

      <div className="px-8 pb-10 pt-2">
        <Prose className="font-body">
          How many hotspots are currently active near the location where you're
          planning on putting this hotspot?
        </Prose>

        <div className="flex flex-col lg:flex-row justify-start align-start">
          <DensityOptionCard
            className="w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600 p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0"
            css={css`
              border: 2px solid
                ${props.selectedDensity === 1 ? hpGreen : "transparent"};
            `}
            onClick={props.density1Handler}
          >
            <DensityOptionCardTitle>None</DensityOptionCardTitle>
          </DensityOptionCard>
          <DensityOptionCard
            className="w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600 p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0"
            css={css`
              border: 2px solid
                ${props.selectedDensity === 2 ? hpGreen : "transparent"};
            `}
            onClick={props.density2Handler}
          >
            <DensityOptionCardTitle>A few</DensityOptionCardTitle>
          </DensityOptionCard>
          <DensityOptionCard
            className="w-full lg:w-1/3 h-32 lg:h-40 bg-hpblue-600 p-10 rounded-lg mb-4 lg:mr-4 lg-mb-0"
            css={css`
              border: 2px solid
                ${props.selectedDensity === 3 ? hpGreen : "transparent"};
            `}
            onClick={props.density3Handler}
          >
            <DensityOptionCardTitle>Several</DensityOptionCardTitle>
          </DensityOptionCard>
        </div>
      </div>
      <div
        css={css`
          background-color: #070e15;
          height: 1px;
          width: 100%;
        `}
      />
      {props.lastRow && (
        <div className="px-8 py-5 bg-hpblue-1000 rounded-b-xl">
          {props.warningMessage && (
            <p className="text-hpgreen-100 font-body font-bold pb-4">
              {props.warningMessage}
            </p>
          )}
          <div className="flex flex-row">
            <CalculateButton
              className="font-display text-black px-4 py-1 mr-4"
              onClick={props.calculateFunction}
            >
              Calculate
            </CalculateButton>
            <AddRowButton
              className="font-display text-black px-4 py-1"
              onClick={props.addRowHandler}
            >
              Add hotspot +
            </AddRowButton>
          </div>
        </div>
      )}
    </Container>
  );
};

export default HotspotCalculatorRow;
