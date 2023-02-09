import * as moment from "moment";

export class Utils {
    static generateRandomId(): number {
        return parseInt(moment(new Date()).valueOf().toString());
    }

    static GetCurrentDate(): string {
        return moment().format("YYYY-MM-DD");
    }

}