#!/usr/bin/env python3

# Standard library imports
from random import choice

# Remote library imports

# Local imports
from app import app
from models import db, Users, Restaurants, Sandwiches, CheckIn
from datetime import date

if __name__ == '__main__':
    with app.app_context():
        print("Clearing out tables...")

        Users.query.delete()
        Restaurants.query.delete()
        Sandwiches.query.delete()
        CheckIn.query.delete()

        print("Seeding Users model...")
        
        new_users = [
            Users(
                username = 'Nick',
                user_email = 'nick@form.net',
                password = '123'
            )
        ]
        db.session.add_all(new_users)

        print('Seeding Restaurants model...')

        restaurants = [
            Restaurants(
                restaurant_name = 'Gramophone',
                restaurant_location = 'St. Louis, MO'
            ),
            Restaurants(
                restaurant_name = "Gioia's",
                restaurant_location = 'St. Louis, MO'
            ),
            Restaurants(
                restaurant_name = "Amighetti's",
                restaurant_location = 'St. Louis, MO'
            )
        ]
        db.session.add_all(restaurants)

        print('Seeding Sandwiches model...')

        sandwiches = [
            # Gramophone
            Sandwiches(
                sandwich_name = 'Italian Yardbird',
                restaurant_id = 1,
                image = 'https://129534174.cdn6.editmysite.com/uploads/1/2/9/5/129534174/s133514416528582280_p35_i3_w1330.jpeg?dpr=2'
            ),
            Sandwiches(
                sandwich_name = 'Lou York',
                restaurant_id = 1,
                image = 'https://129534174.cdn6.editmysite.com/uploads/1/2/9/5/129534174/s133514416528582280_p1865_i1_w1678.jpeg?dpr=2'
            ),
            Sandwiches(
                sandwich_name = 'Spicy Mac Daddy',
                restaurant_id = 1,
                image = 'https://129534174.cdn6.editmysite.com/uploads/1/2/9/5/129534174/s133514416528582280_p1046_i3_w720.jpeg?dpr=2'
            ),

            #Gioia's
            Sandwiches(
                sandwich_name = 'Italian Trio',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614775182012-7FX5PJHAREQX1UHRLZMY/Gioia%27s+Deli+-+20201013+-+165.jpg?format=2500w'
            ),
            Sandwiches(
                sandwich_name = 'Spicy Dagget',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614775590788-N02YNVSTE1YDEEI66CI9/Gioia%27s+Deli+-+20201013+-+168.jpg?format=1000w'
            ),
            Sandwiches(
                sandwich_name = 'Hot Salami',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614774765261-FMFI67QVB3TGYVA57YZL/IMG_4855.jpg?format=2500w'
            ),
            Sandwiches(
                sandwich_name = 'Hot Salami and Roast Beef',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614774812379-VNTDZRERH43GJJC3PCGY/Gioia%27s+Deli+-+20201013+-+153.jpg?format=2500w'
            ),
            Sandwiches(
                sandwich_name = 'Porknado',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614775493354-VX356RX4NR3IX23MMZJE/Gioia%27s+Deli+-+20201013+-+158.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Hogfather',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614775531063-B42NUBTFTH30CW4053GF/Gioia%27s+Deli+-+20201013+-+177.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Big Italian',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1623013268215-ZD9VBB4X70WVD1MNTZ89/Gioia%27s+Deli+-+20210603+-+108.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Hot Roast Beef',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776338691-6QPSRO5J6U68NMAVCSIV/IMG_4856.jpg?format=2500w'
            ),
            Sandwiches(
                sandwich_name = 'Meatball',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776367633-AA3JHQA5008JV8L0ANKN/IMG_4876.jpg?format=2500w'
            ),
            Sandwiches(
                sandwich_name = 'Italian Delight',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776409180-4WAVYR5TM69MAOYVPF2X/Gioia%27s+Deli+-+20201013+-+180.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Club',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776444722-KX5DLW9AH5M3PTFI9194/Gioia%27s+Deli+-+20201013+-+206.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Italian Poor Boy',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776490161-JYZBSY6FYUIQF56NGGUK/Gioia%27s+Deli+-+20201013+-+184.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Turkey',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776530414-U37E76ZO3W8TZHPR3N92/Gioia%27s+Deli+-+20201013+-+191.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Rich Boy',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776567842-J7AF4WJU12D9WEMR3MVI/Gioia%27s+Deli+-+20201013+-+197.jpg?format=1500w'
            ),
            Sandwiches(
                sandwich_name = 'Veggie',
                restaurant_id = 2,
                image = 'https://images.squarespace-cdn.com/content/v1/5a7c74ccedaed821286dde9c/1614776592193-0J5I217DCPLBYX51CUC8/Gioia%27s+Deli+-+20201013+-+195.jpg?format=1500w'
            ),

            #Amighetti's 
            Sandwiches(
                sandwich_name = "Amighetti's Special",
                restaurant_id = 3,
                image = 'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-132507000000000000/menu/images/item-6088b522-b808-449a-939d-d3974d6f6ae4.jpg?size=medium'
            ),
            Sandwiches(
                sandwich_name = 'Top of the Hill',
                restaurant_id = 3,
                image = 'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-132507000000000000/menu/images/item-8ea9a317-2afb-4614-8c1d-8143ed6e42e2.jpg?size=medium'
            ),
            Sandwiches(
                sandwich_name = 'Roast Beef Special',
                restaurant_id = 3,
                image = 'https://d2s742iet3d3t1.cloudfront.net/restaurants/restaurant-132507000000000000/menu/images/item-8347ebbf-0bb2-451b-90cd-f4caa26ef8b6.jpg?size=medium'
            ),
        ]
        db.session.add_all(sandwiches)
        db.session.commit()

        print("Seeding Check Ins...")

        checkins = [
            CheckIn(
                user_id = choice([new_user.id for new_user in new_users]),
                sandwich_id = choice([sandwich.id for sandwich in sandwiches]),
            )
        ]

        print("Done seeding!")

        db.session.add_all(checkins)
        db.session.commit()

