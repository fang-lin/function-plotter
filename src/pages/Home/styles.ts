import styled, {createGlobalStyle} from 'styled-components';
import {Link as ReactRouterLink} from 'react-router-dom';
import infinityIcon from '../../images/icons/infinity.png';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
};

export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};

export const defaultStyle = `
    margin: 0;
    padding: 0;
    height: 100%;
    background: #ccc;
    font-family: 'Fira Code',monospace,consolas,courier;
`;

export const DefaultGlobalStyle = createGlobalStyle`
  html, body, #root {
    ${defaultStyle}
  }
`;

export const HomeRoot = styled.div`
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HomeHeader = styled.header`
  padding: 30px 0;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;

export const HomeFooter = styled.footer`
  padding: 30px 0;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  font-size: 12px;
  line-height: 24px;
`;

export const HomeContainer = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 36px;
  line-height: 54px;
`;

export const TitleIcon = styled.img`
  height: 48px;
  width: 48px;
  vertical-align: top;
  margin: 0 16px 0 0;
`;

export const EquationsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const EquationsListItem = styled.li`
  width: 100%;
  font-size: 12px;
  padding: 0 0 0 31px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${device.tablet} {
    width: calc(100% / 2);
  }
  @media ${device.laptop} {
    width: calc(100% / 3);
  }

  &:before {
    content: '';
    position: absolute;
    margin: 25px 0 0 -30px;
    height: 16px;
    width: 16px;
    background-size: contain;
    background-image: url(${infinityIcon});
  }
`;
export const Paragraph = styled.p`
  font-size: 12px;
  display: block;
`;

export const FooterParagraph = styled(Paragraph)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Head3 = styled.h3`
  font-size: 20px;
  color: #333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
`;

export const Anchor = styled.a`
  color: #333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

export const FooterAnchor = styled(Anchor)`
  display: inline-block;
`;

export const Link = styled(ReactRouterLink)`
  text-decoration: none;
  color: #333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, .7);

  :hover {
    text-decoration: underline;
  }
`;
