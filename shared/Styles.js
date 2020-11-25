import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      html,
      body {
        padding: 0;
        margin-left: 10px;
        margin-right: 10px;
        /* background-color: #c8c6c3; */
        /* textcolor */
        color: #645e49;
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap');
        font-family: Roboto Slab, -apple-system, BlinkMacSystemFont, Segoe UI,
          Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
          Helvetica Neue, sans-serif;
        font-size: 16px;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
        position: relative;
        top: 2px;
        left: 2px;
      }

      button {
        cursor: pointer;
      }

      .container {
        max-width: 1100px;
        margin: 0 auto;
        overflow: auto;
        padding: 0 40px;
      }

      .flex {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat (2, 1fr);
        gap: 20px;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      //XL
      h1 {
        font-size: 32px;
      }

      //L
      h2 {
        font-size: 24px;
      }

      //M
      h3 {
        font-size: 16px;
      }

      //S
      h4 {
        font-size: 12px;
      }

      //XS
      h5 {
        font-size: 10px;
      }

      img {
        width: 100%;
      }

      ul {
        list-style-type: none;
      }
    `}
  />
);

export default globalStyles;
