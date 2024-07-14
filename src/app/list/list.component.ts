import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  service_url = 'https://66933899c6be000fa07a1844.mockapi.io/todo/v1/topic'
  topicId:any
  list:any =[]
  todo = new FormControl('')

  constructor(
      private route:ActivatedRoute,
      private http:HttpClient
    ){
      this.route.paramMap.subscribe(params =>{
        console.log(params.get('topicId'))
        this.topicId = params.get('topicId')
        this.loadlist()
      })
    }

  loadlist(){
    console.log(`${this.service_url}/${this.topicId}/todos`)
    this.http.get(`${this.service_url}/${this.topicId}/todos`).subscribe({
      next:(result) =>{
        console.log(result)
        this.list = result
      }
    })
  }

  onAddTodo(){
    let body = {
       "todo": this.todo.value
    }
    this.http.post(`${this.service_url}/${this.topicId}/todos/`,body).subscribe({
      next: (result) =>{
        console.log(result)
        this.loadlist()
      }
    })
  }

  onRemoveTodo(id: number){
    console.log(id)
    this.http.delete(`${this.service_url}/${this.topicId}/todos/${id}`).subscribe({
      next:(result) =>{
        console.log(result)
        this.loadlist()
      }
    })
  }




}

