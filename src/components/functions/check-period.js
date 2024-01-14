import * as shamsi from "shamsi-date-converter";

function check_period(start , finish , date) {
    const spilited_start_date = start.split("/");
    const start_year = parseInt(spilited_start_date[2]) 
    const start_month = parseInt(spilited_start_date[1]) 
    const start_day = parseInt(spilited_start_date[0]) 
    const start_date = new Date(shamsi.jalaliToGregorian(start_year, start_month, start_day).join("/")).getTime();
    const spilited_finish_date = finish.split("/");
    const finish_year = parseInt(spilited_finish_date[2]) 
    const finish_month = parseInt(spilited_finish_date[1]) 
    const finish_day = parseInt(spilited_finish_date[0]) 
    const finish_date = new Date(shamsi.jalaliToGregorian(finish_year, finish_month, finish_day).join("/")).getTime();

    const between_time = new Date(date).getTime();
    


    if(between_time <= finish_date && between_time >= start_date){
        return true;
    }
    else{
        return false;
    }
};
export default check_period;