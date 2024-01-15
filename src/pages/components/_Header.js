import React from 'react'
import styled from 'styled-components'

import { Grid } from '@digicatapult/ui-component-library'

export default function Header() {
  return <StyledHeader area="header">HEADER</StyledHeader>
}

const StyledHeader = styled(Grid.Panel)`
  color: white;
  display: grid;
  align-items: center;
  justify-items: center;
  background: #1a1a1a;
  width: 100%;
  height: 100%;
`
