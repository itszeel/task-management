import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import { Toaster } from '@/components/ui/sonner'
import { TasksProvider } from '@/contexts/tasks-context'

const getIsLoggedIn = () => !!JSON.parse(localStorage.getItem('userInfo') || '{}')?.email

const ProtectedRoute = () => (getIsLoggedIn() ? <Outlet /> : <Navigate to='/' replace />)

const PublicRoute = () => (getIsLoggedIn() ? <Navigate to='/dashboard' replace /> : <Outlet />)

function App() {
  const isLoggedIn = getIsLoggedIn()

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            path='/dashboard'
            element={
              <TasksProvider>
                <Dashboard />
              </TasksProvider>
            }
          />
        </Route>

        <Route path='*' element={<Navigate to={isLoggedIn ? '/dashboard' : '/'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
