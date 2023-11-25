from .Users import Users
from .Events import Events
from .Leads import Leads


class CollectionsRegister:
    # Respeitar esse padrão:
    #   TUDO_MAIUSCULO = (CamelCase, CamelCase.__name__)

    USERS = (Users, Users.__name__)
    EVENTS = (Events, Events.__name__)
    LEADS = (Leads, Leads.__name__)
