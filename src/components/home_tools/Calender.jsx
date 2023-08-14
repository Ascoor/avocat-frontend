import  { useState } from 'react'
import '../../assets/css/calender.css'

const Calender = () => {
const [date, setDate] = useState(new Date())

return (
<div className="calender">
<div className="month-picker">
<button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}>{'<'}</button>
{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
<button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}>{'>'}</button>
</div>
<div className="weekdays">
{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
<div className="weekday" key={day}>
{day}
</div>
))}
</div>
<div className="days">
{/* Render days here */}
</div>
</div>
)
}

export default Calender