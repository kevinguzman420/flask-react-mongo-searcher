from app import db
import re

class Movies(db.Document):
    title = db.StringField(required=True)
    year = db.IntField()
    rated = db.StringField()
    director = db.StringField()
    actors = db.ListField()

    @staticmethod
    def get_all():
        return Movies.objects.to_json()
    
    @staticmethod
    def searcher(key):
        regex = re.compile('.*bob.*')
        return Movies.objects(__raw__={"title": {'$regex': f'{key}', '$options': 'i'}})