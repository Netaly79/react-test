import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./Reviews.module.css";
import { StarRating } from "../StarRating/StarRating";

const Reviews = ({ camper }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Form submitted successfully!", {
      position: "top-right",
    });
  };

  return (
    <div className={css.container}>
      <div className={css.reviewContainer}>
        {camper &&
          camper.reviews.map((review, index) => (
            <div className={css.review} key={index}>
              <div className={css.titleBlock}>
                <div className={css.badge}>
                  {review.reviewer_name.charAt(0)}
                </div>
                <div className={css.starsBox}>
                  <p className={css.userName}>{review.reviewer_name}</p>
                  <StarRating rating={review.reviewer_rating} />
                </div>
              </div>
              <p className={css.reviewText}>{review.comment}</p>
            </div>
          ))}
      </div>
      <div className={css.formContainer}>
        <form onSubmit={handleSubmit}>
          <h3 className={css.formTitle}>Book your campervan now</h3>
          <p className={css.desc}>
            Stay connected! We are always ready to help you.
          </p>
          <input
            type="text"
            id="name"
            name="name"
            className={css.input}
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className={css.input}
            placeholder="Email*"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            className={css.input}
            placeholder="Booking date*"
            onChange={handleChange}
            required
          />
          <textarea
            id="comment"
            name="comment"
            placeholder="Comment"
            className={css.textBlock}
            value={formData.comment}
            onChange={handleChange}
          />

          <button type="submit" className={css.centered}>
            Send
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reviews;
