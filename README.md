# CLI-Task-Manager
This CLI (Command-Line Interface) Task Manager is a Node.js application that interacts with a PostgreSQL database using the pg library to manage tasks.

## Version
The current version of the CLI Task Manager is 0.0.1.

## Prerequisites
- Node.js installed
- PostgreSQL database configured
- Environment variables set for the database connection:
  - USER
  - HOST
  - DATABASE
  - PASSWORD
  - PORT
 
## Setup
1. Clone this repository.
2. Install dependencies:
`npm install`
3. Set up environment variables in a .env file.
4. Run the application:
`node app.js [options]`

## Usage
### Listing Tasks
To list tasks based on their status:
`node app.js --list [all|pending|done]`
### Creating a New Task
To create a new task:
`node app.js --new <task_name>`
### Deleting a Task
To delete a task by its ID:
`node app.js --delete <id>`
### Marking a Task as Done
To mark a task as complete by its ID:
`node app.js --done <id>`
### Help
To get help and see available commands:
`node app.js --help`
