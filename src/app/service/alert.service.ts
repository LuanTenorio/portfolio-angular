import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Alert } from 'src/app/model/alert.model'

@Injectable({
  providedIn: 'root'
})
export class AlertService{
  alerts: Alert[] = []
  lastAlertId = 0
  timeForDeleteImage = 5000

  addAlert(message: string){
    const alert = {
      id: this.getLastAlertId(),
      message
    }
    this.alerts.push(alert)

    setTimeout(() => this.deleteAlert(alert.id), this.timeForDeleteImage)
  }

  getLastAlertId(){
    this.lastAlertId++
    return this.lastAlertId
  }

  deleteAlert(id:number){
    const index = this.alerts.findIndex(alert => alert.id = id)
    if(index !== undefined)
      this.alerts.splice(index, 1)
  }
}
