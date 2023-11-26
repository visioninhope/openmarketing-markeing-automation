from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.LandingPageRepository import LandingPageRepository
import json
from bson.objectid import ObjectId


class LandingPagesAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LandingPageRepository()

    def get_landing_pages(self, id):
        return self._repo.get_by_id(id)

    def update_landing_page(self, id, body):
        body = self._repo._repository.convert_ids_to_objectid(body)
        update = self._repo.update(id, body)
        return True

    def create_landing_page(self, body):
        return None