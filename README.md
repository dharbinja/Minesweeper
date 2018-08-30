# Minesweeper

Minesweeper with Server Side Map Management

## Demo

You can view a [live demo](http://ec2-34-221-179-99.us-west-2.compute.amazonaws.com/) that is running and actually play the game there. This is just a simple AWS EC2 instance that has been setup to run the game. It is not optimized for production nor was there a formal deployment done, so you will not see any performance improvements over running it locally.

## Folder Structure

```
Minesweeper/
  README.md
  frontend/
  backend/
```

* frontend - contains our React application, it was built using [Create React App](https://github.com/facebookincubator/create-react-app). The Readme in that folder describes it in detail
* backend - Django Framework REST API using [Django Rest Framework](https://github.com/encode/django-rest-framework)

## Architecture

The backend and frontend are meant to run separately. The back-end is a purely JSON-based REST API. It does no rendering of it's own (except the admin interface which is not important for the sake of this task). 
<br><br>
That means in order to run the app properly, you will have to run both the front-end and back-end. 
<br><br>
For the sake of speed, I used a SQLite3 database for this project. In production, it is recommended to use something else, and in this case, we would probably want to use a database capable of handling many writes very efficiently.

## Running the API

There are many ways to run the back end if you are familiar with Python and Django. I used pipenv to manage the python environment. On Mac you can get pipenv with:

```sh
$ brew install pipenv
```

Once that is installed, you can run the following commands to get everything setup:
```sh
$ pipenv install django
$ pipenv install djangorestframework
$ pipenv install django-cors-headers
$ pipenv shell
(backend) $ python manage.py migrate
(backend) $ python manage.py loaddata minesweeper/fixtures/difficulties.json 
```

This will install all the django dependencies as well as create a SQLite3 database. If you wish to run tests you can do so by typing:
```sh
(backend) $ python manage.py test minesweeper
```

Once you are ready to run the server you can type the following
```sh
(backend) $ python manage.py runserver
```

This will run the API service at http://localhost:8000. You should be able to browse to there to explore the API's (try http://localhost:8000/api/v1/game)

## Running the Frontend

The front end is a tad easier to run and should be relatively simple assuming you have Node and NPM installed. Once you do, you can run the following

```sh
$ npm install
$ npm start
```

That's all! The application should now be running on http://localhost:3000 and communicating with your backend.
