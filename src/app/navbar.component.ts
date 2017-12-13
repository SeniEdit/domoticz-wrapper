import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./app.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = [];

  constructor(private router: Router, private myStorage: LocalstorageService) {
    router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
        const thisTab = document.getElementById('tab' + event.url);
        const allTabs = document.querySelectorAll('.navtab');
        for (let i = 0; i < allTabs.length; i++) {
          allTabs[i].classList.remove('active');
        }
        thisTab.classList.add('active');
      }
    });
  }


  checkIfDarkMode() {
      const rowHeaders = document.getElementsByClassName('row header');
      const navbar = document.getElementsByClassName('navbar')[0];
      if (this.myStorage.getDarkMode() === true) {
        document.getElementsByTagName('html')[0].classList.add('darkMode');
        for (let i = 0; i < rowHeaders.length; i++ ) {
          rowHeaders[i].classList.add('darkMode');
        }
        navbar.classList.add('darkMode');
      } else {
        document.getElementsByTagName('html')[0].classList.remove('darkMode');
        for (let i = 0; i < rowHeaders.length; i++ ) {
          rowHeaders[i].classList.remove('darkMode');
        }
        navbar.classList.remove('darkMode');
      }
  }

  onTabSelect(path): void {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    for (let i = 0; i < this.router.config.length; i++) {
      if (this.router.config[i].path !== '**') {
        this.tabs.push(this.router.config[i]);
      }
    }
  }
}
