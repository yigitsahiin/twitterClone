const supabaseUrl = 'https://edoxecmkosvhehdebvov.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb3hlY21rb3N2aGVoZGVidm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNjc0NDEsImV4cCI6MjAzMDk0MzQ0MX0.2vl7whJeFiMokZREQFcuNAtfm3mJ-yA0aVVnQcR7DYo';

const supabase = createClient(supabaseUrl, supabaseKey);

document.querySelector("#login").onclick = function () {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  supabase.auth.signIn({ email, password })
    .then((response) => {
      if (response.error) {
        console.error("Error signing in:", response.error.message);
        return;
      }
      
      window.location.href = "/landing.html";
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
};

document.querySelector("#google").onclick = function () {
  let provider = new supabase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  supabase.auth.languageCode = "en";
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  supabase.auth
    .signInWithPopup(provider)
    .then((result) => {
      let credential = result.credential;
      let token = credential.accessToken;
      let user = result.user;
      window.location.href = "/landing.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
    });
};

document.querySelector("#forget").onclick = function () {
  let email = document.querySelector("#email").value;
  supabase.auth.api.resetPasswordForEmail(email)
    .then(() => {
    })
    .catch((error) => {
      console.error("Error sending password reset email:", error.message);
    });
};
