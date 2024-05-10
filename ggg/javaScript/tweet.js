const supabaseUrl = 'https://edoxecmkosvhehdebvov.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb3hlY21rb3N2aGVoZGVidm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNjc0NDEsImV4cCI6MjAzMDk0MzQ0MX0.2vl7whJeFiMokZREQFcuNAtfm3mJ-yA0aVVnQcR7DYo';
const { createClient } = supabase;
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    const selectId = decodeURIComponent(window.location.search);
    const selectTweetId = selectId.substring(1);

    supabase
      .from('Users')
      .select('userName, userId')
      .then(({ data: users, error }) => {
        if (error) throw error;

        users.forEach((userDoc) => {
          let user = userDoc.userName;
          let userId = userDoc.userId;

          supabase
            .from('Tweets')
            .select('*')
            .then(({ data: tweets, error }) => {
              if (error) throw error;

              let content = "";

              tweets.forEach((tweetDoc) => {
                let tweetUserId = tweetDoc.userId;
                let tweet = tweetDoc.tweets;
                let tweetId = tweetDoc.tweetId;
                let handle = "@" + user;

                if (userId === tweetUserId && tweetId === selectTweetId) {
                  content += '<div class="wehh" id="wehh">';
                  content +=
                    "<p>" +
                    "<img id='image' src='/images/profile.jpg' alt=''>" +
                    user +
                    " " +
                    "<span id='handle'>" +
                    handle +
                    "</span>" +
                    "</p>";
                  content += "<p id='post'>" + tweet + "</p>";
                  content +=
                    "<p id='icon'>" +
                    "<i id='click' class='fa fa-comment-o' aria-hidden='true'></i>" +
                    " " +
                    "<span>" +
                    "<i id='click' class='fa fa-retweet' aria-hidden='true'></i>" +
                    " " +
                    "</span>" +
                    "<span>" +
                    "<i id='click' class='fa fa-heart-o' aria-hidden='true'></i>" +
                    " " +
                    "</span>" +
                    "</p>";
                  content += "</div>";
                  const commentSubmitButton = document.querySelector("#commentSubmit");
                  commentSubmitButton.addEventListener("click", function () {
                    let comment = document.querySelector("#comment").value;
                    supabase
                      .from("Comments")
                      .insert([{ comments: comment, tweetid: tweetId }])
                      .then(() => {
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.error("Error inserting data:", error);
                      });
                  });
                }
              });

              // Tweetleri içeren HTML içeriğini formContainer'a yerleştir
              document.querySelector("#formContainer").innerHTML = content;
            });
        });
      });
  }
});
