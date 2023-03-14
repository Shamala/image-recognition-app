import React from "react";

const Signin = ({ onRouteChange }) => {
  return (
    <article className="br4 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <section className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
            <div className="mt3">
              <label className="db white fw6 lh-copy f6" for="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white" for="password">
                Password
              </label>
              <input
                className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 white pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
              onClick={() => onRouteChange("home")}
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim white db white pointer"
            >
              Register
            </p>
          </div>
        </form>
      </section>
    </article>
  );
};

export default Signin;