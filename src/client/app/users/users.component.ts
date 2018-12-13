import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'atr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Array<User> = []

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    return this.usersService.getUsers().subscribe(
      (res) => {
        this.users = res
      },
      (err) => {
        console.log("Error occurred: ", err)
      }
    )
  }
}
