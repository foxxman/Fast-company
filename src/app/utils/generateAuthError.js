function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email или пароль введены некорректно";
    case "EMAIL_EXISTS":
      return "Email уже зарегистрирован";
    default:
      return "Слишком много попыток входа. Попробуйте позже";
  }
}

export default generateAuthError;
