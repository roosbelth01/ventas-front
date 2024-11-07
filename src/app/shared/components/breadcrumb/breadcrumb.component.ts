import {Component} from '@angular/core';
import {RouterLink,} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NgxSimpleBreadcrumbModule} from "ngx-simple-breadcrumb";
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, NgxSimpleBreadcrumbModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

}
