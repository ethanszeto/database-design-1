# database-design-1

This project simulates a command line interface in which the user can specify queries about the database harry_potter_book_v2 from CS 5200. The command line interface will be full-page, prompting the user for input.

![img](https://github.com/ethanszeto/database-design-1/assets/41793762/cb928510-878c-4331-8577-bba2af8628a8)

## Using the Application

The first thing that will be prompted is the username and password. This username and password should be the username and password for your particular MySQL Instance. Follow the terminal prompts as guided. 

<hr>

## Running the Project

### Technologies Needed:
- Git
- Node.js
- Docker Desktop
- MySQL

### Protocol:
1. Clone the repository to an empty folder in your file directory.
2. Open the terminal to folder you cloned the repository to.
3. Run the following commands:

```properties
npm i
```
```properties
docker build -t hw8-container .
```
```properties
docker compose build
```
```properties
docker compose up -d
```

4. Navigate to Docker Desktop. Click on the "Containers" tab on the top lefthand side. You should see a newly created conatainer. Either open the subfolder, and clicked on "4321:4321", or navigate to http://localhost:4321 on your preferred web-browser.

<img width="991" alt="Screenshot 2024-03-21 at 10 11 08 PM" src="https://github.com/ethanszeto/database-design-1/assets/41793762/80a62a5e-0808-4098-82d7-81f9fd8fe834">

### Troubleshooting

- User connection issues:
