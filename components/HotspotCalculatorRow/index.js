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
  font-family: Open Sans;
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
  margin: 5px;
  padding: 5px;
  min-width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-family: Open Sans;
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
  margin: 5px;
  padding: 5px 15px;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 1em;
  line-height: 1.75em;
  color: #969696;
`;
const RemoveRowButton = styled.button`
  height: 30px;
  font-size: 12px;
  background-color: #2b3a47;
  border-radius: 5px;
  margin: 20px 10px;
  padding: 5px;
`;

const DensityOptionCardTitle = styled.p`
  color: white;
  font-size: 16px;
`;

const HotspotCalculatorRow = (props) => {
  const DensityOptionCard = styled.button`
    background-color: #334a60;
    width: 150px;
    height: 150px;
    margin-right: 16px;
    border-radius: 5px;
    :focus {
      border: 2px solid ${hpGreen};
      outline: none;
    }
  `;
  return (
    <Container>
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <p
          css={css`
            margin: 20px;
            color: ${hpGreen};
          `}
        >
          {props.name}
        </p>

        {!props.firstRow && (
          <RemoveRowButton onClick={props.removeRowHandler}>
            Remove -
          </RemoveRowButton>
        )}
      </div>

      <div
        css={css`
          padding: 0 20px 20px 20px;
        `}
      >
        <Prose>
          How many hotspots are currently active near the location where you're
          planning on putting this hotspot?
        </Prose>

        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: flex-start;
          `}
        >
          <DensityOptionCard
            css={css`
              border: 2px solid
                ${props.selectedDensity === 1 ? hpGreen : "transparent"};
            `}
            onClick={props.density1Handler}
          >
            <DensityOptionCardTitle>None</DensityOptionCardTitle>
          </DensityOptionCard>
          <DensityOptionCard
            css={css`
              border: 2px solid
                ${props.selectedDensity === 2 ? hpGreen : "transparent"};
            `}
            onClick={props.density2Handler}
          >
            <DensityOptionCardTitle>A few</DensityOptionCardTitle>
          </DensityOptionCard>
          <DensityOptionCard
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
        <div
          css={css`
            background-color: #070e15;
            border-radius: 0 0 15px 15px;
            padding: 20px;
            display: flex;
            flex-direction: row;
          `}
        >
          <CalculateButton onClick={props.calculateFunction}>
            Calculate
          </CalculateButton>
          <AddRowButton onClick={props.addRowHandler}>
            Add hotspot +
          </AddRowButton>
        </div>
      )}
    </Container>
  );
};

export default HotspotCalculatorRow;
