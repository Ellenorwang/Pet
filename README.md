# Design Process:

My role in this project was to design the login form. The login form was made from scratch with the use of tailwind CSS. The form uses React's UseState and Clerk's UseSignIn hooks. It initializes auth process, validates form field inputs to ensure they follow a format and are not empty. Then submiting is being handled, while a loading message is shown. If credentials are not validated, there is an error returned to try again. If form is validated, login is completed and user has access to their account from within the site.

Site also implements the pre-set sign up form provided by Clerk, which asks for first and last name (in order to render custom message later), emails and password. A new user is being created in the Clerk org, which then login form authenticates users with.

Homepage pulls the user's first name using Clerk's useUser hook to render it in a personalized welcome message. This method turned out to be a lot more straightforward that I imagined.

Implemented a synamic navbar that shows/hides login and signup buttons based on whether user is a visitor, or a logged in user.

Also, prepared routes/pages for navlinks as extra.

# challenges:

## OVERVIEW

Pet Forum Dashboard is a web application designed for pet lovers to connect, share experiences, and discuss topics related to pets. The dashboard allows users to manage profiles, view posts, and interact with a community of pet enthusiasts.

## GOAL

1. [ConfigureClerk] [x]

   - install clerk
   - set up keys
   - update middleware.ts
   - add ClerkProvider to app

2. [createuser] [x]

   - sign up

3. [authenticationForLogin/logout] [x]

   - signup

## PHASE 2 GOALS

4. [routeGuarding] [x]

   - block certain pages if authentication is not verified
   - redirect user to verify authentication
   - implemented route guarding to all pages

5. [FriendsSection] [x]

   - add friends section
   - displays a grid of user and pet avatars
   - hovering over a card enlarges the image for better visibility
   - clicking on a friend’s profile opens their detailed profile page

6. [ExploreOtherPosts] [x]

   - this section features a grid of trending posts with dynamic background images fetched from Contentful
   - each post card includes a hover effect that dims the background and highlights the post title
   - clicking on a post opens the full content view

7. [cleanUp] [x]
   - componentization
   - Combine ReadMe

## NOTES

1. Contentful requires a source of invitation for others to access the database. In our project Ellen invited us through an email link.

## RESOURCES

1. [ClerkConfigurationGuide] ([<the url>](https://dashboard.clerk.com/apps/app_2ty01A9vTVD3LCrGLer2GEkRqXB/instances/ins_2ty01CNuXsJYtpKWEptuqdxDDUO))
2. [RouteGuarding] ([<the url>](https://clerk.com/docs/references/nextjs/route-handlers))
3. [Permissions] ([<the url>] (https://clerk.com/docs/organizations/verify-user-permissions))

## DEBUGGING

1.  [redirecting]:

    - made the user get sent back to the sign up page
    - had to create a signal as to why they were being sent back.
      a. added a redirecting text.
      b. added a different signup page to indicate that the user needs to be logged in before viewing.
      c. converted the code in the auth() documentation to jsx because the documentation is for TS.
      d. redirectToSignIn() doesnt work for jsx so the fix this we use router instead
    - to solve [theSecondProblem]

2.  [routingUser]

    - could not manage to route the user to dashboard(homepage) after successfully loging into the site via the custom login form.
    - docs on Clerk, and any online advice were attempted but not fruitful. I may have overcomplicated it.
    - but as per assignment instructions, after sign up form is completed, user is being directed to dashboard(homepage).
    -

3.  [customLogin]
    - took forever to be able to get the custom login form to successfully authenticate and sign user in
    - kept fiddling with middleware, root page.jsx (homepage), and layout.jsx until suddenly it worked.
    - i believe it was something I wasn't configuring right in the middleware file.

## TECHNOLOGY STACK

1. [Next.js]: Chosen for its server-side rendering (SSR) capabilities and optimized performance.

2. [TailwindCSS]: Used for styling to ensure a modern, responsive design with minimal custom CSS.

3. [ContentfulCMS]: Utilized as a headless CMS to manage users, pets, posts, and comments dynamically.

4. [ReactHooks]: State management is handled using useState and useEffect for simplicity and efficiency.

5. [Clerk]: Used for managaing Authentication and permissions with included UI elements for sign-up/login functionalities.

## COMPONENT STRUCTURE

1. [Header]: A navigation bar with links to Users, Pets, Posts, and Comments.

2. [Footer]: Displays copyright information and links to legal pages.

3. [UserList]: Displays registered users with their avatars and pet details.

4. [PetList]: Lists pet added to the forum.

5. [PostFeed]: Displays recent posts from users.

6. [CommentSection]: Shows user comments on various posts.

## REFLECTIONS

[Ellen's]
The development process began with planning and setup, where the architecture was defined, and Next.js was chosen for its server-side rendering benefits alongside Contentful for CMS integration. Component development followed, focusing on building reusable components for the dashboard and implementing a flexible API fetch mechanism using useEffect and client.getEntries().
Pet Forum Dashboard

[Tom's]
This has been a challenging learning experience, a lot of troubleshooting with the code to try to get authentication to work. I gained a better understanding of how authentication works now. Also, I feel much more cofident using Tailwind CSS as well as I have a better understanding of page routes and the app router in Next.

[Myron's]
I was the second person to work on this project so for me I had to learn to moving a project created by someone else, onto someone else with the same readability. I thought about style of coding and creating actually useful comments to ensure there were no inconsistencies within the code. I gained a better understanding of how to communicate and future proof code within my role of this project, and technical skills speaking, I learned how to implement Clerk Authorization into the app, i learned how to integrate redirecting, route guards, and learned about more interesting capabilites within the clerk stack.

## INSTRUCTIONS

1. Clone the repo
2. run the command = `npm install` in the pets directory
3. run the command = `npm install contentful` in the pets directory
4. run the command = `npm install @clerk/nextjs` in the pets directory
5. run the command = `npm run dev` in the pets directory
6. ctrl + click on "localhost:3000" in the terminal window
7. click on home/friends to test the redirecting works.
8. either sign up a new account, continue with google or login.
9. click on home/friends to test if access is allowed.
10. log out and test if access is denied. it should redirect you to a sign up page.
