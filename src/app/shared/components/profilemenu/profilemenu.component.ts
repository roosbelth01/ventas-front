import {Component, inject} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import { LayoutService } from '../../../core/services/app.layout.service';

@Component({
  selector: 'app-profilemenu',
  standalone: true,
  imports: [SidebarModule, BadgeModule],
  templateUrl: './profilemenu.component.html',
  styleUrl: './profilemenu.component.scss'
})
export class ProfilemenuComponent {
  public layoutService = inject(LayoutService);

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }
}
