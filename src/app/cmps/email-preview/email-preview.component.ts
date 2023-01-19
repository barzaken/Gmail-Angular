import { Component, Input, OnInit } from '@angular/core';
import { Email } from 'src/app/models/email';
import { EmailListComponent } from '../email-list/email-list.component';

@Component({
  selector: 'email-preview',
  templateUrl: './email-preview.component.html',
  styleUrls: ['./email-preview.component.scss'],
})
export class EmailPreviewComponent implements OnInit {
  @Input() email: Email | null = null;
  @Input() isSelected: boolean = false;
  constructor(private emailList: EmailListComponent) {

  }

  ngOnInit(): void { }
}
