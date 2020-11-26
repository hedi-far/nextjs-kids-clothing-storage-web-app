import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300&display=swap');

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
        height: 50px;
        width: 150px;
        border-radius: 10%;
        color: white;
        background-color: #645e49;
        font-size: 16px;
      }

      button:hover {
        position: relative;
        top: 2px;
        left: 2px;
      }

      form {
        background-color: #fff2be;
        border-radius: 10%;
        box-shadow: 0 px 10px rgba(0, 0, 0, 0.2);
        padding: 20px;
        margin: 10px;
      }

      input {
        border-radius: 10%;
        margin: 5px;
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
