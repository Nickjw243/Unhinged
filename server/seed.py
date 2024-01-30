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
                checkin_date = date.today()
            )
        ]

        print("Done seeding!")

        db.session.add_all(checkins)
        db.session.commit()

