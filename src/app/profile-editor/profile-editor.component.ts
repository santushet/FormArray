import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators,FormArray, FormBuilder ,ReactiveFormsModule } from '@angular/forms';

export interface Item {
  firstName: string;
  lastName: string;
}


@Component({
  standalone: true,
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css'],
  imports: [NgFor, ReactiveFormsModule, JsonPipe],
})
export class ProfileEditorComponent {

  ToDoListForm!: FormGroup;
  itemsList: Item[] = [];

  defaultItem = {
    firstName: '',
    lastName: ''
  };

  // get aliases() {
  //   return this.profileForm.get('aliases') as FormArray;
  // }

  constructor(private formBuilder: FormBuilder) {}
  // ngOnInit(): void {
  //   this.orderForm = new FormGroup({  
  //     items: new FormArray([])  
  //   });
  // }


  // addAlias() {
  //   this.aliases.push(this.formBuilder.control(''));
  // }
  get itemsArray() {
    return <FormArray>this.ToDoListForm.get('items');
  }

  ngOnInit(): void {
    this.ToDoListForm = this.formBuilder.group({
      items: this.formBuilder.array([]),
    });
    // this.itemsList = this.serv.getmyData();
    this.displayItems();
  }

  createItem(item: any) {
    return this.formBuilder.group({
      firstName: [item.firstName, [Validators.required]],
      lastName: [item.lastName, [Validators.required]],
    });
  }

  addNewItem() {
    let formGroup = this.createItem(this.defaultItem);
    this.itemsArray.push(formGroup);
  }

  displayItems() {
    let transformedItems = this.itemsList.map((item: any) =>
      this.createItem(item)
    );
    console.log(transformedItems);
    this.ToDoListForm.setControl('items', this.formBuilder.array(transformedItems));
  }

  deleteItem(i: number) {
    this.itemsArray.removeAt(i);
  }

  deleteAll() {
    this.itemsArray.clear();
  }

  track(item: any, index: number) {
    return index;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.ToDoListForm.value);
  }
}
