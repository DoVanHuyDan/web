#### Installation

- Install [node](https://nodejs.org/en/) or [node for Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
- clone this repo
- run: `npm install`

#### Development & Deployment

- make `.env` from `.env.example` and edit REACT_APP_API_URL: the API server URL
  ```
  mv .env.example .env
  vim .env
  ```
- development:
  ```
  $ npm start
  ```
