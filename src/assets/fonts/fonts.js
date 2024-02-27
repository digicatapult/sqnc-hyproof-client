import { createGlobalStyle } from 'styled-components'
import Roboto from './Roboto-Regular.woff'
import RobotoBold from './Roboto-Bold.woff'
import RobotoLight from './Roboto-Light.woff'

export default createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: local('Roboto'), local('Roboto'),
        url(${Roboto}) format('woff');
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: local('Roboto Light'), local('Roboto-Light'),
        url(${RobotoLight}) format('woff');
        font-style: normal;
        font-weight: 300;
    }

    @font-face {
        font-family: 'Roboto';
        src: local('Roboto Bold'), local('Roboto-Bold'),
        url(${RobotoBold}) format('woff');
        font-style: bold;
        font-weight: 700;
    }
`
