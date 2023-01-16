import { Component, Output,Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @Input() filterBy: any | null = {};
  @Output() toggle = new EventEmitter();
  @Output() filter = new EventEmitter();
  toggleSidebar() {
    this.toggle.emit();
  }
}
