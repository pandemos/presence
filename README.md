# presence
A team availability tracker

View project requirements in REQUIREMENTS.md
View implemented features in FEATURES.md

## Code Layout

- presence-api is the API layer. Implemented in node.js, it presents a REST API and uses a MongoDB backend.
- presence-web is the frontend layer. It uses node.js and AngularJS.

## Running

Fully dockerized. Run `docker-compose up` from the root directory.

Requires a .env file. `cp default.env .env` for a development environment.
