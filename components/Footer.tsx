import Link from 'next/link';
import { css } from '@emotion/react';
// import type {} from '@emotion/react/types/css-prop';

const footerStyles = css`
  display: grid;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #e6e6e6;
  height: 100%;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 500px;
`;

const creditStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  justify-content: space-between;
  /* background-color: red; */
  color: black;
`;

const linkStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  justify-content: space-around;
  color: black;
  /* background-color: red; */
`;

const darkLogoStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  justify-content: space-around;
`;

export default function Footer() {
  return (
    <footer css={footerStyles}>
      <img
        css={darkLogoStyles}
        src="/logo.svg"
        alt="Neatify! logo"
        width="90px"
        height="100px"
      />
      <ul css={creditStyles}>
        <li>This website was created by Hedwig Farthofer, Vienna, 2020,</li>
        <li>Icons made by www.flaticon.com.</li>
        <li>Images from https://undraw.co/.</li>
      </ul>
      <ul css={linkStyles}>
        <li>GitHub</li>
        <li>LinkedIn</li>
        <li>Twitter</li>
      </ul>
    </footer>
  );
}
