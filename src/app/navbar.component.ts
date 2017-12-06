import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./app.component.css']
})
export class NavbarComponent implements OnInit {
  tabs = [];

  constructor(private router: Router){
    router.events.subscribe(event => {
    if(event instanceof NavigationStart) {
        console.log(event.url)
        let thisTab = document.getElementById('tab' + event.url);
        let allTabs = document.querySelectorAll('.navtab');
        for (let i = 0; i < allTabs.length; i++) {
          allTabs[i].classList.remove('active');
        }
        thisTab.classList.add('active');
      }
    });
  }

  onTabSelect(path): void {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
    for (let i = 0; i < this.router.config.length; i++) {
      if (this.router.config[i].path !== "**") {
        this.tabs.push(this.router.config[i]);
      }
    }
  }
}
