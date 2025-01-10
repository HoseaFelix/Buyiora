function isWeekend(date){
    let isWeekend = false
    if(date == 'Saturday' || date === 'Sunday'){
        console.log(date)
        isWeekend = true
        
    } else{
        console.log("day is not a weekend")
        
    }

    return isWeekend
}

export default isWeekend