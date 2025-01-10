import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './satSun.js'


const date = dayjs()
const deliveryDate= date.add(3, 'days')
const dateString = deliveryDate.format('dddd')
const oneMonth = date.add(30, 'days')
const monthString = oneMonth.format('MMMM, dddd')
const prevMonth = date.subtract(30, 'days')
const prevMonthString = prevMonth.format('MMMM, dddd')
const dayOfTheWEek = date.format('dddd')

document.querySelector('.deliverydate').innerHTML = dateString + ' ' + monthString + prevMonthString + dayOfTheWEek



isSatSun(dayOfTheWEek)
isSatSun(dateString)
//15:33:56x