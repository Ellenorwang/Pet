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

4. [routeGuarding] [x]

   - block certain pages if authentication is not verified
   - redirect user to verify authentication
   - implemented route guarding to all pages

5. [HideSpecificComponents] []

   - implement public components
   - implement authorized only components
     for help look at [Permissions] under ## Resources

6. [cleanUp] []
   - componentization
   -

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

## DEPENDENCIES

## INSTALL INSTRUCTIONS

1. Clone the repo
2. run the command = `npm install` in the pets directory
3. run the command = `npm install contentful` in the pets directory
4. run the command = `npm install @clerk/nextjs` in the pets directory
