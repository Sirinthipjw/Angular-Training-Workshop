import { routes } from './../app.routes';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  service_url =`https://66933899c6be000fa07a1844.mockapi.io/todo/v1/topic`
  topics:any = []

  topic = new FormControl('')

  onAddTopic(){
    let body = {
      "topic": this.topic.value
    }
    this.http.post(this.service_url, body).subscribe({
      next:(result) =>{
        console.log(result)
        this.loadTopics()
      }
    })
  }
  onRemoveTopic(id:number){
    console.log(id)
    this.http.delete(`${this.service_url}/${id}`).subscribe({
      next: (result) =>{
        console.log(result)
        this.loadTopics()
      }
    })
  }
  onSelectTopic(id:number){
    console.log(id)
    this.router.navigate(['/list',id])
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ){
    this.loadTopics()
    // http.get(this.service_url).subscribe({
    //   next:(result) =>{
    //     this.topics = result
    //   }
    // })
  }
  loadTopics(){
    this.http.get(this.service_url).subscribe({
        next:(result) =>{
          this.topics = result
        }
      })
  }

}
