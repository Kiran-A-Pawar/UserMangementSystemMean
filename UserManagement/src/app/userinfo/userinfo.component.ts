import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { Userdata } from '../userdata';


declare var M: any;
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})

export class UserinfoComponent implements OnInit {
  userdata : Userdata [] = [];
  constructor(public authService: AuthService ) { }
 
  ngOnInit(): void {
    this.resetForm();
    this.refreshUserList();
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

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.authService.postuserdata(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.authService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshUserList() {
    this.authService.userdata().subscribe((res) => {
      this.authService.userlist = res as Userdata[];
    });
  }

  getUsers() {
    this.authService.userdata().subscribe((res) => {
      this.authService.userlist = res as Userdata[];
      console.log(this.authService.userlist)
    });
    }

    onEdit(user: Userdata) {
      this.authService.selecteduser = user;
    }

    onDelete(_id: string, form: NgForm) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.authService.deleteuser(_id).subscribe((res) => {
          console.log("User Id"+_id)
          this.refreshUserList();
          this.resetForm(form);
          M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }

  ngAfterViewInit() {
  }
}

