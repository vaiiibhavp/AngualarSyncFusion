import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class sampleData {
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get('./assets/datasource.json');
  }

  // serverUrl = 'http://meditation.prometteur.in:3500/';
  // // serverUrl = 'http://localhost:3300/';
  // constructor(private http: HttpClient) { }
  // getData() {
  //   return this.http.get(this.serverUrl+'getalldata');
  // }
  
  // addnewtask(data:Object){
  //   let json = {
  //     "newtaskjson" : data
  //   }
  //   return this.http.post<any>(this.serverUrl+'savenewtask', json)
  // }

  // deletetask(taskid:any){    
  //   return this.http.delete<any>(this.serverUrl+'delete/'+taskid)
  // }

  // addnewtaskafter(data:Object,task_id:string){
  //   let json = {
  //     "newtaskjson" : data
  //   }
  //   return this.http.post<any>(this.serverUrl+'savetasksafter/'+task_id, json)
  // }

  // updatetask(data:Object,task_id:string){
  //   let json = {
  //     "newtaskjson" : data
  //   }
  //   return this.http.post<any>(this.serverUrl+'updatetask/'+task_id, json)
  // }

}