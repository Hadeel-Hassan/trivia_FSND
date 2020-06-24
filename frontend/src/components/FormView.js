import React, { Component } from "react";
import $ from "jquery";

import "../stylesheets/FormView.css";

class FormView extends Component {
  constructor(props) {
    super();
    this.state = {
      question: "",
      answer: "",
      difficulty: 1,
      category: 1,
      categories: {},
      empty: "",
      error: false,
    };
  }

  componentDidMount() {
    $.ajax({
      url: `/categories`, //TODO: update request URL
      type: "GET",
      success: (result) => {
        this.setState({ categories: result.categories });
        return;
      },
      error: (error) => {
        alert("Unable to load categories. Please try your request again");
        return;
      },
    });
  }

  submitQuestion = (event) => {
    event.preventDefault();
    // form validation
    if (!this.handleValidation()) {
    } else {
      $.ajax({
        url: "/questions/add", //TODO: update request URL
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          question: this.state.question,
          answer: this.state.answer,
          difficulty: this.state.difficulty,
          category: this.state.category,
          valid: true,
        }),
        xhrFields: {
          withCredentials: true,
        },
        crossDomain: true,
        success: (result) => {
          alert("Your question was successfully added! ");
          console.log(result);
          
          document.getElementById("add-question-form").reset();
          return;
        },
        error: (error) => {
          alert("Unable to add question. Please try your request again "+error.responseText);
          return;
        },
      });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleValidation() {
    let formIsValid = true;
    if (this.state.question === "" && this.state.answer === "") {
      this.setState({
        error: true,
        empty: "Question and Answer feilds",
      });
      formIsValid = false;
    } else if (this.state.question === "") {
      this.setState({
        error: true,
        empty: "Question feild",
      });
      formIsValid = false;
    } else if (this.state.answer === "") {
      this.setState({ error: true, empty: "Answer feild" });
      formIsValid = false;
    } else {
      this.setState({ error: false });
    }

    return formIsValid;
  }

  render() {
    return (
      <div id="add-form">
        <h2>Add a New Trivia Question</h2>
        <h5 className={`${this.state.error ? "error-msg" : "hide-error"}`}>
          {this.state.empty} cannot be empty!
        </h5>
        <form
          className="form-view"
          id="add-question-form"
          onSubmit={this.submitQuestion}
        >
          <label>
            Question
            <input type="text" name="question" onChange={this.handleChange} />
          </label>
          <label>
            Answer
            <input type="text" name="answer" onChange={this.handleChange} />
          </label>
          <label>
            Difficulty
            <select name="difficulty" onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" onChange={this.handleChange}>
              {Object.keys(this.state.categories).map((id) => {
                return (
                  <option key={id} value={id}>
                    {this.state.categories[id]}
                  </option>
                );
              })}
            </select>
          </label>
          <input type="submit" className="button" value="Submit" />
        </form>
      </div>
    );
  }
}

export default FormView;
