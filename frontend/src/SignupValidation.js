function validation(values) {
  let error = {};
  // const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email_pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    error.name = "name should not be empty";
  } else {
    error.name = "";
  }

  if (values.emil === "") {
    error.email = "Name Should be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password didn't match";
  } else {
    error.password = "";
  }

  return error;
}
export default validation;
