# This is a demo with vite vitest express prisma and ssr react
### I have tried to create an express server which will serve both some json amd some react with ssr

This dummy app contains authentication which is done by registering a user (storing him in the db) and then allowing him to log in which is done by creating a session for that user. We also allow a remember me option which will keep the user logged in even if the user closes the browser.

The way I achieve the remember me functionality is by
- generating a random token
- storing this token in a cookie with the user's id
- hashing this token and storing the hashed token in the db
- every time a request hits our server we check if it has a cookie with the user id and if it has we retrieve this user from the db.
 Then we compare the cookie token with the user's hashed token (which is stored in the db) to verify that he is the correct user and if so we create a session for that user. For subsequent request if we find a session we just retrieve him for the db (to verify that the user is not deleted or whatever) and then at the end storing the current user in th request object
All the juice for authentication is happening at the `src/handlers/authHandler.t`s and the `src/auth.ts`

 For react ssr i have done some work for serving with splitting my `index.html` in chunks. I start rendering up to the part of `<!--app-html-->`, then   rendering our react app wrapped  with  `StaticRouter` as a pipeable stream and after it finishes continuing streaming the rest of the html which contains the client side js entry point `/src/client/entry-client.tsx` Inside there we hydrate the dom rendering our app wrapped inside a `BrowserRouter`. 


I have done some work with testing to truncate the tables before each test as well

