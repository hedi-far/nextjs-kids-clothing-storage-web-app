import Link from 'next/link';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const header = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  font-size: 15px;
`;

export default function Header(props) {
  return (
    <header css={header}>
      Logo/Name
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/dashboard/dashboard">
        <a>Dashboard</a>
      </Link>
      <Link href="/dashboard/search">
        <a>Search</a>
      </Link>
      <Link href="/dashboard/my-list">
        <a>List</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/see-you-soon">
        <a>Logout</a>
      </Link>
    </header>
  );
}
