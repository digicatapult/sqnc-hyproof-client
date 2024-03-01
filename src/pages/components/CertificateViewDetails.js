import React from 'react'
import styled from 'styled-components'

import CertificateTimeInterval from './CertificateTimeInterval'

import BgIconDateSVG from '../../assets/images/icon-date.svg'
import BgIconTimeSVG from '../../assets/images/icon-time.svg'

import BgSpinnerSVG from '../../assets/images/spinner-progress.svg'

const hasDate = (d) => typeof d === 'string' && !isNaN(Date.parse(d))
const hasEnergy = (e) => e !== null && e !== undefined && isFinite(e) && e > 0
const hasSize = (s) => s !== null && s !== undefined && isFinite(s) && s > 0
const hasEco2 = (c) => c !== null && c !== undefined && isFinite(c) && c >= 0

export default function CertificateViewDetails({
  size,
  start,
  end,
  energy,
  eco2,
  posting,
  // unconfirmedEco2,
}) {
  return (
    <PaddedWrapperDiv>
      <ContainerFlexWrapDiv>
        {hasDate(start) && hasDate(end) && (
          <FlexLargeDiv>
            <ContainerFlexNoWrapDiv>
              <GrowingDiv>
                <HeadingDiv>Start timestamp of energy use</HeadingDiv>
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
              </GrowingDiv>
              <CertificateTimeInterval
                sTimestamp={start}
                eTimestamp={end}
                bgColor="white"
              />
              <GrowingDiv>
                <HeadingDiv>End timestamp of energy use</HeadingDiv>
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
              </GrowingDiv>
            </ContainerFlexNoWrapDiv>
          </FlexLargeDiv>
        )}
        {hasEnergy(energy) && (
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>Electric energy use</HeadingDiv>
              <WrapShortDiv>{energy / 1000000} kWh</WrapShortDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        )}
        {hasSize(size) && (
          <FlexDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>H2 batch size</HeadingDiv>
              <WrapShortDiv>{size / 1000000} kWh</WrapShortDiv>
            </ContainerFullWidthWrapDiv>
          </FlexDiv>
        )}
        {/* OLD: hasEco2(eco2) */}
        {true == false && (
          <FlexRoundedDiv>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>Carbon Embodiment</HeadingDiv>
              <WrapPaddedDiv>{eco2} g CO2e</WrapPaddedDiv>
            </ContainerFullWidthWrapDiv>
          </FlexRoundedDiv>
        )}
        {/* NEW */}
        {/* hasEco2(eco2) || posting */}
        {(2 == 2 || 1 == 1) && (
          <FlexRoundedDiv bg={posting === true ? 'grey' : 'green'}>
            <ContainerFullWidthWrapDiv>
              <HeadingDiv>
                <IconWrap>
                  {!hasEco2(eco2) && posting && (
                    <>
                      <IconSpinner></IconSpinner>Calculating Carbon Embodiment
                    </>
                  )}
                  <>
                    <IconSpinner></IconSpinner>Calculating Carbon Embodiment
                  </>
                  {hasEco2(eco2) && !posting && <>Carbon Embodiment</>}
                </IconWrap>
              </HeadingDiv>
              <WrapPaddedDiv>
                {!hasEco2(eco2) && posting && <GreySpan></GreySpan>}
                {hasEco2(eco2) && !posting && `${eco2} g CO2e`}
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
  background: ${({ bg }) => (bg === 'grey' ? '#efefef' : '#33e58c')};
`

// const FlexGreyRoundedDiv = styled(FlexRoundedDiv)`
//   background: grey;
// `

// const BlackDiv = styled(FlexRoundedDiv)`
//   padding: 10px;
//   border-radius: 0;
//   height: 28px;
//   line-height: 68px;
//   margin-top: 20px;
//   padding-left: 8px;
//
//   background: #404040;
// `

const GreySpan = styled.span`
  margin: 20px 0px;
  min-width: 100px;
  padding: 10px;
  padding-left: 0px;

  background: #d9d9d9;
`

const FlexLargeDiv = styled(FlexDiv)`
  min-width: 354px;
  border-left: 0;
`

const ContainerFlexNoWrapDiv = styled.div`
  padding-left: 5px;
  display: flex;
  flex-wrap: nowrap;
`

const ContainerFullWidthWrapDiv = styled.div`
  padding-left: 5px;
`

const GrowingDiv = styled.div`
  flex-grow: 1;
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
  height: 82px;
  line-height: 82px;
  display: flex;
  flex-wrap: nowrap;
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
  width: 50%;
  height: 52px;
  line-height: 52px;
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

const IconSpinner = styled.span`
  width: 29px;
  height: 29px;
  margin-right: 10px;
  background: transparent url(${BgSpinnerSVG}) no-repeat;
`

const Text = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  min-width: 90px;
  font: 500 18px/26px Roboto;
  color: #1a1a1a;
`
