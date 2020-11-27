import Link from 'next/link';
import { css } from '@emotion/react';
// import type {} from '@emotion/react/types/css-prop';

const footerStyles = css`
  padding: 50px;
  display: grid;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #e6e6e6;
  /* height: 100%; */
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 500px;
  position: relative;
  bottom: 0;
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
        <li>
          Icons made by
          <Link href="https://www.flaticon.com/authors/freepik">
            <a> Freepik </a>
          </Link>
          from
          <Link href="https://www.flaticon.com/">
            <a> www.flaticon.com</a>
          </Link>
        </li>
        <li>
          Images from{' '}
          <Link href="https://undraw.co/"> https://undraw.co/ </Link>.
        </li>
      </ul>
      <ul css={linkStyles}>
        <li>
          <Link href="https://github.com/hedi-far">
            <a>
              <img src="/icons/github.svg" alt="GitHub logo" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/in/hedwig-farthofer/">
            <a>
              <img src="/icons/linkedIn.svg" alt="LinkedIn logo" />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/Hedi12947458">
            <a>
              <img src="/icons/twitter.svg" alt="Twitter logo" />
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
