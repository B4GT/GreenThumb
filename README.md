Daniel -
1. The database is run on Render, which is connected to the backend folder on GitHub on the main branch.
2. The products might take a minute to load due to Render, which hosts the backend, taking a while to start up after inactivity
3. For the sake of making this program easier to work with and evaluate, I made the .env public. If you want to actual make it secure, you'll need to use MongoDB to replace the exposed secret keys with new ones and update the Render environment variables new data on Render. You should also add it to the .gitignore
4. The admin pages aren't meant to be accessible by the public, so there aren't any links to them. To access them, you need to type in the URL manually. Also, they are given ordinary names so that they are easier to view, but for an actual site, you should edit the file names and references so that they aren't something a regular user could find, even if they would still need a username and password.
5. Admin accounts are created manually on the database. Right now, the username is test123@gmail.com and the password is 123456
