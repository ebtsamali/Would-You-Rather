# Would You Rather?

This repository contains the files related to the Website. The master branch contains the Website's source code.

In the "Would You Rather?" Project, the user can play the “Would You Rather?” game. The game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Also users will be able to answer questions, see which questions they haven’t answered, see how other people have voted, post questions, and see the ranking of users on the leaderboard.


## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Clone the Project
4.  **In Project Directory** 
	Run the following commands:
	```
	npm install
	```

    
## Usage

1. In the **Project** directory, run the following command to launch the Server in development mode:  `npm start`


## Backend Server

The `_DATA.js` file represents a fake database and methods that let you access the data.

There are two types of objects stored in our database:

* Users
* Questions

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`.

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`.


## Built With

[Reactjs](https://reactjs.org/)


