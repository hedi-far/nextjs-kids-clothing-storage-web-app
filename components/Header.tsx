import Link from 'next/link';
import { css } from '@emotion/core';
import React from 'react';

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
      Logo/Name
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
