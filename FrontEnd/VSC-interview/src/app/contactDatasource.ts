import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Contact } from "./Contact";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { ContactService } from "./contact.service";
import { Observable } from "rxjs/internal/Observable";

export class ContactsDataSource implements DataSource<Contact> {

    private contactsSubject = new BehaviorSubject<Contact[]>([]);

    constructor(private contactService: ContactService) {}

    connect(collectionViewer: CollectionViewer): Observable<Contact[]> {
        return this.contactsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.contactsSubject.complete();
    }

    loadContacts(pageNo : number, pageSize : number) {

        this.contactService.getAll(pageNo, pageSize)
            .subscribe(contacts => this.contactsSubject.next(contacts));
    }    
}