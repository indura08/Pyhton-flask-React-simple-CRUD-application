#contain all of our database modeles
#meken api eka hdnwa

from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), unique = False , nullable = False)
    last_name = db.Column(db.String(80), unique = False , nullable = False)
    email = db.Column(db.String(80), unique = False , nullable = False)

#samnyen api walala json onemai mokda api waladi commmunicate krnne json type walin. api ekn json ynwana saha gannwa ewa continuously wenwa e hinda apita json files one

    def to_json(self):
        return{
            "id": self.id, # mewaye mul nama camel case yanne json waldi javascript nisa javascript walal samnyen react waldi css kali ghuwath - ekn wen krnne nha camel case neh yanne
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email
        }
