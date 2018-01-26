import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as domHelper from '../../../helpers/dom.helper';
import { ThemeService } from '../../../services/theme/theme.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.template.html',
  styleUrls:['./topbar.template.css']
})

export class TopbarComponent implements OnInit {
  @Input() sidenav;
  @Input() notificPanel;
  currentLang = 'en';
  availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }];
  egretThemes;
  constructor(private themeService: ThemeService,private authService:AuthService) {}
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
  }
  changeTheme(theme) {
    this.themeService.changeTheme(theme);
  }
  logout(){
    this.authService.logout();
  }
}
