document.querySelector("#register").onclick = function () {
  let fullName = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  supabase.auth
    .signUp({ email, password })
    .then((response) => {
      if (response.error) {
        console.error(response.error.message);
        return;
      }
      
      const user = response.user;
      const uid = user.id;
      console.log(uid);

      supabase
        .from("Users")
        .insert({ userId: uid, userName: fullName, emailAddress: email })
        .then(() => {
          window.location.href = "/landing.html";
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
        });
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
};
