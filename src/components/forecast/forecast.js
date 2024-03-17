import './forecast.css';
import DailyBlock from './DailyBlock';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data, ActiveIndex, test}) => {


    function unixTimestampToDay(timestamp) {
        const milliseconds = timestamp * 1000;
        const date = new Date(milliseconds);
        const dayOfWeek = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayOfWeek];
    }
    
    let arr = []

    for (let i = 0; i < 7; i++) {
        arr.push(
            <DailyBlock 
            day={unixTimestampToDay(data.daily[i].dt)}
            icon={data.daily[i].weather[0].icon} 
            summary={data.daily[i].temp['day']}
            key={i}
            ActiveIndex = {ActiveIndex}
            index ={i}
            test = {test}
            ></ DailyBlock >
        )
    }

    return (
        <>
        <div className='Parent-Block'>
            <div className='Inner-Parent-Block'>
            {arr}
            </div>
            </div>
  
        </>
    );
}

export default Forecast;