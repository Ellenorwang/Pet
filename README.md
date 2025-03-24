Pet Forum Dashboard

Overview

Pet Forum Dashboard is a web application designed for pet lovers to connect, share experiences, and discuss topics related to pets. The dashboard allows users to manage profiles, view posts, and interact with a community of pet enthusiasts.

Technology Stack

Next.js: Chosen for its server-side rendering (SSR) capabilities and optimized performance.

Tailwind CSS: Used for styling to ensure a modern, responsive design with minimal custom CSS.

Contentful CMS: Utilized as a headless CMS to manage users, pets, posts, and comments dynamically.

React Hooks: State management is handled using useState and useEffect for simplicity and efficiency.

Component Structure

Header: A navigation bar with links to Users, Pets, Posts, and Comments.

Footer: Displays copyright information and links to legal pages.

User List: Displays registered users with their avatars and pet details.

Pet List: Lists pet added to the forum.

Post Feed: Displays recent posts from users.

Comment Section: Shows user comments on various posts.

Friends Section (New)
The friends section displays a grid of user and pet avatars. Hovering over a card enlarges the image for better visibility. Clicking on a friend’s profile opens their detailed profile page.

Explore Other Posts (New)
This section features a grid of trending posts with dynamic background images fetched from Contentful. Each post card includes a hover effect that dims the background and highlights the post title. Clicking on a post opens the full content view.

The development process began with planning and setup, where the architecture was defined, and Next.js was chosen for its server-side rendering benefits alongside Contentful for CMS integration. Component development followed, focusing on building reusable components for the dashboard and implementing a flexible API fetch mechanism using useEffect and client.getEntries().