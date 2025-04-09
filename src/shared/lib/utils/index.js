import dayjs from 'dayjs'

export const formatDateTime = dateString => {
  return dayjs(dateString).format('DD/MM/YYYY HH:mm')
}

export const isEmpty = value => {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim() === ''
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

export const createSlug = text => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getStatusColor = status => {
  const statusClasses = {
    Completed: {
      bg: 'bg-completed',
      text: 'text-white'
    },
    'In Progress': {
      bg: 'bg-progress',
      text: 'text-white'
    },
    Pending: {
      bg: 'bg-pending',
      text: 'text-white'
    },
    NOT_STARTED: {
      bg: 'bg-blue-100',
      text: 'text-blue-800'
    },
    ON_GOING: {
      bg: 'bg-purple-100',
      text: 'text-purple-800'
    },
    COMPLETED: {
      bg: 'bg-green-100',
      text: 'text-green-800'
    }
  }
  return (
    statusClasses[status] || {
      bg: 'bg-default',
      text: 'text-default'
    }
  )
}

const formatDate = date => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export { formatDate }
