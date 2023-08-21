import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../Contact';
import { ContactService } from '../contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { ContactsDataSource } from '../contactDatasource';
import { tap } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit {
  constructor(private contactService: ContactService, public dialog: MatDialog) { }

  dataSource!: ContactsDataSource
  amount: number = 0
  displayedColumns: string[] = ['name', 'surname', 'telno', 'email', 'dateBirth', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.contactService.getCount().subscribe(data => this.amount = data);
    this.dataSource = new ContactsDataSource(this.contactService)
    this.dataSource.loadContacts(1, 3)
  }

  onPaginationChange(event: any) {
    this.dataSource.loadContacts(event.pageIndex + 1, event.pageSize)
  }

  selectedContact?: Contact;

  onSelect(contact: Contact): void {
    this.selectedContact = contact;
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '450px',
      data: contact
    });
    dialogRef.afterClosed().subscribe(() => this.getAll())
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe();
    this.getAll();
  }

  newContact(): void {
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '450px',
    })
    dialogRef.afterClosed().subscribe(() => this.getAll())
  }
}
