import { Injectable } from '@angular/core';
import { Parser } from '@json2csv/plainjs';
import { saveAs } from 'file-saver';  // save the file

@Injectable()
export class DownloadFileService {
    constructor() {

     }
     public downloadFile(data:any, filename? : string){
        let csvData = this.convertToCSV(data);
        let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(file,"cartproducts-bank-inc.csv");
    }

    public convertToCSV(objArray: any, fields?:any) {
        let parser = new Parser(fields);
        let csv = parser.parse(objArray);
        return csv;
    }

   

}