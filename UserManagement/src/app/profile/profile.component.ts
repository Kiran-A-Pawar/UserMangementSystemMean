import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Userdata } from '../userdata';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user :any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  
  }
  
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.authService.selecteduser = {
      _id : "",
      name: "",
      contact: "",
      email: "",
      job: "",
      text :""
    }
  }

  getUsers(_id:string) {
    this.authService.getOwndetail(_id).subscribe((data) => {
      this.authService.user = data;
      console.log(this.authService.user)
    });
    }

    onEdit(user: Userdata) {
      this.authService.selecteduser = user;
    }

    // onDelete(_id: string, form: NgForm) {
    //   if (confirm('Are you sure to delete this record ?') == true) {
    //     this.authService.deleteuser(_id).subscribe((res) => {
    //       console.log("User Id"+_id)
    //       this.refreshUserList();
    //       this.resetForm(form);
    //       M.toast({ html: 'Deleted successfully', classes: 'rounded' });
    //     });
    //   }
    // }

}
