import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import NotAuthorized from './components/auth/NotAuthorized'
import PageNotFound from './components/custom/PageNotFound'
import Layout from './components/layout/Layout'

import Login from './components/pages/login/Login'
import Home from './components/pages/home/Home'
import Client from './components/pages/client/Client'
import Supplier from './components/pages/supplier/Supplier'
import SalesOffer from './components/pages/sales-offer/SalesOffer'
import List from './components/pages/sales-offer/list/List'
import PendingJobs from './components/pages/sales-offer/pending-jobs/PendingJobs'
import SalesProcess from './components/pages/sales-offer/sales-process/SalesProcess'
import LostJobs from './components/pages/sales-offer/lost-jobs/LostJobs'
import WonJobs from './components/pages/sales-offer/won-jobs/WonJobs'
import Revises from './components/pages/sales-offer/revises/Revises'
import Report from './components/pages/report/Report'
import Calendar from './components/pages/calendar/Calendar'
import Project from './components/pages/project/Project'
import ProjectDetail from './components/pages/project/detail/ProjectDetail'
import ProjectIncome from './components/pages/project/income/ProjectIncome'
import ProjectRealizedCost from './components/pages/project/realized-cost/ProjectRealizedCost'
import OperationCare from './components/pages/operation-care/OperationCare'
import Maintenance from './components/pages/operation-care/maintenance/Maintenance'
import Breakdown from './components/pages/operation-care/breakdown/Breakdown'
import Invoices from './components/pages/operation-care/invoices/Invoices'
import ProjectCostSummary from './components/pages/project/realized-cost/ProjectCostSummary'
import Stock from './components/pages/stock/Stock'
import Overview from './components/pages/stock/overview/Overview'
import Products from './components/pages/stock/products/Products'
import Statistic from './components/pages/stock/statistic/Statistic'
import Stores from './components/pages/stock/stores/Stores'
import Orders from './components/pages/stock/orders/Orders'
import Detail from './components/pages/operation-care/detail/Detail'
import TrackList from './components/pages/operation-care/detail/track-list/TrackList'
import TrackBreakdown from './components/pages/operation-care/detail/track-breakdown/TrackBreakdown'
import TrackMaintenance from './components/pages/operation-care/detail/track-maintenance/TrackMaintenance'
import ReportChart from './components/pages/report/ReportChart'
import ReportTable from './components/pages/report/ReportTable'
import IncomeExpense from './components/pages/report/income-expense/IncomeExpense'

function App() {
  return (
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
  )
}

export default App
