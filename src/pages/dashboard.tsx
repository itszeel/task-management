import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    toast.success('Successfully logged out!')
    navigate('/', { replace: true })
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md rounded-xl border p-8 shadow-sm'>
        <h1 className='mb-4 text-2xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground mb-8 text-sm'>Welcome back! You are securely logged in.</p>
        <Button variant='destructive' className='w-full cursor-pointer' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
