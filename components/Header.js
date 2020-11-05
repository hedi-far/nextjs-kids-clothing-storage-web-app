import Link from 'next/link';
import { css } from '@emotion/core';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin-bottom: 40px;
`;

export default function Header() {
  return (
    <header css={headerStyles}>
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
