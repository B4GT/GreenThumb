const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    message.textContent = ""
    const loginResponse = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const loginData = await loginResponse.json();
      if (!loginData.success) {
        message.textContent = loginData.message || "Login failed.";
        return;
      }

      const checkResponse = await fetch("http://localhost:3000/api/auth/check", {
        method: "GET",
        credentials: "include"
      });

      const checkData = await checkResponse.json();
      if (checkData.success) { // CHECK BACK HERE LATER - are we going to have accounts for regular users? Right now, any successful login is assumed to be by the admin
        message.textContent = "Login successful. You are now being redirected"
        window.location.href = "Admin.html"
      } else {
        message.textContent = "Login unsuccessful. Please try again"
      } 
  } catch (error) {
    console.error("ERROR:", error);
    message.textContent = "There was an error with sending or recieving data";
  }
});

