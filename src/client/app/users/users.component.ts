import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'atr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  updatingUser: boolean = false // Todo: Make me a nice loadable Obs on the service calls!
  originalUser: User | undefined
  user: User = new User

  users: Array<User> = []

  get currentUserExists(): boolean {
    if (!this.user) { return false }
    return this.users.some(x => x._id === this.user._id);
  }

  // Todo: Bug, shows dirty on selection.
  currentUserDirty(id): boolean {
    if (!this.user || !this.originalUser) return false
    if (this.user._id === id) {
      return this.user._id !== this.originalUser._id ||
            this.user.amazonUserId !== this.originalUser.amazonUserId ||
            this.user.busStopId !== this.originalUser.busStopId
    }

    return false
  }

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
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
    this.updatingUser = true
    this.usersService.addUser(this.user).subscribe(
      (res) => {
        this.users.push(res)
        this.user = new User
        this.updatingUser = false
      },
      (err) => {
        console.log("Error occured whilst trying to add user: ", err)
        this.updatingUser = false
      }
    )
  }

  selectUser(user: User) {
    this.user = user

    this.originalUser = new User()
    this.originalUser._id = user._id
    this.originalUser.amazonUserId = user.amazonUserId
    this.originalUser.busStopId = user.busStopId
  }

  clearUser() {
    this.user = new User()
  }

  updateUser() {
    this.updatingUser = true
    this.usersService.putUser(this.originalUser._id, this.user).subscribe(
      (res) => {
        let i = this.users.indexOf(res)
        this.users.splice(i, 0)
        this.user = new User
        this.updatingUser = false
      },
      (err) => {
        console.log("Error occured whilst trying to update user: ", err)
        this.updatingUser = false
      }
    )
  }

  deleteUser(user) {
    this.updatingUser = true
    this.usersService.deleteUser(user._id).subscribe(
      (res) => {
        let i = this.users.indexOf(user)
        this.users.splice(i, 1)
        this.updatingUser = false
      },
      (err) => {
        console.log("Error occured whilst trying to update user: ", err)
        this.updatingUser = false
      }
    )
  }
}
