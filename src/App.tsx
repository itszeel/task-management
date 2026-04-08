import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import { Toaster } from '@/components/ui/sonner'
import { TasksProvider } from '@/contexts/tasks-context'
import { ThemeProvider } from '@/contexts/theme-provider'
import { ThemeToggle } from '@/components/ui/theme-toggle'

const getIsLoggedIn = () => !!JSON.parse(localStorage.getItem('userInfo') || '{}')?.email

const ProtectedRoute = () => (getIsLoggedIn() ? <Outlet /> : <Navigate to='/' replace />)

const PublicRoute = () => (getIsLoggedIn() ? <Navigate to='/dashboard' replace /> : <Outlet />)

function App() {
  const isLoggedIn = getIsLoggedIn()

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='fixed top-4 right-4 z-50'>
        <ThemeToggle />
      </div>
      <BrowserRouter>
        <Toaster richColors />
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
    </ThemeProvider>
  )
}

export default App
