from django.contrib import admin

from.models import Project,SalesOfferCard
from.models import Supplier, Clients,  Incomes, JobHistory, Expenses, SalesOfferCard_Revise
from.models import Poll, Fail, Operation_Care, Inventor, String, PowerPlant, PersonRelated, Calendar
admin.site.register(Project)

admin.site.register(Supplier)
admin.site.register(Clients)
admin.site.register(Incomes)
admin.site.register(JobHistory)
admin.site.register(Expenses)

admin.site.register(SalesOfferCard)
admin.site.register(SalesOfferCard_Revise)
admin.site.register(Fail)
admin.site.register(Operation_Care)
admin.site.register(Inventor)
admin.site.register(String)
admin.site.register(Poll)
admin.site.register(PowerPlant)
admin.site.register(PersonRelated)
admin.site.register(Calendar)

