#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import make_response, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, Users, Restaurants, Sandwiches, CheckIn

# Views go here!

@app.route('/users', methods = ['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = Users.query.all()
        users_dict = [user.to_dict(rules = ('-checkin',)) for user in users]

        response = make_response(
            users_dict,
            200
        )
    elif request.method == 'POST':
        try:
            form_data = request.get_json()
            new_user = Users(
                username = form_data['username'],
                user_email = form_data['user_email'],
                password = form_data['password']
            )
            db.session.add(new_user)
            db.session.commit()

            response = make_response(
                new_user.to_dict(),
                201
            )
        except ValueError:
            response = make_response(
                {'Error': 'Validation error'},
                400
            )

    return response

@app.route('/users/<int:id>', methods = ['GET','PATCH'])
def users_by_id(id):
    selected_user = Users.query.filter(Users.id == id).first()

    if selected_user:
        if request.method == 'GET':
            response = make_response(
                selected_user.to_dict(rules = ('-checkin.sandwich', )),
                200
            )
        elif request.method == 'PATCH':
            try:
                form_data = request.get_json()

                for attr in form_data:
                    setattr(selected_user, attr, form_data[attr])

                db.session.commit()

                response = make_response(
                    selected_user.to_dict(),
                    201
                )
            except ValueError:
                response = make_response(
                    {'Error': 'Validation error!'},
                    400
                )
    else:
        response = make_response(
            {'Error': 'User not found'},
            400
        )
    return response

@app.route('/restaurants', methods = ['GET'])
def restaurants():
    restaurants = Restaurants.query.all()
    restaurants_dict = [restaurant.to_dict(rules = ('-sandwich.checkin', )) for restaurant in restaurants]

    response = make_response(
        restaurants_dict,
        200
    )
    return response

@app.route('/restaurants/<int:id>', methods = ['GET'])
def restaurants_by_id(id):
    restaurants = Restaurants.query.filter(Restaurants.id == id).first()

    if restaurants:
        response = make_response(
            restaurants.to_dict(),
            200
        )
    else:
        response = make_response(
            {'Error': 'Restaurant not found'},
            404
        )
    return response

@app.route('/sandwiches', methods = ['GET'])
def sandwiches():
    sandwiches = Sandwiches.query.all()
    sandwiches_dict = [sandwich.to_dict() for sandwich in sandwiches]

    response = make_response(
        sandwiches_dict,
        200
    )
    return response

@app.route('/sandwiches/<int:id>', methods = ['GET'])
def sandwiches_by_id(id):
    sandwiches = Sandwiches.query.filter(Sandwiches.id == id).first()

    if sandwiches:
        response = make_response(
            sandwiches.to_dict(),
            200
        )
    else:
        response = make_response(
            {'error': 'Sandwich not found'},
            404
        )
    return response

@app.route('/checkin', methods = ['GET', 'POST'])
def checkins():
    if request.method == 'GET':
        checkins = CheckIn.query.all()
        checkins_dict = [checkin.to_dict() for checkin in checkins]

        response = make_response(
            checkins_dict,
            200
        )
    elif request.method == 'POST':
        form_data = request.get_json()
        new_checkin = CheckIn(
            user_id = form_data['user_id'],
            sandwich_id = form_data['sandwich_id'],
        )
        db.session.add(new_checkin)
        db.session.commit()
        response = make_response(
            new_checkin.to_dict(),
            201
        )
    return response

@app.route('/checkin/<int:user>', methods = ['GET'])
def checkins_by_id(user):
    checkins = CheckIn.query.filter(CheckIn.user_id == user).all()

    checkins_dict = [checkin.to_dict() for checkin in checkins]

    response = make_response(
        checkins_dict,
        200
    )
    
    return response

@app.route('/checkin/<int:user>/<int:sandwich_id>', methods = ['DELETE'])
def checkin_delete(user, sandwich_id):
    checkin_deletes = CheckIn.query.filter(db.and_(CheckIn.user_id == user, CheckIn.sandwich_id == sandwich_id)).all()

    for checkin_delete in checkin_deletes:
        db.session.delete(checkin_delete)

    db.session.commit()

    response = make_response(
        {},
        204
    )

    return response

@app.route('/login', methods = ['POST'])
def users_by_email():
    try:
        form_data = request.get_json()
        email = form_data['email']
        password = form_data['password']
        user = Users.query.filter(Users.user_email == email).first()

        if user:
            if password == user.password:
                # login_body = user.to_dict(rules=('-swipes','-username','-passwordhash',))
                login_body = user.to_dict(only=('id',))
                response = make_response(
                    login_body,
                    200
                )
            else:
                response = make_response(
                    {"error": "wrong password"},
                    401
                )
        else:
            response = make_response(
                {"error": "account does not exist"},
                404
            )
    except:
        response = make_response(
            {"error": "account does not exist"},
            404
        )
    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)

