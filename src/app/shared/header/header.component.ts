import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    let containerMenu = document.querySelector('.containerMenu');
    let btnMenuNav = document.querySelector('#btnMenuNav');

    btnMenuNav?.addEventListener('click', () => {
      containerMenu?.classList.toggle('open');
    })
  }

}
