# Design Process:

My role in this project was to design the login form. The login form was made from scratch with the use of tailwind CSS. The form uses React's UseState and Clerk's UseSignIn hooks. It initializes auth process, validates form field inputs to ensure they follow a format and are not empty. Then submiting is being handled, while a loading message is shown. If credentials are not validated, there is an error returned to try again. If form is validated, login is completed and user has access to their account from within the site.

Site also implements the pre-set sign up form provided by Clerk, which asks for first and last name (in order to render custom message later), emails and password. A new user is being created in the Clerk org, which then login form authenticates users with.

Homepage pulls the user's first name using Clerk's useUser hook to render it in a personalized welcome message. This method turned out to be a lot more straightforward that I imagined.

Implemented a synamic navbar that shows/hides login and signup buttons based on whether user is a visitor, or a logged in user.

Also, prepared routes/pages for navlinks as extra.
