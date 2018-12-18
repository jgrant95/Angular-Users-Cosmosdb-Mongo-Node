import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'atr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  newUser: User = new User
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

  addUser() {
    this.usersService.addUser(this.newUser).subscribe(
      (res) => {
        this.users.push(res)
        this.newUser = new User
      },
      (err) => {
        console.log("Error occured whilst trying to add user: ", err)
      }
    )
  }
}
