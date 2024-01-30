from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable = False)
    user_email = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)

    # relationships
    checkin = db.relationship("CheckIn", back_populates = 'user')

    # serialize rules
    serialize_rules = ('-checkin.user', )

    # validations
    @validates('username')
    def validate_username(self, key, value):
        if 0 < len(value) <= 25:
            return value
        else:
            raise ValueError
    
    @validates('password')
    def validate_password(self, key, value):
        if 0 < len(value) <= 25:
            return value
        else:
            raise ValueError

class Restaurants(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key = True)
    restaurant_name = db.Column(db.String)
    restaurant_location = db.Column(db.String)

    # relationships
    sandwich = db.relationship("Sandwiches", back_populates = 'restaurant')

    # serilialize rules
    serialize_rules = ('-sandwich.restaurant', )

    # validations

class Sandwiches(db.Model, SerializerMixin):
    __tablename__ = "sandwiches"

    id = db.Column(db.Integer, primary_key = True)
    sandwich_name = db.Column(db.String)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))
    image = db.Column(db.Text)

    # relationships
    checkin = db.relationship("CheckIn", back_populates = 'sandwich')
    restaurant = db.relationship("Restaurants", back_populates = 'sandwich')

    # serilialize rules
    serialize_rules = ('-checkin.sandwich', '-restaurant.sandwich')

    # validations

class CheckIn(db.Model, SerializerMixin):
    __tablename__ = "checkin"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sandwich_id = db.Column(db.Integer, db.ForeignKey('sandwiches.id'))
    checkin_date = db.Column(db.Date)

    # relationships
    user = db.relationship("Users", back_populates = "checkin")
    sandwich = db.relationship("Sandwiches", back_populates = "checkin")

    # serialize rules
    serialize_rules = ('-user.checkin', '-sandwich.checkin')

    # validations