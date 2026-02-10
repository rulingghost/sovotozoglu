import * as Yup from 'yup'

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/ // 15:30
const phoneRegex = /^\(\d{3}\) \d{3} \d{2} \d{2}$/ // (555) 555 55 55
const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ // 2024-10-15 (for api)

const emailValidation = Yup.string().email('E-posta formatı geçersiz')
const dateValidation = Yup.string().matches(dateRegex, 'Tarih formatı geçersiz')
const phoneValidation = Yup.string().matches(phoneRegex, 'Telefon formatı geçersiz')

//---------------------------------------------------------------------

export const clientValidation = Yup.object({
  CompanyName_Clients: Yup.string().required('Bu alan zorunludur'),
  ContactPerson: Yup.string(),
  PhoneNumber: phoneValidation,
  Email: emailValidation,
  Location: Yup.string(),
})

export const supplierValidation = Yup.object({
  CompanyName_Supplier: Yup.string().required('Bu alan zorunludur'),
  ContactPerson: Yup.string(),
  PhoneNumber: phoneValidation,
  Email: emailValidation,
  Location: Yup.string(),
})

export const projectValidation = Yup.object({
  Company_id: Yup.string().required('Bu alan zorunludur'),
  ProjectName: Yup.string().required('Bu alan zorunludur'),
  ProjectCode: Yup.string().required('Bu alan zorunludur'),
  CompanyUndertakingWork: Yup.string(),
  Location: Yup.string(),
  Cost_NotIncludingKDV: Yup.string(),
  AC_Power: Yup.string(),
  DC_Power: Yup.string(),
  CalculatedCost_NotIncludingKDV: Yup.string(),
  StartDate: dateValidation,
  FinishDate: dateValidation,
  KDV_Rate: Yup.string(),
  Terrain_Roof: Yup.string(),
  Incentive: Yup.string(),
  Situation: Yup.string(),
})

export const projectIncomeValidation = Yup.object({
  CompanyName_Pay_Incomes: Yup.string().required('Bu alan zorunludur'),
  CompanyName_ReceivePayment_Incomes: Yup.string(),
  Amount_Incomes: Yup.string(),
  Dollar_Rate_Incomes: Yup.string(),
  ChekDate_Incomes: dateValidation,
  PaymentType_Incomes: Yup.string(),
  LastChekDate_Incomes: dateValidation,
})

export const projectJobHistoryValidation = Yup.object({
  CompanyName_Job_JobHistory: Yup.string().required('Bu alan zorunludur'),
  ExpensDetails_JobHistory: Yup.string(),
  Amount_JobHistory: Yup.string(),
  Date_JobHistory: dateValidation,
  Dollar_Rate_JobHistory: Yup.string(),
  Invoice_No_JobHistory: Yup.string(),
})

export const projectExpenseValidation = Yup.object({
  CompanyName_Paying_Expenses: Yup.string().required('Bu alan zorunludur'),
  CompanyName_FromPaymentMade_Expenses: Yup.string(),
  ExpensDetails_Expenses: Yup.string(),
  Amount_Expenses: Yup.string(),
  Date_Expenses: dateValidation,
  Dollar_Rate_Expenses: Yup.string(),
  Bank_Expenses: Yup.string(),
})

export const salesProcessValidation = Yup.object({
  Client_Card: Yup.string().required('Bu alan zorunludur'),
  SalesPersonRelated: Yup.string().required('Bu alan zorunludur'),
  Location_Card: Yup.string().required('Bu alan zorunludur'),
  Offer_Cost_NotIncludingKDV_Card: Yup.string(),
  UnitOffer_NotIncludingKDV: Yup.string(),
  AC_Power_Card: Yup.string(),
  Cost_NotIncludingKDV_Card: Yup.string(),
  UnitCost_NotIncludingKDV: Yup.string(),
  DC_Power_Card: Yup.string(),
  Situation_Card: Yup.string().required('Bu alan zorunludur'),
  Comment_Card_1: Yup.string(),
  Date_Card: dateValidation,
  Person_Deal: Yup.string(),
  Terrain_Roof_Card: Yup.string(),
  Roof_Cost_Card: Yup.string(),
})

export const salesProcessCommentValidation = Yup.object({
  Comment_Person_Card: Yup.string(),
  Comment_Card: Yup.string(),
  Comment_Telno_Card_1: phoneValidation,
  Comment_Date_Card_1: dateValidation,
  Comment_Telno_Card_2: phoneValidation,
  Comment_Date_Card_2: dateValidation,
  Comment_Telno_Card_3: phoneValidation,
  Comment_Date_Card_3: dateValidation,
  Comment_Telno_Card_4: phoneValidation,
  Comment_Date_Card_4: dateValidation,
  Comment_Telno_Card_5: phoneValidation,
  Comment_Date_Card_5: dateValidation,
  Comment_Telno_Card_6: phoneValidation,
  Comment_Date_Card_6: dateValidation,
  Comment_Telno_Card_7: phoneValidation,
  Comment_Date_Card_7: dateValidation,
})

export const operationCareValidation = Yup.object({
  Operation_Care_Company: Yup.string().required('Bu alan zorunludur'),
  Operation_Care_Inventor_Brand: Yup.string(),
  Operation_Care_Panel_Brand: Yup.string(),

  Operation_Care_Location: Yup.string(),
  Operation_Care_Inventor_Power: Yup.string(),
  Operation_Care_Panel_Power: Yup.string(),

  Operation_Care_Address: Yup.string(),
  Operation_Care_Inventor_Number: Yup.string(),
  Operation_Care_VOC: Yup.string(),

  Operation_Care_Terrain_Roof: Yup.string(),
  Operation_Care_AC_Power: Yup.string(),
  Operation_Care_Number_Str: Yup.string(),

  Operation_Care_Switchgear_Material: Yup.string(),
  Operation_Care_DC_Power: Yup.string(),
  Operation_Care_Panel_Number_Str: Yup.string(),

  Operation_Care_Start_Date: Yup.string(),
  Operation_Care_endContract_Date: Yup.string(),
  Operation_Care_Direction: Yup.string(),
})

export const powerPlantValidation = Yup.object({
  PowerPlantName: Yup.string().required('Bu alan zorunludur'),
})

export const relatedPersonValidation = Yup.object({
  PersonRelatedName: Yup.string().required('Bu alan zorunludur'),
})

export const situationCardValidation = Yup.object({
  Situation_Card: Yup.string().required('Bu alan zorunludur'),
})

export const failValidation = Yup.object({
  Fail_Operation_Care: Yup.string().required('Bu alan zorunludur'),
  Fail_Central_Name: Yup.string(),
  Fail_Information_Person: Yup.string(),
  Fail_Detection_Date: dateValidation,
  Fail_Team_Info_Date: dateValidation,
  Fail_Repair_Date: dateValidation,
  Fail_Guaranteed: Yup.string(),
  Fail_Situation: Yup.string(),
  Fail_Detail: Yup.string(),
})

export const failInvoiceValidation = Yup.object({
  Fail_Bill_Central_Name: Yup.string(),
  Fail_Bill_Process: Yup.string(),
  Fail_Bill_Date: dateValidation,
  Fail_Bill_Detail: Yup.string(),
  Fail_Bill_File: Yup.mixed()
    .required('Lütfen fatura belgesi seçiniz!')
    .test('fileSize', 'Dosya boyutu 0’dan büyük olmalıdır.', (value) => {
      return value && value.size > 0
    }),
})

export const calendarValidation = Yup.object({
  Type: Yup.string().required('Bu alan zorunludur'),

  Calendar_Supplier: Yup.string().when('Type', {
    is: (type) => type === 'payment',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),
  Amount: Yup.string().when('Type', {
    is: (type) => type === 'payment',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),
  Time: Yup.string().when('Type', {
    is: (type) => type === 'payment',
    then: (schema) => schema.required('Bu alan zorunludur').matches(timeRegex, 'Saat formatı geçersiz'),
    otherwise: (schema) => schema,
  }),

  Calendar_Client: Yup.string().when('Type', {
    is: (type) => type === 'sales',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),
  AppointmentType: Yup.string().when('Type', {
    is: (type) => type === 'sales',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),

  Calendar_PowerPlant: Yup.string().when('Type', {
    is: (type) => type === 'maintenance',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),
  Site: Yup.string().when('Type', {
    is: (type) => type === 'maintenance',
    then: (schema) => schema.required('Bu alan zorunludur'),
    otherwise: (schema) => schema,
  }),

  RelatedPerson: Yup.string(),
  Note: Yup.string(),
  Date: Yup.string().matches(dateRegex, 'Tarih formatı geçersiz').required('Bu alan zorunludur'),
})
