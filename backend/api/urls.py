from django.urls import path
from api import views  as api_view


urlpatterns = [
 #******************************* A P I ***********************************
    path('api/token/', api_view.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('api/v1/project/', api_view.ProjectListCreateAPIView.as_view(), name='api-projects'),
    path('api/v1/project/<pk>', api_view.ProjectDetailAPIView.as_view(), name='api-project-detail'),
    
    path('api/v1/person-related/', api_view.PersonRelatedsListCreateAPIView.as_view(), name='api-person-related'),
    path('api/v1/person-related/<pk>', api_view.PersonRelatedDetailAPIView.as_view(), name='api-person-related-detail'),

    path('api/v1/client/', api_view.ClientsListCreateAPIView.as_view(), name='api-clients'),
    path('api/v1/client/<pk>', api_view.ClientDetailAPIView.as_view(), name='api-client-detail'),

    path('api/v1/powerpoint/', api_view.PowerPlantsListCreateAPIView.as_view(), name='api-powerpoint'),
    path('api/v1/powerpoint/<pk>', api_view.PowerPlantDetailAPIView.as_view(), name='api-powerpoint-detail'),

    path('api/v1/supplier/', api_view.SuppliersListCreateAPIView.as_view(), name='api-suppliers'),
    path('api/v1/supplier/<pk>', api_view.SupplierDetailAPIView.as_view(), name='api-supplier-detail'),

    path("api/v1/expense/", api_view.ExpensesListCreateAPIView.as_view(), name='api-expenses'),
    path('api/v1/expense/<pk>', api_view.ExpenseDetailAPIView.as_view(), name='api-expenses-detail'),

    path("api/v1/job_history/", api_view.JobHistoryListCreateAPIView.as_view(), name='api-job-history'),
    path('api/v1/job_history/<pk>', api_view.JobHistoryDetailAPIView.as_view(), name='api-job-history-detail'),

    path("api/v1/income/", api_view.IncomesListCreateAPIView.as_view(), name='api-incomes'),
    path('api/v1/income/<pk>', api_view.IncomeDetailAPIView.as_view(), name='api-income-detail'),
    
    path("api/v1/sales_offer/", api_view.SalesOfferListCreateAPIView.as_view(), name='api-sales-offer'),
    path('api/v1/sales_offer/<pk>', api_view.SalesOfferDetailAPIView.as_view(), name='api-sales-offer-detail'),
    
    path("api/v1/sales_offer_revise/", api_view.SalesOfferReviseListCreateAPIView.as_view(), name='api-sales-offer-revise'),
    path('api/v1/sales_offer_revise/<pk>', api_view.SalesOfferReviseDetailAPIView.as_view(), name='api-sales-offer-revise-detail'),
 
    path("api/v1/operation_care/", api_view.OperationCareListCreateAPIView.as_view(), name='api-operation-care'),
    path('api/v1/operation_care/<pk>', api_view.OperationCareDetailAPIView.as_view(), name='api-operation-care-detail'),
    
    path("api/v1/inventor/", api_view.InventorListCreateAPIView.as_view(), name='api-inventor'),
    path('api/v1/inventor/<pk>', api_view.InventorDetailAPIView.as_view(), name='api-inventor-detail'),
   
    path("api/v1/inventor/", api_view.InventorListCreateAPIView.as_view(), name='api-inventor'),
    path('api/v1/inventor/<pk>', api_view.InventorDetailAPIView.as_view(), name='api-inventor-detail'),
   
    path("api/v1/string/", api_view.StringListCreateAPIView.as_view(), name='api-string'),
    path('api/v1/string/<pk>', api_view.StringDetailAPIView.as_view(), name='api-string-detail'),

    path("api/v1/fail/", api_view.FailListCreateAPIView.as_view(), name='api-fail'),
    path('api/v1/fail/<pk>', api_view.FailRetrieveUpdateDestroyAPIView.as_view(), name='api-fail-detail'),

    path("api/v1/poll/", api_view.PollListCreateAPIView.as_view(), name='api-poll'),
    path('api/v1/poll/<pk>', api_view.PollRetrieveUpdateDestroyAPIView.as_view(), name='api-poll-detail'),

    path("api/v1/date/", api_view.DateListCreateAPIView.as_view(), name='api-date'),
    path('api/v1/date/<pk>', api_view.DateDetailAPIView.as_view(), name='api-date-detail'),
    
    path("api/v1/events/", api_view.EventsListCreateAPIView.as_view(), name='api-event'),
    path('api/v1/events/<pk>', api_view.EventsDetailAPIView.as_view(), name='api-events-detail'),

    path('api/v1/calendar/', api_view.CalendarListCreateView.as_view(), name='calendar-list-create'),
    path('api/v1/calendar/<int:pk>/', api_view.CalendarRetrieveUpdateDeleteView.as_view(), name='calendar-detail'),

    path("get_dollar_rate/<str:date>/", api_view.get_dollar_rate, name='get_dollar_rate'),

    #******************************* ------- ***********************************

]