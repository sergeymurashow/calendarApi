import dayjs from 'dayjs'

const mutateDate = (date: string): string => {
  const dateObj = dayjs(date)
  if( !dateObj.isValid() ) throw new Error('Invalid date')
  return dateObj.format('YYYY-MM-DD')
}

export default mutateDate