# stick-and-puck

A script to gather stick and puck and drop-in times from the closest rinks to where I live, then add them as events to a Google Calendar.

## Features

-   Fetching data from the KCI API
-   Fetching data from the OVA/LIA API
-   Creating events via the Google Calendar SDK

### Upcoming Features

-   Checking the calendar and filtering out any duplicate, already created events before creating events for a rink.

## Run Locally

Create a Google Calendar, take note of the Calendar ID

Enable a Service Account in Google Cloud

Generate an access key for the Service Account

Save the access key in the repo

Share the Google Calendar to the Service Account with appropriate permissions to edit events

Accept the Google Calendar share by sending an insert calendar request via the SDK using the Calendar ID

Clone the project

```zsh
  git clone git@github.com:booshja/stick-and-puck.git
```

Go to the project directory

```zsh
  cd stick-and-puck
```

Install dependencies

```zsh
  npm install
```

Run the script

```zsh
  npm run start
```

Check your Calendar and the terminal output

Level up your hockey skillz 🏒🥅

## Tech Stack

TypeScript, Google API TypeScript SDK

## Feedback

For feedback, email [jacobandesdev@gmail.com](mailto:jacobandesdev@gmail.com).

## Authors

-   [@booshja](https://www.github.com/booshja)
