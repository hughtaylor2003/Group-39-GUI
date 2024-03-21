import './forecast.css';
import DailyBlock from './DailyBlock';



const Forecast = ({ data, ActiveIndex, SetActiveIndex}) => {
    
    function unixTimestampToDay(timestamp) {
        const milliseconds = timestamp * 1000;
        const date = new Date(milliseconds);
        const dayOfWeek = date.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dayOfWeek];
    }
    
    const arr = data.daily.slice(0, 7).map((dailyData, i) => (
        <DailyBlock 
            key={i} // Use i as the key
            day={unixTimestampToDay(dailyData.dt)}
            icon={dailyData.weather[0].icon.toString()} 
            summary={Math.round(dailyData.temp['day'])}
            ActiveIndex = {ActiveIndex}
            index ={i}
            SetActiveIndex = {SetActiveIndex}
        />
    ));

    

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