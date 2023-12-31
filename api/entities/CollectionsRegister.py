from .Users import Users
from .Events import Events
from .LandingPages import LandingPages
from .Leads import Leads
from .Segments import Segments
from .LeadScoringPerfil import LeadScoringPerfil
from .LeadInteresse import LeadInteresse
from .Email import Email


class CollectionsRegister:
    # Respeitar esse padrão:
    #   TUDO_MAIUSCULO = (CamelCase, CamelCase.__name__)

    USERS = (Users, Users.__name__)
    EVENTS = (Events, Events.__name__)
    LEADS = (Leads, Leads.__name__)
    LANDINGPAGES = (LandingPages, LandingPages.__name__)
    SEGMENTS = (Segments, Segments.__name__)
    LEADSCORINGPERFIL = (LeadScoringPerfil, LeadScoringPerfil.__name__)
    LEADINTERESSE = (LeadInteresse, LeadInteresse.__name__)
    EMAIL = (Email, Email.__name__)
