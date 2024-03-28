import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid } from '@digicatapult/ui-component-library'

import CertificateTimeInterval from './CertificateTimeInterval'

import { formatDate } from '../../utils/helpers'

import BgIconDateSVG from '../../assets/images/icon-date.svg'
import BgIconTimeSVG from '../../assets/images/icon-time.svg'

import BgSpinnerSVG from '../../assets/images/spinner-progress.svg'

const hasDate = (d) => typeof d === 'string' && !isNaN(Date.parse(d))
const hasEnergy = (e) => e !== null && e !== undefined && isFinite(e) && e > 0
const hasSize = (s) => s !== null && s !== undefined && isFinite(s) && s > 0
const hasEco2 = (c) => c !== null && c !== undefined && isFinite(c) && c >= 0

const convToKg = (g) => `${(g / 1000).toFixed(1)} kg`

export default function CertificateViewDetails({
  size,
  start,
  end,
  energy,
  eco2,
  posting,
  timestamp,
  revoked,
}) {
  return (
    <PaddedWrapperDiv>
      <ContainerFlexWrapDiv>
        {hasEco2(eco2) && (
          <FullWidthDiv>
            <GreenText>Timestamp of Certificate Issuance:</GreenText>
            <GreenBoldText>
              {!revoked ? formatDate(timestamp) : 'N/A (Certificate Revoked)'}
            </GreenBoldText>
          </FullWidthDiv>
        )}
        {hasDate(start) && hasDate(end) && (
          <FlexDiv>
            <Grid
              areas={[
                ['label_start', '-', 'label_end'],
                ['inputs_start', 'interval', 'inputs_end'],
              ]}
              columns={[
                'minmax(min-content, 1fr)',
                'auto',
                'minmax(min-content, 1fr)',
              ]}
              rows={['auto', 'auto']}
            >
              <Grid.Panel area="label_start">
                <HeadingDiv>Start of energy use</HeadingDiv>
              </Grid.Panel>
              <Grid.Panel area="inputs_start">
                <WrapDiv>
                  <HalfWrap>
                    <IconWrap>
                      <IconDate></IconDate>Date
                    </IconWrap>
                    <Text>{start.split('T')[0].split('-').join('/')}</Text>
                  </HalfWrap>
                  <HalfWrap>
                    <IconWrap>
                      <IconTime></IconTime>Time
                    </IconWrap>
                    <Text>{start.split('T')[1].slice(0, 5)}</Text>
                  </HalfWrap>
                </WrapDiv>
              </Grid.Panel>
              <CertificateTimeInterval
                sTimestamp={start}
                eTimestamp={end}
                bgColor="white"
              />
              <Grid.Panel area="label_end">
                <HeadingDiv>End of energy use</HeadingDiv>
              </Grid.Panel>
              <Grid.Panel area="inputs_end">
                <WrapDiv>
                  <HalfWrap>
                    <IconWrap>
                      <IconDate></IconDate>Date
                    </IconWrap>
                    <Text>{end.split('T')[0].split('-').join('/')}</Text>
                  </HalfWrap>
                  <HalfWrap>
                    <IconWrap>
                      <IconTime></IconTime>Time
                    </IconWrap>
                    <Text>{end.split('T')[1].split('.')[0]}</Text>
                  </HalfWrap>
                </WrapDiv>
              </Grid.Panel>
            </Grid>
          </FlexDiv>
        )}
        {hasEnergy(energy) && (
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>Electric energy use</HeadingDiv>
              <WrapShortDiv>{energy / 1000000} MWh</WrapShortDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        )}
        {hasSize(size) && (
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>H2 batch size</HeadingDiv>
              <WrapShortDiv>{size / 1000000} MWh</WrapShortDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        )}
        {(hasEco2(eco2) || posting) && (
          <FlexRoundedDiv bg={posting === true ? 'grey' : 'green'}>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>
                <IconWrap>
                  {!hasEco2(eco2) && posting && (
                    <>
                      <IconSpinner>
                        <svg viewBox="0 0 29 29">
                          <path d="M14.5 2 a 12.5 12.5 0 0 1 0 25 a 12.5 12.5 0 0 1 0 -25" />
                        </svg>
                      </IconSpinner>
                      Calculating & Posting Carbon Embodiment
                    </>
                  )}
                  {hasEco2(eco2) && !posting && <>Carbon Embodiment</>}
                </IconWrap>
              </HeadingDiv>
              <WrapPaddedDiv>
                {!hasEco2(eco2) && posting && <GreySpan></GreySpan>}
                {hasEco2(eco2) && !posting && `${convToKg(eco2)} CO2e`}
              </WrapPaddedDiv>
            </ContainerFullWidthWrapDiv>
          </FlexRoundedDiv>
        )}
      </ContainerFlexWrapDiv>
    </PaddedWrapperDiv>
  )
}

const PaddedWrapperDiv = styled.div`
  padding: 4px;
  height: calc(100% - 200px);
  min-height: 400px;

  text-align: left;
`

const FullWidthDiv = styled.div`
  margin: 8px 8px 20px 8px;
  width: 100%;
`

const ContainerFlexWrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const FlexDiv = styled.div`
  margin: 0px 8px 20px 8px;
  min-width: 169px;
  flex-grow: 1;

  color: #27847a;
  border-left: 1px solid #27847a;
`

const FlexRoundedDiv = styled.div`
  margin: 0px 8px 20px 8px;
  min-width: 169px;
  flex-grow: 1;
  padding: 20px;

  border-radius: 10px;
  background: ${({ bg }) => (bg === 'grey' ? '#f8f8f8' : '#33e58c')};
`

const Shimmer = keyframes`
  to {
    background-position-x: 120%;
  }
`

const GreySpan = styled.span`
  margin: 20px 0px;
  min-width: 180px;
  padding: 10px;
  padding-left: 0px;

  background-color: gray;

  background: linear-gradient(-82deg, #eee 42%, #fafafa 50%, #efefef 58%) -50% / 150%;
  background-position-x: -50%;
  animation: ${Shimmer} 1.5s linear infinite;
}
`

const ContainerFullWidthWrapDiv = styled.div`
  padding-left: 5px;
`

const HeadingDiv = styled.div`
  color: #1a1a1a;
  height: 25px;
  font: 700 15px/25px Roboto;
  padding-left: 8px;
`

const WrapShortDiv = styled.div`
  height: 42px;
  line-height: 42px;
  display: flex;
  flex-wrap: nowrap;
  padding-left: 8px;
`

const WrapDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0;
`

const WrapPaddedDiv = styled.div`
  height: 68px;
  line-height: 68px;
  display: flex;
  flex-wrap: nowrap;
  padding-left: 8px;
  margin-bottom: -18px;
`

const HalfWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`

const IconWrap = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  font: 500 14px/26px Roboto;
  color: #1a1a1a;
`

const Animation = keyframes`
  0% {
    stroke-dasharray: 0 78.5399;
  }
`

const IconSpinner = styled.span`
  width: 29px;
  height: 29px;
  margin-right: 10px;
  background: transparent url(${BgSpinnerSVG}) no-repeat;

  & svg {
    width: 29px
    height: 29px
    fill: none;

    & path {
      fill: none;

      stroke: #33e58c;

      stroke-width: 4;
      stroke-linecap: butt;
      stroke-dasharray: 78.5399 78.5399;

      animation: ${Animation} 18s ease-out forwards;
    }
  }
`

const IconDate = styled.span`
  width: 26px;
  height: 26px;
  background: transparent url(${BgIconDateSVG}) no-repeat;
`

const IconTime = styled.span`
  width: 26px;
  height: 26px;
  background: transparent url(${BgIconTimeSVG}) no-repeat;
`

const GreenText = styled.div`
  color: #27847a;
  font: normal 400 18.4px/0 Roboto;
`

const GreenBoldText = styled.div`
  color: #27847a;
  font: normal 700 18.4px/0 Roboto;
  margin: 26px 0 8px 0;
`

const Text = styled.div`
  display: flex;
  height: 26px;
  min-width: 90px;
  font: 500 18px/26px Roboto;
  color: #1a1a1a;
`
