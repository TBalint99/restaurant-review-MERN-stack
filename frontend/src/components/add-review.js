import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useHistory } from "react-router-dom";

export default function AddReview(props) {
    
    let initialState = ""

    let editing = false;

    const { id } = useParams()
    const history = useHistory()
  
    if (history.location.state && history.location.state.currentReview) {
      editing = true;
      initialState = history.location.state.currentReview.text
    }
  
    const [review, setReview] = useState(initialState);
    const [submitted, setSubmitted] = useState(false)
  
    const handleInputChange = event => {
      setReview(event.target.value);
    }
  
    const saveReview = () => {
      var data = {
        text: review,
        name: props.user.name,
        user_id: props.user.id,
        restaurant_id: String(id)
      }
  
      if (editing) {
        data.review_id = history.location.state.currentReview._id
        RestaurantDataService.updateReview(data)
          .then(response => {
            setSubmitted(true);
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          })
      } else {
        RestaurantDataService.createReview(data)
          .then(response => {
            setSubmitted(true)
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          });
      }
  
    };

    console.log(history.location.state);
    console.log(props);
  
    return (
        <div>
            {
              props.user ? (
                  <div className="submit-form">
                      {
                          submitted ? (
                              <div>
                                  <h4>You submitted successfully!</h4>
                                  <Link to={"/restaurants/" + String(id)} className="btn btn-success">
                                      Back to Restaurant
                                  </Link>
                              </div>
                          ) : (
                              <div>
                                  <div className="form-group">
                                      <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="text"
                                          required
                                          value={review}
                                          onChange={handleInputChange}
                                          name="text"
                                      />
                                  </div>
                                  <button onClick={saveReview} className="btn btn-success">
                                      Submit
                                  </button>
                              </div>
                          )
                      }
                  </div>
              ) : (
                  <p>
                  Please log in.
                  </p>
              )
          }
        </div>
    )
}
