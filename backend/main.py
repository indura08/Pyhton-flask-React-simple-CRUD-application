#contain main roots or the main end points
#localhost:5000/home , in here localhost 5000 mens the server and home means the end point

from flask import request, jsonify
from config import db,app
from models import Contact

@app.route("/")
def sayHello():
    return "hello from api this was edited in version1" 

@app.route("/contacts" , methods=["GET"]) #meka awilla decorator ekak. 
def get_contacts():
    contacts = Contact.query.all()
    json_contact = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts" : json_contact})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

#namek email ekk nattnm me widyt handle krnwa
    if not first_name or not last_name or not email:
        return(
            jsonify({"message": "you must include a first name last name and email"}),400, #me wage 400 danne status code eka pennana , uda end point ekt adlal kalle daala natte eke enne 200 nisa mokd 200 defau;t watenwa meke 400 wage aaye aaye daanna one nha
        )

#nama email arwa mewa thiynwa nm eka database ekat danwa
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)

#alutin gattu contact details  database ekat danwa    
    try:
        db.session.add(new_contact) # methanidi database ekt watenne nha directly methana nikan hariyt staging area eka wage
        db.session.commit() #menna mekdi thami database ekat watenne session eke database ekat watenna one dewal
    
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message" : "User created!"}),200

@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):

    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found" }), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)#meken krnne firstName ekat agayak nattnm eta passe deela thiyna aruguement eke value eka adalal vaiable ekat asign knwa 
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email" , contact.email)

    db.session.commit()

    return jsonify({"message": "User Updated!"}),200

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"]) #meke hodt blnna int:user_id kiyaddi user liynna klain space thibboth error enwa
def delete_contact(user_id):

    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "User not found" }), 404
    
    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted successfully!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, host='0.0.0.0', port=5001)

    