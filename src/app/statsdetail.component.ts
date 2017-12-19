import { Component, OnInit } from '@angular/core';
import { LightingService } from './lighting.service';
import {LocalstorageService } from './localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Chart from 'chart.js';

@Component({
  selector: 'app-stats-detail',
  templateUrl: './statsdetail.component.html',
  styleUrls: ['./app.component.css']
})
export class StatsDetailComponent implements OnInit {
  light;
  logs;
  loading;
  err;
  parentRoute;

  dataSetOn = [];
  dataSetOff = [];
  dataSetOnKeys = [];
  dataSetOnValues = [];
  dataSetOffKeys = [];
  dataSetOffValues = [];
  randomColorsForKeys = [];

  constructor(private route: ActivatedRoute, private myStorage: LocalstorageService, private lightingService: LightingService) { }

  populateChart() {
    let color;
    for (let i = 0; i < 2; i++) {
      color = '#' + Math.floor(Math.random() * 16777215).toString(16) + '6b';
      this.randomColorsForKeys.push(color);
    }

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.dataSetOnKeys.reverse(),
        datasets: [{
          label: 'Times turned on',
          data: this.dataSetOnValues.reverse(),
          backgroundColor: this.randomColorsForKeys[0],
          borderColor: 'black',
          borderWidth: 1,
          radius: 5,
        }, {
          label: 'Times turned off',
          data: this.dataSetOffValues.reverse(),
          backgroundColor: this.randomColorsForKeys[1],
          borderColor: 'black',
          borderWidth: 1,
          radius: 5
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  checkIfDarkMode() {
    const rowHeaders = document.getElementsByClassName('row header');
    const navbar = document.getElementsByClassName('navbar')[0];
    const navtabs = document.getElementsByClassName('navtab');
    const buttons = document.getElementsByTagName('button');
    const modals = document.getElementsByClassName('modal-wrapper');

    if (this.myStorage.getDarkMode() === true) {
      document.getElementsByTagName('html')[0].classList.add('darkMode');
      for (let i = 0; i < rowHeaders.length; i++ ) {
        rowHeaders[i].classList.add('darkMode');
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('darkMode');
      }
      for (let i = 0; i < modals.length; i++ ) {
        modals[i].classList.add('darkMode');
      }
      for (let i = 0; i < navtabs.length; i++) {
        navtabs[i].classList.add('darkMode');
      }
      navbar.classList.add('darkMode');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('darkMode');
      for (let i = 0; i < rowHeaders.length; i++ ) {
        rowHeaders[i].classList.remove('darkMode');
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('darkMode');
      }
      for (let i = 0; i < modals.length; i++ ) {
        modals[i].classList.remove('darkMode');
      }
      for (let i = 0; i < navtabs.length; i++) {
        navtabs[i].classList.remove('darkMode');
      }
      navbar.classList.remove('darkMode');
    }
  }

  getLightFromParams(): void {
    this.loading = true;
    const idx = +this.route.snapshot.paramMap.get('idx');
    this.lightingService.getSwitch(idx)
    .subscribe(response => {
      const res = response.json();
      this.light = res.result[0];
      this.getSwitchLog(res.result[0].idx);
    });
  }

  getSwitchLog(idx): void {
    const datesOn = [];
    const datesOff = [];

    this.lightingService.getSwitchLog(idx).subscribe(log => {
      this.logs = log.result;
      for (const l of this.logs) {
        if (l.Data === 'On') {
          const d = new Date(l.Date);
          const dateString = d.toDateString();
          datesOn.push(dateString);
        } else if (l.Data === 'Off') {
          const d = new Date(l.Date);
          const dateString = d.toDateString();
          datesOff.push(dateString);
        }
      }

      let tempArr = [];
      for (let i = 0; i < datesOn.length; i++) {
        const date = datesOn[i];
        this.dataSetOn[date] = this.dataSetOn[date] ? this.dataSetOn[date] + 1 : 1;
        tempArr = this.dataSetOn;
      }
      for (let i = 0; i < datesOff.length; i++) {
        const date = datesOff[i];
        this.dataSetOff[date] = this.dataSetOff[date] ? this.dataSetOff[date] + 1 : 1;
      }

      console.log(this.dataSetOn);
      console.log(this.dataSetOff);
      this.dataSetOnKeys = Object.keys(this.dataSetOn);
      this.dataSetOnValues = Object.values(this.dataSetOn);
      this.dataSetOffKeys = Object.keys(this.dataSetOff);
      this.dataSetOffValues = Object.values(this.dataSetOff);

      this.populateChart();
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.checkIfDarkMode();
    this.getLightFromParams();
    this.parentRoute = this.route.snapshot.url[this.route.snapshot.url.length - 2].path;
  }
}
