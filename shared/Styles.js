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

        /* print styles */
        @media print {
          body {
            margin: 0;
            color: #000;
            background-color: #fff;

          }

          
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
        border-radius: 15px;
        border-style: none;
        color: white;
        background-color: #645e49;
        font-size: 16px;
        box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
      }

      button:hover {
        position: relative;
        top: 2px;
        left: 2px;
      }

      form {
        background-color: #fff2be;
        border-radius: 10%;
        box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
        padding: 20px;
        margin: 10px;
      }

      input {
        margin: 5px;
        border-radius: 15px;
        padding: 5px;
        border-style: none;
      }

      textarea {
        margin: 5px;
        border-radius: 15px;
        padding: 5px;
        border-style: none;
      }

      select {
        margin: 5px;
        border-radius: 15px;
        padding: 5px;
        border-style: none;
      }

      th,
      td {
        width: 100%;
        padding: 10px;
        text-align: center;
      }

      td {
        border-top: 0.2px solid #645e49;
        border-bottom: 0.2px solid #645e49;
      }

      tr {
        text-align: center;
      }

      table {
        border-collapse: collapse;
      }

      /* input [type='text'] {
        border-radius: 10%;
        margin: 5px;
      } */

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
