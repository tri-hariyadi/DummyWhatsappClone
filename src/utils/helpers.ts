class helpers {
    getDate(isoString: string): string {
        const dateObject = new Date(isoString);
        const date = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
        const month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
        const localDate = `${date}/${month}/${dateObject.getFullYear().toString().slice(2, 4)}`;
        return localDate;
    }

    getDay(isoString: string): string {
        const dateObject = new Date(isoString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dateObject.getDay()];
    }

    getTime(isoString: string, splitter?: string) {
        const dateObject = new Date(isoString);
        const separator = splitter ?? '.';
        const hour = dateObject.getHours() < 10 ? `0${dateObject.getHours()}` : dateObject.getHours();
        const minutes = dateObject.getMinutes() < 10 ? `0${dateObject.getMinutes()}` : dateObject.getMinutes();
        const localTime = `${hour}${separator}${minutes}`;
        return localTime;
    }

    isDateInCurrentWeek(isoString: string) {
        const currentDate = new Date();
        const date = new Date(isoString);

        // Calculate the start date of the current week (Sunday)
        const currentWeekStartDate = new Date(currentDate);
        currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
        currentWeekStartDate.setHours(0, 0, 0, 0);

        // Calculate the end date of the current week (Saturday)
        const currentWeekEndDate = new Date(currentWeekStartDate);
        currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);
        currentWeekEndDate.setHours(23, 59, 59, 999);

        // Check if the date falls within the current week
        return date >= currentWeekStartDate && date <= currentWeekEndDate;
    }

    getDateMonths(isoString: string, showYear?: boolean) {
        const dateObject = new Date(isoString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
        const localDate = `${dateObject.getDate()} ${months[dateObject.getMonth()]}${
            showYear ? ' ' + dateObject.getFullYear() : ''
        }`;
        return localDate;
    }
}

export default new helpers();
