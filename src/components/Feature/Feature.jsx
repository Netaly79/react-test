import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from "./Feature.module.css";

import automaticImage from "../../assets/automatic.png";
import petrolImage from "../../assets/petrol.png";
import kitchenImage from "../../assets/kitchen.png";
import radioImage from "../../assets/radio.png";
import bathImage from "../../assets/bathroom.png";
import acImage from "../../assets/ac.png";

const Feature = ({ camper }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Form submitted successfully!', {
      position: "top-right"
    });
    console.log('Form data:', formData);
  };

  return (
    <div className={css.container}>
      <div className={css.specContainer}>
        <div className={css.specification}>
          {camper.engine === "petrol" && <img src={petrolImage} alt="Petrol" />}
          {camper.transmission === "automatic" && (
            <img src={automaticImage} alt="Automatic Transmission" />
          )}
          {camper.kitchen && <img src={kitchenImage} alt="Kitchen" />}
          {camper.radio && <img src={radioImage} alt="Radio" />}
          {camper.bathroom && <img src={bathImage} alt="Bathroom" />}
          {camper.AC && <img src={acImage} alt="AC" className={css.engine} />}
        </div>
        <h3 className={css.sectionTitle}>Vehicle details</h3>
        <div className={css.row}>
          <p>Form</p>
          <p>{camper.form}</p>
        </div>
        <div className={css.row}>
          <p>Length</p>
          <p>{camper.length}</p>
        </div>
        <div className={css.row}>
          <p>Width</p>
          <p>{camper.width}</p>
        </div>
        <div className={css.row}>
          <p>Height</p>
          <p>{camper.height}</p>
        </div>
        <div className={css.row}>
          <p>Tank</p>
          <p>{camper.tank}</p>
        </div>
        <div className={css.row}>
          <p>Consumption</p>
          <p>{camper.consumption}</p>
        </div>
      </div>
      <div className={css.formContainer}>
      <form onSubmit={handleSubmit}>
        <h3 className={css.formTitle}>Book your campervan now</h3>
        <p className={css.desc}>Stay connected! We are always ready to help you.</p>
        <input
          type="text"
          id="name"
          name="name"
          className={css.input}
          placeholder='Name*'
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
          placeholder='Email*'
          onChange={handleChange}
          required
        />
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          className={css.input}
          placeholder='Booking date*'
          onChange={handleChange}
          required
        />
        <textarea
          id="comment"
          name="comment"
          placeholder='Comment'
          className={css.textBlock}
          value={formData.comment}
          onChange={handleChange}
        />

      <button type="submit" className={css.centered}>Send</button>
    </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Feature;
