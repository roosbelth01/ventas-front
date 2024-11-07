import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppMenuComponent} from "../app-menu/app-menu.component";
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'app-app-sidebar',
  standalone: true,
  imports: [RouterLink, AppMenuComponent],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent {
  timeout: any = null;

  @ViewChild('menuContainer') menuContainer!: ElementRef;
  public layoutService = inject(LayoutService);
  public el = inject(ElementRef);


  onMouseEnter() {
    if (!this.layoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.state.sidebarActive = true;


    }
  }

  onMouseLeave() {
    if (!this.layoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(() => this.layoutService.state.sidebarActive = false, 300);
      }
    }
  }

  anchor() {
    this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }
}
