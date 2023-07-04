import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(protected userService: UserService, private router: Router) {}

  ngOnInit(): void {

  }

  onLogout() {
    this.userService.logout()
      .then(() => {
        console.log('Exito en el logout');
        this.router.navigate(['/login']);
      })
      .catch(err => console.log(err));
  }

}
