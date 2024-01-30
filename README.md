# Unhinged

## Description
Unhinged is an app where a user can log different sandwiches from any restaurant to keep a record of their favorite sandwiches or to see what they have tried and may venture out to try something new!

## Wireframe
![Screenshot 2024-01-30 at 9 26 36 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/576daf4a-7fcf-49ca-bd1a-ae6e246dece0)
![Screenshot 2024-01-30 at 9 27 06 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/ce89e0ca-12a0-4ef9-a4e7-5efdfdbf8176)
![Screenshot 2024-01-30 at 9 27 24 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/3b6d5658-9391-4a4b-beaa-230d25d6e0dc)
![Screenshot 2024-01-30 at 9 27 41 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/e1502a48-7505-4666-92a2-d34f191b8cf7)
![Screenshot 2024-01-30 at 9 27 54 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/6639aec8-07fe-499c-83ec-c4ae676f5329)

## User Stories
- A user will create an account
- The user will login to their account
- The user will search for either the sandwich they are eating or if they log it later, they can search by the restaurant
- The user finds the profile of the sandwich they just ate and can check it in and it will log to their account

## React tree diagram
![Screenshot 2024-01-29 at 9 29 26 PM](https://github.com/Nickjw243/Unhinged/assets/145048770/8b31eafa-62fc-4de1-97aa-fe989463c145)

## Schema
<img width="592" alt="Screenshot 2024-01-29 at 9 19 59 PM" src="https://github.com/Nickjw243/Unhinged/assets/145048770/fa8bc105-c8b3-443f-9ed0-34c925ce455b">

## API Routes
- CREATE -> /signup -> POST == Creates a new user account
- READ -> /sandwiches/:id -> GET == Returns a list of sandwiches that you searched for
- UPDATE -> /sandwiches/:id -> PATCH == Updates your profile with the sandwich you just checked in
- DELETE -> /profile -> DELETE == Delete a sandwich from your list
- READ -> /restaurants/:id -> GET == Returns a list of restaurants when searching for sandwich
- READ -> /profile -> GET == Returns user profile and the sandwiches they have logged

## New Technologies
useContext will be a new technology that will be used in this project

## Stretch Goals
- Add a map feature
- Create a rating system to show the sandwich's average rating
- Add more restaurants in other locations

## Trello
![Screenshot 2024-01-30 at 9 55 01 AM](https://github.com/Nickjw243/Unhinged/assets/145048770/be009727-6e74-4f7a-a54e-c21af16b6db7)





