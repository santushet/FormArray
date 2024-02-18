import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

export type EditorType = 'name' | 'profile';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>Reactive Forms</h1>

    <app-profile-editor *ngIf="showProfileEditor"></app-profile-editor>
  `,
  styles: [
    `
      nav button {
        padding: 1rem;
        font-size: inherit;
      }
    `,
  ],
  imports: [
    // NameEditorComponent,
    ProfileEditorComponent,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class AppComponent {
  editor: EditorType = 'profile';

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

}
