import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {BreadcrumbComponent} from "../breadcrumb/breadcrumb.component";
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, BreadcrumbComponent],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;

  public layoutService = inject(LayoutService);

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }
}
