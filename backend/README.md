# Full Stack Trivia API Backend

## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

## Database Setup
With Postgres running, restore a database using the trivia.psql file provided. From the backend folder in terminal run:
```bash
psql trivia < trivia.psql
```

## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application. 

## Tasks

One note before you delve into your tasks: for each endpoint you are expected to define the endpoint and response data. The frontend will be a plentiful resource because it is set up to expect certain endpoints and response data formats already. You should feel free to specify endpoints in your own way; if you do so, make sure to update the frontend or you will get some unexpected behavior. 

1. Use Flask-CORS to enable cross-domain requests and set response headers. 
2. Create an endpoint to handle GET requests for questions, including pagination (every 10 questions). This endpoint should return a list of questions, number of total questions, current category, categories. 
3. Create an endpoint to handle GET requests for all available categories. 
4. Create an endpoint to DELETE question using a question ID. 
5. Create an endpoint to POST a new question, which will require the question and answer text, category, and difficulty score. 
6. Create a POST endpoint to get questions based on category. 
7. Create a POST endpoint to get questions based on a search term. It should return any questions for whom the search term is a substring of the question. 
8. Create a POST endpoint to get questions to play the quiz. This endpoint should take category and previous question parameters and return a random questions within the given category, if provided, and that is not one of the previous questions. 
9. Create error handlers for all expected errors including 400, 404, 422 and 500. 


## Endpoints

```
GET '/categories'
GET '/questions'
GET '/categories/<int:category_id>/questions'
POST '/questions/add'
POST '/questions/search'
POST '/quizzes' 
DELETE '/questions/<question_id>'
```

#### GET '/categories'
- Fetches a dictionary of categories in which the keys are the ids and the value is the corresponding string of the category
- Request Arguments: None
- Returns: An object with a single key, categories, that contains a object of id: category_string key:value pairs. 
    ##### example:
   ```
    {
     '1' : "Science",
     '2' : "Art",
     '3' : "Geography",
     '4' : "History",
     '5' : "Entertainment",
     '6' : "Sports"
    }
    ```

#### GET '/questions'
- Fetches a dictionary of all the questions in and the value of its category type
- Request Arguments: page number
- Returns: An object that contains an object of questions of the requested page, the number of total questions, an object of all categories, and the current category that is NULL for this case.
    ##### example:
    ```
    {
     'questions': [
        {
        "answer": "Apollo 13",
        "category": 5,
        "difficulty": 4,
        "id": 2,
        "question": "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?"
        },
        {
        "answer": "Tom Cruise",
        "category": 5,
        "difficulty": 4,
        "id": 4,
        "question": "What actor did author Anne     Rice first denounce, then praise in the role of her beloved Lestat?"
        }
     ]
     'total_questions': 2,
     'categories': {
        '1' : "Science",
        '2' : "Art",
        '3' : "Geography",
        '4' : "History",
        '5' : "Entertainment",
        '6' : "Sports"
        },
     'current_category': null
    }
    ```


#### GET '/categories/<category_id>/questions'
- Fetches a dictionary of questions of a specific category.
- Request Arguments: None
- Returns: An object that contains an object of questions with an id of the requested category ID, the number of total questions in that category, and the ID of the current category.
    ##### example:

    ```
    {
        "current_category": 3,
        "questions": [
            {
            "answer": "Lake Victoria",
            "category": 3,
            "difficulty": 2,
            "id": 13,
            "question": "What is the largest lake in Africa?"
            },
            {
            "answer": "The Palace of Versailles",
            "category": 3,
            "difficulty": 3,
            "id": 14,
            "question": "In which royal palace would you find the Hall of Mirrors?"
            },
            {
            "answer": "Agra",
            "category": 3,
            "difficulty": 2,
            "id": 15,
            "question": "The Taj Mahal is located in which Indian city?"
            }
        ],
        "total_questions": 3
    }
    ```

#### POST '/questions/add'
- Creats a new question and add it to the list of questions.
- Request Arguments: question, answer, difficulty, category, form validation status.
- Returns: An object with a single key, created, that contains the ID of the new question that was created.

    ##### example:
    ```
    {
        "created": 5,
    }
    ```

#### POST '/questions/search'
- Fetches a list of questions objects that includes the queried search term.
- Request Arguments: search term
- Returns: An object of current category ID, list of questions that matches, and the number of total questions.

    ##### example:
    ```
    {
        "current_category": null,
        "questions": [
            {
            "answer": "Apollo 13",
            "category": 5,
            "difficulty": 4,
            "id": 2,
            "question": "What movie earned Tom Hanks his third straight Oscar nomination, in 1996?"
            }
        ],
        "total_questions": 1
    }
    ```

#### POST '/quizzes'
- Start a quizzing game, by fetching questions objects randomly that are under the selected category.
- Request Arguments: list of previous questions, object of quiz category Id and category type
- Returns: A question object

    ##### example:
    ```
    {
        "question": {
            "answer": "The Liver",
            "category": 1,
            "difficulty": 4,
            "id": 20,
            "question": "What is the heaviest organ in the human body?"
        },
    }
    ```

#### DELETE '/questions/<question_id>'
- Delete the question objecn with the requested ID.
- Request Arguments: None
- Returns: An object with a single key, deleted, that contains the ID of the deleted question.

    ##### example:
    ```
    {
        "deleted": "35",
    }
    ```

## Testing
To run the tests, run
```
dropdb trivia_test
createdb trivia_test
psql trivia_test < trivia.psql
python test_flaskr.py
```