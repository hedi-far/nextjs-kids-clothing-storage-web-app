import Link from 'next/link';
import { css } from '@emotion/react';
import type {} from '@emotion/react/types/css-prop';

const headerStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-radius: 10px;
  background-color: #fff;
  color: #645e49;
  height: 100%;
`;

const headerLinksStylesLogout = css`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 0 10px;
  height: 60px;

  & li {
    padding-right: 20px;
  }
`;

const headerLinksStylesLogin = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0 10px;
  height: 60px;

  & li {
    padding-right: 20px;
  }
`;

type Props = {
  loggedIn: Boolean;
};

export default function Header(props: Props) {
  return (
    <header css={headerStyles}>
      {props.loggedIn ? (
        <ul css={headerLinksStylesLogout}>
          {/* <li>
            {' '}
            <img
              css={whiteLogoStyles}
              src="/logo_white.svg"
              alt="Neatify! logo"
            />
          </li> */}

          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/account">
              <a>Account</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/search">
              <a>Search</a>
            </Link>
          </li>
          <li>
            {' '}
            <Link href="/dashboard/my-list">
              <a>List</a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a>Logout</a>
            </Link>
          </li>
        </ul>
      ) : (
        <ul css={headerLinksStylesLogin}>
          {/* <li>
            {' '}
            <img
              css={whiteLogoStyles}
              src="/logo_white.svg"
              alt="Neatify! logo"
              // width="90px"
              // height="50px"
            />
          </li> */}

          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>

          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
