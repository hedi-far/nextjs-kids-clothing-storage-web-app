import Link from 'next/link';
import React from 'react';
import { css } from '@emotion/core';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin-bottom: 40px;
`;

type Props = {
  loggedIn: Boolean;
};

export default function Header(props: Props) {
  return (
    <header css={headerStyles}>
      Neatify!
      <Link href="/">
        <a>Home</a>
      </Link>
      {props.loggedIn ? (
        <>
          <Link href="/dashboard/">
            <a>Dashboard</a>
          </Link>
          <Link href="/dashboard/search">
            <a>Search</a>
          </Link>
          <Link href="/dashboard/my-list">
            <a>List</a>
          </Link>
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </>
      ) : (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
    </header>
  );
}
