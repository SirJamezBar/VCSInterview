import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { Contact } from '../Contact';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.sass']
})

export class ContactDetailsComponent implements OnInit {
  contactForm : FormGroup= new FormGroup({})
  constructor(private dialogRef: MatDialogRef<ContactDetailsComponent>,@Inject(MAT_DIALOG_DATA) private data: Contact, private contactService : ContactService, private fb: FormBuilder) {}

  contact = this.data
  
  blankContact =(): Contact =>({
    id: undefined,
    name: '',
    surname: '',
    telno: '',
    email: '',
    dateBirth: ''
  })

  ngOnInit(): void {
    if(this.contact == null){
      this.contact  = this.blankContact();
    }
    this.contactForm = this.fb.group({
      nameFormControl : [this.contact.name, Validators.required],
      surnameFormControl : [this.contact.surname, Validators.required],
      numberFormControl : [this.contact.telno, Validators.required],
      emailFormControl : [this.contact.email, [Validators.required, Validators.email]],
      dateFormControl : [this.contact.dateBirth, Validators.required]
    })
  }

  onSubmit(form: FormGroup): void{
    console.log(form.value.dateFormControl)
    this.contact.name = form.value.nameFormControl
    this.contact.surname = form.value.surnameFormControl
    this.contact.telno = form.value.numberFormControl
    this.contact.email = form.value.emailFormControl
    this.contact.dateBirth = form.value.dateFormControl
    
    if(this.contact.id == undefined){
      this.contactService.addContact(this.contact).subscribe()
    }else{
    this.contactService.updateContact(this.contact).subscribe()
    }
    this.dialogRef.close()
  }
}