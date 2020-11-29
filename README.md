# nextjs-kids-clothing-storage-web-app

## Description

This web app is called "Neatify!" and was created with Next.js.

It has:

- a start page
- a register page
- a login page
- an account page, where the user account can be deleted
- a see-you-soon page, after logout
- a goodbye-page, after the account has been deleted
- a dashboard, where storage units can be added
- a page for each storage unit, where clothing items can be added
- a search page, where clothing items can be searched across all storage items
- a my-list page, where a list of clothing items can be created
- a print-my-list page, which is a printable version of the my-list page including the current date and checkboxes next to each clothing item on the list.

![Landing Page](/screenshots/landing-page-screenshot.jpg)

## This web app was built with the following technologies:

- Next.js
- Emotion/react
- TypeScript
- PostgresQL
- Ley
- Dotenv
- dotenvcli
- js-cookie
- Next-cookies
- cookie
- Argon2
- Csrf
- Jest
- Cypress.io

## Deployment

The web app has been deployed on Heroku.

## Planning & Design

The database scheme was planned with SQLDBM as well as DB Fiddle.

![SQLDBM](/screenshots/db-scheme-screenshot.png)

The project planned with GitHub Projects and Agantty.

![GitHub Projects](/screenshots/github-projects-screenshot.jpg)

The design of the website including layout, colors, fonts and icons was planned with Figma.

![Figma](/screenshots/figma-layout-design-screenshot.jpg)
![Figma](/screenshots/figma-layout-design-screenshot.jpg)

## Idea

Oftentimes, it is hard for parents to keep track of all the clothing their child\*(ren)\* have already grown out of, but should be kept for later reuse. Usually, these items are stored somewhere in basements, closets or storage rooms in big boxes and bags. After a certain time, the memory of what exactly is inside each of these becomes somewhat foggy and with two or even more children to take care of, it turns out to be far too time-consuming to rummage through all these boxes and bags in order just to find a pair of gloves or some t-shirts in a certain size. This may result in quickly popping into to the next store to buy even more clothes, because this seems the quickest - hence best - solution at this point in time.

My web app aims at helping parents to keep track of the clothes their children have grown out of and locate exactly what they need very quickly. Also, it can be used as a tool to help plan ahead the mandatory shopping of kids' clothes for the coming season, because it provides detailed information about which kinds of clothing in which size are held by the respective storage unit.

No waste of time, no waste of money!

## Database Setup

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```sh
psql -U postgres
```

**macOS**

```sh
psql postgres
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Then, to connect to the database using this new user, quit `psql` and reconnect:

```sh
\q
psql -U <user name> <database name>
```

### Running the migrations

To set up the structure and the content of the database, run the migrations using Ley:

```sh
yarn migrate up
```

To reverse the last single migration, run:

```sh
yarn migrate down
```

### Start application

- 1st terminal: `postgres` (starts dbms)
- 2nd terminal: `psql -U <user name> <database name>` (to work with database, enter new data etc.)
- 3rd terminal: `yarn dev` (starts web app on localhost:3000)
