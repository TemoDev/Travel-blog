import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  createBlogForm!: FormGroup
  blogDescLength: number = 0;
  blogTitleLength: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.createBlogForm = new FormGroup({
      blogTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      blogDesc: new FormControl(null, [Validators.required, Validators.maxLength(450)]),
      blogImg: new FormControl(null),
      blogSections: new FormArray([], [Validators.required])
    });

    this.createBlogForm.get('blogDesc')?.valueChanges.subscribe(val => {
      this.blogDescLength = val.length;
    });
    this.createBlogForm.get('blogTitle')?.valueChanges.subscribe(val => {
      this.blogTitleLength = val.length;
    });
  }

  // Button action to add section 
  onAddSection() {
    const sectionForm = new FormGroup({
      sectionTitle: new FormControl(null, [Validators.required]),
      sectionDesc: new FormControl(null, [Validators.required]),
      sectionImg: new FormControl(null),
    });
    this.sections.push(sectionForm);
  }

  get sections() {
    return this.createBlogForm.controls["blogSections"] as FormArray;
  }

  deleteLesson(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }
  
  onBlogSubmit() {
    console.log(this.createBlogForm);
    this.createBlogForm.reset();
    this.sections.controls = [];
  }

}
