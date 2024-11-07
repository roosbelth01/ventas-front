import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {DomHandler} from "primeng/dom";
import {filter, Subscription} from "rxjs";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {RippleModule} from "primeng/ripple";
import { animate, state, style, transition, trigger,AnimationEvent } from '@angular/animations';
import { LayoutService } from '../../../core/services/app.layout.service';
import { MenuService } from '../../../core/services/app.menu.service';

@Component({
  selector: 'app-menuitem',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    ButtonModule,
    TooltipModule,
    RippleModule,
    RouterModule,
    //AppConfigModule
  ],

  templateUrl: './app-menuitem.component.html',
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0'
      })),
      state('expanded', style({
        height: '*'
      })),
      state('hidden', style({
        display: 'none'
      })),
      state('visible', style({
        display: 'block'
      })),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  styleUrl: './app-menuitem.component.scss'
})
export class AppMenuitemComponent implements OnInit, OnDestroy {
  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  @ViewChild('submenu') submenu!: ElementRef;

  active = false;

  menuSourceSubscription: Subscription | undefined;

  menuResetSubscription: Subscription | undefined;

  key: string = "";

  public layoutService = inject(LayoutService);
  public router = inject(Router);
  private menuService = inject(MenuService);

  ngOnInit() {


    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(value => {
      Promise.resolve(null).then(() => {
        if (value.routeEvent) {
          this.active = (value.key === this.key || value.key.startsWith(this.key + '-')) ? true : false;
        }
        else {
          if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
            this.active = false;
          }
        }
      });
    });

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(params => {
        if (this.isSlimPlus || this.isSlim || this.isHorizontal) {
          this.active = false;
        }
        else {
          if (this.item.routerLink) {
            this.updateActiveStateFromRoute();
          }
        }
      });


    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);

    if (!(this.isSlimPlus || this.isSlim || this.isHorizontal) && this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  ngAfterViewChecked() {
    if (this.root && this.active && this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isSlimPlus())) {
      this.calculatePosition(this.submenu?.nativeElement, this.submenu?.nativeElement.parentElement);
    }
  }

  updateActiveStateFromRoute() {
    let activeRoute = this.router.isActive(this.item.routerLink[0], { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' });

    if (activeRoute) {
      this.menuService.onMenuStateChange({key: this.key, routeEvent: true});
    }
  }

  onSubmenuAnimated(event: AnimationEvent) {
    if (event.toState === 'visible' && this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim()|| this.layoutService.isSlimPlus())) {
      const el = <HTMLUListElement> event.element;
      const elParent = <HTMLUListElement> el.parentElement;
      this.calculatePosition(el, elParent);
    }
  }

  calculatePosition(overlay: HTMLElement, target: HTMLElement) {
    if (overlay) {
      const { left, top } = target.getBoundingClientRect();
      const [vWidth, vHeight] = [window.innerWidth, window.innerHeight];
      const [oWidth, oHeight] = [overlay.offsetWidth, overlay.offsetHeight];
      const scrollbarWidth = DomHandler.calculateScrollbarWidth();
      // reset
      overlay.style.top = '';
      overlay.style.left = '';

      if (this.layoutService.isHorizontal()) {
        const width = left + oWidth + scrollbarWidth;
        overlay.style.left = vWidth < width ? `${left - (width - vWidth)}px` : `${left}px`;
      } else if ( this.layoutService.isSlim() || this.layoutService.isSlimPlus()) {
        const height = top + oHeight;
        overlay.style.top = vHeight < height ? `${top - (height - vHeight)}px` : `${top}px`;
      }
    }
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // navigate with hover
    if (this.root && this.isSlim || this.isHorizontal || this.isSlimPlus) {
      this.layoutService.state.menuHoverActive = !this.layoutService.state.menuHoverActive;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;

      if (this.root && this.active && (this.isSlim || this.isHorizontal || this.isSlimPlus)) {
        this.layoutService.onOverlaySubmenuOpen();
      }
    }
    else {
      if (this.layoutService.isMobile()) {
        this.layoutService.state.staticMenuMobileActive = false;
      }

      if (this.isSlim || this.isHorizontal || this.isSlimPlus) {
        this.menuService.reset();
        this.layoutService.state.menuHoverActive = false;
      }
    }

    this.menuService.onMenuStateChange({key: this.key});
  }

  onMouseEnter() {
    // activate item on hover
    if (this.root && (this.isSlim || this.isHorizontal || this.isSlimPlus) && this.layoutService.isDesktop()) {
      if (this.layoutService.state.menuHoverActive) {
        this.active = true;
        this.menuService.onMenuStateChange({key: this.key});
      }
    }
  }

  get submenuAnimation() {
    if (this.layoutService.isDesktop() && (this.layoutService.isHorizontal() || this.layoutService.isSlim() || this.layoutService.isSlimPlus())){
      return this.active ? 'visible' : 'hidden';
    }

    else
      return this.root ? 'expanded' : (this.active ? 'expanded' : 'collapsed');
  }

  get isHorizontal() {
    return this.layoutService.isHorizontal();
  }

  get isSlim() {
    return this.layoutService.isSlim();
  }

  get isSlimPlus() {
    return this.layoutService.isSlimPlus();
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
