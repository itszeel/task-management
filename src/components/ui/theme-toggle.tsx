import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/theme-provider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme} className='h-9 w-9 cursor-pointer rounded-full border-zinc-200 bg-white/50 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/50'>
      <Sun className='h-4 w-4 scale-100 rotate-0 text-zinc-900 transition-all dark:scale-0 dark:-rotate-90 dark:text-zinc-100' />
      <Moon className='absolute h-4 w-4 scale-0 rotate-90 text-zinc-900 transition-all dark:scale-100 dark:rotate-0 dark:text-zinc-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
