import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useTasks } from '@/contexts/tasks-context'
import { Button } from '@/components/ui/button'

const STATUS_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Todo', label: 'Todo' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Done', label: 'Done' },
]

const PRIORITY_OPTIONS = [
  { value: 'All', label: 'All Priorities' },
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
]

export function TaskFilters() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, dateRange, setDateRange } = useTasks()

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All' || priorityFilter !== 'All' || dateRange.start !== '' || dateRange.end !== ''

  const handleClear = () => {
    setSearchQuery('')
    setStatusFilter('All')
    setPriorityFilter('All')
    setDateRange({ start: '', end: '' })
  }

  return (
    <div className='flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2 text-zinc-800 dark:text-zinc-200'>
          <SlidersHorizontal className='h-4 w-4' />
          <h3 className='text-sm font-medium tracking-tight'>Search & Filter</h3>
        </div>
        <Button variant='ghost' size='sm' disabled={!hasActiveFilters} onClick={handleClear} className='h-8 cursor-pointer px-2 text-xs text-zinc-500 hover:text-zinc-900 disabled:cursor-not-allowed dark:hover:text-zinc-100'>
          <X className='mr-1 h-3 w-3' />
          Clear filters
        </Button>
      </div>

      <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute top-2.5 left-2.5 h-4 w-4 text-zinc-500' />
          <Input placeholder='Search tasks by title or description...' className='pl-8' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='w-full cursor-pointer sm:w-[140px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className='w-full cursor-pointer sm:w-[140px]'>
              <SelectValue placeholder='Priority' />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='flex w-full items-center gap-2 sm:w-auto'>
            <Input type='date' title='Start Due Date' className='w-full sm:w-[140px]' value={dateRange.start} onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))} />
            <span className='text-muted-foreground'>-</span>
            <Input type='date' title='End Due Date' className='w-full sm:w-[140px]' value={dateRange.end} onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))} />
          </div>
        </div>
      </div>
    </div>
  )
}
