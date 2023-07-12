export function generateLoginModal() {

  let loginModal = document.createElement("div");
  
  loginModal.innerHTML = `
    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="row" style="padding: 20px">
              <section class="mx-auto" id="pill_container">
                <!-- Pills navs -->
                <ul
                  class="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active"
                      id="tab_login"
                      data-bs-toggle="pill"
                      href="#pills-login"
                      role="tab"
                      aria-controls="pills-login"
                      aria-selected="true"
                      >Login</a
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link"
                      id="tab_register"
                      data-bs-toggle="pill"
                      href="#pills_register"
                      role="tab"
                      aria-controls="pills-register"
                      aria-selected="false"
                      >Register</a
                    >
                  </li>
                </ul>
                <!-- Pills navs -->

                <!-- Pills content -->
                <div class="tab-content">
                  <!-- Login content -->
                  <div
                    class="tab-pane fade show active"
                    id="pills-login"
                    role="tabpanel"
                    aria-labelledby="tab-login"
                  >
                    <form id="pills_login_form">
                      <div class="text-center mb-3">
                        <p>Sign in with:</p>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-google"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-twitter"></i>
                        </button>
                      </div>

                      <p class="text-center">or:</p>

                      <!-- Email input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="login_username"
                          >Username</label
                        >
                        <input
                          type="text"
                          id="login_username"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Password input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="login-password"
                          >Password</label
                        >
                        <input
                          type="password"
                          id="login-password"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- 2 column grid layout -->
                      <div class="row mb-4">
                        <div class="col-md-6 d-flex justify-content-center">
                          <!-- Checkbox -->
                          <div class="form-check mb-3 mb-md-0">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="loginCheck"
                              checked
                            />
                            <label class="form-check-label" for="loginCheck">
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div class="col-md-6 d-flex justify-content-center">
                          <!-- Simple link -->
                          <a href="#!">Forgot password?</a>
                        </div>
                      </div>

                      <!-- Submit button -->
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mb-4"
                      >
                        Sign in
                      </button>
                    </form>
                  </div>
                  <!-- Registration content -->
                  <div
                    class="tab-pane fade"
                    id="pills_register"
                    role="tabpanel"
                    aria-labelledby="tab-register"
                  >
                    <form id="pills_register_form">
                      <!-- outside e-mail account sign up -->
                      <div class="text-center mb-3">
                        <p>Sign up with:</p>
                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-google"></i>
                        </button>

                        <button
                          type="button"
                          class="btn btn-link btn-floating mx-1"
                        >
                          <i class="fa fa-twitter"></i>
                        </button>
                      </div>

                      <p class="text-center">or:</p>

                      <!-- Name input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="register_name"
                          >Name</label
                        >
                        <input
                          type="text"
                          id="register_mame"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Username input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="register_username"
                          >Username</label
                        >
                        <input
                          type="text"
                          id="register_username"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Email input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="register_email"
                          >Email</label
                        >
                        <input
                          type="email"
                          id="register_email"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Password input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="register_password"
                          >Password</label
                        >
                        <input
                          type="password"
                          id="register_password"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Repeat Password input -->
                      <div class="form-outline mb-4">
                        <label class="form-label" for="register_repeat_password"
                          >Repeat password</label
                        >
                        <input
                          type="password"
                          id="register_repeat_password"
                          class="form-control"
                          required
                        />
                      </div>

                      <!-- Checkbox -->
                      <div
                        class="form-check d-flex justify-content-center mb-4"
                      >
                        <input
                          class="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="register_check"
                          checked
                          aria-describedby="registerCheckHelpText"
                        />
                        <label class="form-check-label" for="register_check">
                          I have read and agree to the terms
                        </label>
                      </div>

                      <!-- Submit button -->
                      <button
                        type="submit"
                        class="btn btn-primary btn-block mb-3"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <!-- Pills content END-->
              </section>
            </div>
          </div>
        </div>
      </div>
    `
    return loginModal;
}