import { useTasks } from '@/contexts/tasks-context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TaskPaginationProps {
  totalPages: number
  filteredCount: number
}

const PAGE_SIZE_OPTIONS = ['5', '10', '20']

export function TaskPagination({ totalPages, filteredCount }: TaskPaginationProps) {
  const { currentPage, setCurrentPage, pageSize, setPageSize } = useTasks()
  const startItem = Math.min(filteredCount, (currentPage - 1) * pageSize + 1)
  const endItem = Math.min(filteredCount, currentPage * pageSize)

  return (
    <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
      <div className='text-sm text-zinc-500'>
        Showing <span className='font-medium'>{startItem}</span> to <span className='font-medium'>{endItem}</span> of <span className='font-medium'>{filteredCount}</span> tasks
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-zinc-500'>Rows per page</span>
          <Select value={pageSize.toString()} onValueChange={val => setPageSize(Number(val))}>
            <SelectTrigger className='h-8 w-[70px] cursor-pointer'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map(size => (
                <SelectItem key={size} value={size} className='cursor-pointer'>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-1'>
          <Button variant='outline' size='icon' className='h-8 w-8 cursor-pointer disabled:cursor-not-allowed' disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button variant='outline' size='icon' className='h-8 w-8 cursor-pointer disabled:cursor-not-allowed' disabled={currentPage >= totalPages || totalPages === 0} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}
