import Axios from 'axios'

const getFormattedFirstWord = (str: string) => {
	const firstWord = str.split(' ')[0]
	return firstWord.charAt(0).toUpperCase() + firstWord.slice(1)
}

const formatDate = (date: string) => {
	const dateObj = new Date(date)
	const month = dateObj.toLocaleString('default', { month: 'long' })
	const day = dateObj.getDate()
	const year = dateObj.getFullYear()
	return `${month} ${day}, ${year}`
}

const formatDollarAmount = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const removeCommas = (num: number) => {
  const numStr = num.toString()
  return parseFloat(numStr.replace(',', ''))
}

const roundDown = (num: number) => {
  return Math.floor(num * 100) / 100
}

const calculatePercentChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100
}

const getTimestampForOneYearAgo = () => {
  const oneYearAgoDate = new Date()
  oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1)
  return Math.floor(oneYearAgoDate.getTime() / 1000)
}

const getTimestampForToday = () => {
  const today = new Date()
  return Math.floor(today.getTime() / 1000)
}

const getCurrentDate = () => {
  const today = new Date()
  return today.toLocaleString('en-US', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCurrentTime = () => {
  const today = new Date()
  return today.toLocaleString('en-US', { 
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

const getMonthName = (month: number) => {
  const monthNames = [
   'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return monthNames[month]
}

const getUserId = async (email: string) => {
  try {
    const res = await Axios.get(`/api/get_user_id/${email}`)
    return res.data
    
  } catch (err) {
    console.log(`Error getting user id: ${err}`)
  }
}

export { 
  getFormattedFirstWord, 
  formatDate,
  formatDollarAmount,
  removeCommas,
  roundDown,
  calculatePercentChange,
  getTimestampForOneYearAgo,
  getTimestampForToday,
  getMonthName, 
  getCurrentTime,
  getCurrentDate,
  getUserId 
}