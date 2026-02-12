import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import NotAuthorized from './components/auth/NotAuthorized'
import PageNotFound from './components/custom/PageNotFound'
import Layout from './components/layout/Layout'
import Loader from './components/custom/Loader'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Lazy loaded components
const Login = lazy(() => import('./components/pages/login/Login'))
const Home = lazy(() => import('./components/pages/home/Home'))
const Client = lazy(() => import('./components/pages/client/Client'))
const Supplier = lazy(() => import('./components/pages/supplier/Supplier'))
const SalesOffer = lazy(() => import('./components/pages/sales-offer/SalesOffer'))
const List = lazy(() => import('./components/pages/sales-offer/list/List'))
const PendingJobs = lazy(() => import('./components/pages/sales-offer/pending-jobs/PendingJobs'))
const SalesProcess = lazy(() => import('./components/pages/sales-offer/sales-process/SalesProcess'))
const LostJobs = lazy(() => import('./components/pages/sales-offer/lost-jobs/LostJobs'))
const WonJobs = lazy(() => import('./components/pages/sales-offer/won-jobs/WonJobs'))
const Revises = lazy(() => import('./components/pages/sales-offer/revises/Revises'))
const Report = lazy(() => import('./components/pages/report/Report'))
const Calendar = lazy(() => import('./components/pages/calendar/Calendar'))
const Project = lazy(() => import('./components/pages/project/Project'))
const ProjectDetail = lazy(() => import('./components/pages/project/detail/ProjectDetail'))
const ProjectIncome = lazy(() => import('./components/pages/project/income/ProjectIncome'))
const ProjectRealizedCost = lazy(() => import('./components/pages/project/realized-cost/ProjectRealizedCost'))
const OperationCare = lazy(() => import('./components/pages/operation-care/OperationCare'))
const Maintenance = lazy(() => import('./components/pages/operation-care/maintenance/Maintenance'))
const Breakdown = lazy(() => import('./components/pages/operation-care/breakdown/Breakdown'))
const Invoices = lazy(() => import('./components/pages/operation-care/invoices/Invoices'))
const ProjectCostSummary = lazy(() => import('./components/pages/project/realized-cost/ProjectCostSummary'))
const Stock = lazy(() => import('./components/pages/stock/Stock'))
const Overview = lazy(() => import('./components/pages/stock/overview/Overview'))
const Products = lazy(() => import('./components/pages/stock/products/Products'))
const Statistic = lazy(() => import('./components/pages/stock/statistic/Statistic'))
const Stores = lazy(() => import('./components/pages/stock/stores/Stores'))
const Orders = lazy(() => import('./components/pages/stock/orders/Orders'))
const Detail = lazy(() => import('./components/pages/operation-care/detail/Detail'))
const TrackList = lazy(() => import('./components/pages/operation-care/detail/track-list/TrackList'))
const TrackBreakdown = lazy(() => import('./components/pages/operation-care/detail/track-breakdown/TrackBreakdown'))
const TrackMaintenance = lazy(() => import('./components/pages/operation-care/detail/track-maintenance/TrackMaintenance'))
const ReportChart = lazy(() => import('./components/pages/report/ReportChart'))
const ReportTable = lazy(() => import('./components/pages/report/ReportTable'))
const IncomeExpense = lazy(() => import('./components/pages/report/income-expense/IncomeExpense'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route
          element={
            <PrivateRoute allowedGroups={['All']}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path='/'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <Home />
              </PrivateRoute>
            }
          />

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/client'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <Client />
              </PrivateRoute>
            }
          />

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/supplier'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <Supplier />
              </PrivateRoute>
            }
          />

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/project'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <Project />
              </PrivateRoute>
            }
          />
          <Route
            path='/project/details/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <ProjectDetail />
              </PrivateRoute>
            }
          />
          <Route
            path='/project/details/income/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <ProjectIncome />
              </PrivateRoute>
            }
          />
          <Route
            path='/project/details/realized-cost/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <ProjectRealizedCost />
              </PrivateRoute>
            }
          />
          <Route
            path='/project/details/realized-cost-summary/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Proje']}>
                <ProjectCostSummary />
              </PrivateRoute>
            }
          />

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/sales-offer'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Satis']}>
                <SalesOffer />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to='sales-process' />} />
            <Route path='list' element={<List />} />
            <Route path='pending-jobs' element={<PendingJobs />} />
            <Route path='sales-process' element={<SalesProcess />} />
            <Route path='lost-jobs' element={<LostJobs />} />
            <Route path='won-jobs' element={<WonJobs />} />
          </Route>

          <Route
            path='/sales-offer/revises/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Satis']}>
                <Revises />
              </PrivateRoute>
            }
          />

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/stock'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Stok']}>
                <Stock />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to='overview' />} />
            <Route path='overview' element={<Overview />} />
            <Route path='products' element={<Products />} />
            <Route path='stores' element={<Stores />} />
            <Route path='orders' element={<Orders />} />
            <Route path='statistic' element={<Statistic />} />
          </Route>

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/operation-care'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Bakim']}>
                <OperationCare />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to='maintenance' />} />
            <Route path='maintenance' element={<Maintenance />} />
            <Route path='breakdown' element={<Breakdown />} />
            <Route path='invoices' element={<Invoices />} />
          </Route>

          <Route
            path='/operation-care/details/:id'
            element={
              <PrivateRoute allowedGroups={['Admin', 'Bakim']}>
                <Detail />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to='track-list' />} />
            <Route path='track-list' element={<TrackList />} />
            <Route path='track-breakdown' element={<TrackBreakdown />} />
            <Route path='track-maintenance' element={<TrackMaintenance />} />
          </Route>

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/report'
            element={
              <PrivateRoute allowedGroups={['Admin']}>
                <Report />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to='chart' />} />
            <Route path='chart' element={<ReportChart />} />
            <Route path='table' element={<ReportTable />} />
            <Route path='income-expense' element={<IncomeExpense />} />
          </Route>

          {/* ---------------------------------------------------------------------------------- */}

          <Route
            path='/calendar'
            element={
              <PrivateRoute allowedGroups={['Admin']}>
                <Calendar />
              </PrivateRoute>
            }
          />
          <Route path='/not-authorized' element={<NotAuthorized />} />
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
