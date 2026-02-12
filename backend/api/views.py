import json
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework import generics

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from .serializers import ClientSerializer, CustomTokenObtainPairSerializer, FailSerializer, SupplierSerializer, PersonRelatedSerializer, ProjectSerializer, ExpensesSerializer,PollSerializer ,JobHistorySerializer, IncomesSerializer,SalesOfferCardSerializer, SalesOfferCardReviseSerializer, OperationCareSerializer, InventorSerializer, StringSerializer, PowerPlantSerializer, EventsSerializer, DateSerializer
from .models import Date, Events, Project, Expenses, Incomes, JobHistory, Inventor, Poll, PowerPlant, PersonRelated
from .models import SalesOfferCard,SalesOfferCard_Revise, Clients, Operation_Care
from .models import Supplier, Operation_Care, Fail, Inventor, String
from django.contrib.auth.decorators import login_required, user_passes_test

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

import requests

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset= Project.objects.all().prefetch_related('project_expenses', 'project_jobhistories', 'project_incomes', 'Company_id')
    serializer_class=ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    
class ProjectDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Project.objects.all().prefetch_related('project_expenses', 'project_jobhistories', 'project_incomes', 'Company_id')
    serializer_class=ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ExpensesListCreateAPIView(generics.ListCreateAPIView):
    queryset= Expenses.objects.all()
    serializer_class=ExpensesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ExpenseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Expenses.objects.all()
    serializer_class=ExpensesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class JobHistoryListCreateAPIView(generics.ListCreateAPIView):
    queryset= JobHistory.objects.all()
    serializer_class=JobHistorySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class JobHistoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= JobHistory.objects.all()
    serializer_class=JobHistorySerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 

class IncomesListCreateAPIView(generics.ListCreateAPIView):
    queryset= Incomes.objects.all()
    serializer_class=IncomesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class IncomeDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Incomes.objects.all()
    serializer_class=IncomesSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ClientsListCreateAPIView(generics.ListCreateAPIView):
    queryset= Clients.objects.all()
    serializer_class=ClientSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
class ClientDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Clients.objects.all()
    serializer_class=ClientSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class PersonRelatedsListCreateAPIView(generics.ListCreateAPIView):
    queryset= PersonRelated.objects.all()
    serializer_class=PersonRelatedSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
class PersonRelatedDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PersonRelated.objects.all()
    serializer_class=PersonRelatedSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class PowerPlantsListCreateAPIView(generics.ListCreateAPIView):
    queryset= PowerPlant.objects.all()
    serializer_class=PowerPlantSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
class PowerPlantDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= PowerPlant.objects.all()
    serializer_class=PowerPlantSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class SuppliersListCreateAPIView(generics.ListCreateAPIView):
    queryset= Supplier.objects.all()
    serializer_class=SupplierSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
      
class SupplierDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Supplier.objects.all()
    serializer_class=SupplierSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class SalesOfferListCreateAPIView(generics.ListCreateAPIView):
    queryset= SalesOfferCard.objects.all().prefetch_related('salesoffer_revises', 'Client_Card')
    serializer_class=SalesOfferCardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class SalesOfferDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= SalesOfferCard.objects.all().prefetch_related('salesoffer_revises', 'Client_Card')
    serializer_class=SalesOfferCardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
  
class SalesOfferReviseListCreateAPIView(generics.ListCreateAPIView):
    queryset= SalesOfferCard_Revise.objects.all()
    serializer_class=SalesOfferCardReviseSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
       
class SalesOfferReviseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= SalesOfferCard_Revise.objects.all()
    serializer_class=SalesOfferCardReviseSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class InventorListCreateAPIView(generics.ListCreateAPIView):
    queryset= Inventor.objects.all()
    serializer_class=InventorSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class InventorDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Inventor.objects.all()
    serializer_class=InventorSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class StringListCreateAPIView(generics.ListCreateAPIView):
    queryset= String.objects.all()
    serializer_class=StringSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class StringDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= String.objects.all()
    serializer_class=StringSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class OperationCareListCreateAPIView(generics.ListCreateAPIView):
    queryset= Operation_Care.objects.all().prefetch_related('operation_inventors__inventor_strings', 'Operation_Care_Company')
    serializer_class=OperationCareSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class OperationCareDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Operation_Care.objects.all().prefetch_related('operation_inventors__inventor_strings', 'Operation_Care_Company')
    serializer_class=OperationCareSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class FailListCreateAPIView(generics.ListCreateAPIView):
    queryset = Fail.objects.all()
    serializer_class = FailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class FailRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fail.objects.all()
    serializer_class = FailSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class PollListCreateAPIView(generics.ListCreateAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class PollRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class DateListCreateAPIView(generics.ListCreateAPIView):
    queryset= Date.objects.all()
    serializer_class=DateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class DateDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Date.objects.all()
    serializer_class=DateSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class EventsListCreateAPIView(generics.ListCreateAPIView):
    queryset= Events.objects.all()
    serializer_class=EventsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
class EventsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Events.objects.all()
    serializer_class=EventsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

from .models import Calendar
from .serializers import CalendarSerializer

class CalendarListCreateView(generics.ListCreateAPIView):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class CalendarRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

def get_dollar_rate(request, date):
    headers={'key':'qYyWXNCbA0'}
    response = requests.get(f"https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.S&startDate={date}&endDate={date}&type=json", headers=headers)
    #api='qYyWXNCbA0'
    #evds = e.evdsAPI(api)
    #dollar =  evds.get_data(['TP.DK.USD.S.YTL'], startdate=date, enddate=date)    
    
    data = json.loads(response.content)

    # JSON verilerini işleyin
    items = data.get('items', [])
    if items:
        tarih = items[0]['Tarih']
        usd_degeri = items[0]['TP_DK_USD_S']
        print(f"Tarih: {tarih}, USD Değeri: {usd_degeri}")
    else:
        print("Belirtilen tarih için veri bulunamadı.")
    #rate=dollar.TP_DK_USD_S_YTL.values[0]
    #rate = round(rate, 4)  # 4 ondalık basamak
    return JsonResponse({'rate': usd_degeri})