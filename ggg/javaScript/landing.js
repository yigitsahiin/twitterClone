const supabaseUrl = 'https://edoxecmkosvhehdebvov.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb3hlY21rb3N2aGVoZGVidm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNjc0NDEsImV4cCI6MjAzMDk0MzQ0MX0.2vl7whJeFiMokZREQFcuNAtfm3mJ-yA0aVVnQcR7DYo';

const supabase = createClient(supabaseUrl, supabaseKey);

document.querySelector("#send").onclick = function () {
  let tweet = document.querySelector("#tweet").value;
  supabase.from('Tweets').insert([{ tweets: tweet }])
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      console.error('Error inserting tweet:', error.message);
    });
};

document.querySelector("#signOut").onclick = function () {
  supabase.auth.signOut()
    .then(() => {
      window.location.href = "/login.html";
    })
    .catch((error) => {
      console.error('Error signing out:', error.message);
    });
};

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    const uid = session.user.id;
    const userEmail = session.user.email;

    supabase
      .from('Users')
      .select('userName, emailAddress')
      .eq('userId', uid)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error getting user data:', error.message);
          return;
        }

        document.querySelector("#userName").innerText = data.userName;
        document.querySelector("#email").innerText = data.emailAddress;
      });

    // Other actions for signed-in users
  } else {
    // Redirect to login page if not signed in
    window.location.href = "/login.html";
  }
});
