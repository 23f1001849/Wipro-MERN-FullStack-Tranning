import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function FormikDemo() {
  return (
    <article>
      <h2>Formik + Yup</h2>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          alert(`Submitting ${JSON.stringify(values, null, 2)}`);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form-grid">
            <label>
              Name
              <Field name="name" />
              <ErrorMessage name="name" component="span" className="error" />
            </label>
            <label>
              Email
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="span" className="error" />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </article>
  );
}
