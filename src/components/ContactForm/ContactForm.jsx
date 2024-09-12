import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number must be less than 50 characters")
    .required("Number is required"),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      ...values,
    };
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className={css.contactForm}>
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" className={css.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={css.errorMessage}
            />
          </div>
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <Field id="number" name="number" className={css.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={css.errorMessage}
            />
          </div>
          <button type="submit" className={css.submit}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
