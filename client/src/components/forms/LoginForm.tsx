import "./Register.css";

function LoginForm() {
  return (
    <form className="login-form">
      <div className="close-button-container">
        <button type="button" className="close-form-button">
          +
        </button>
      </div>
      <h3 className="form-title">Connexion</h3>
      <label htmlFor="email-login" className="form-label">
        Email
      </label>
      <input
        type="email"
        id="email-login"
        className="form-input"
        placeholder="Enter your email"
      />
      <label htmlFor="password-login" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password-login"
        className="form-input"
        placeholder="Enter your password"
      />
      <button type="submit" className="form-button">
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
