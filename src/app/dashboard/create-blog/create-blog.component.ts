import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/shared/blog.model';
import * as fromApp from "../../store/app.reducer";
import * as dashboardActions from '../store/dashboard.actions';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  createBlogForm!: FormGroup
  blogDescLength: number = 0;
  blogTitleLength: number = 0;

  // Subscriptions
  titlSub!: Subscription | undefined;
  descSub!: Subscription | undefined;

  private userUid: string | any;
  private userEmail: string | any;
  // private userSubscription!: Subscription;
  constructor(private store: Store<fromApp.AppState>, private db: AngularFirestore) {
    this.store.select('auth').subscribe(val => {
      this.userUid = val.uid;
      this.userEmail = val.email;
    });

  }

  ngOnInit(): void {
    this.createBlogForm = new FormGroup({
      blogTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      blogDesc: new FormControl(null, [Validators.required, Validators.maxLength(450)]),
      blogImg: new FormControl(null),
      blogSections: new FormArray([], [Validators.required])
    });

    this.titlSub = this.createBlogForm.get('blogDesc')?.valueChanges.subscribe(val => {
      this.blogDescLength = val.length;
    });
    this.descSub = this.createBlogForm.get('blogTitle')?.valueChanges.subscribe(val => {
      this.blogTitleLength = val.length;
    });
  }

  // Button action to add sections 
  onAddSection() {
    const sectionForm = new FormGroup({
      sectionTitle: new FormControl(null, [Validators.required]),
      sectionDesc: new FormControl(null, [Validators.required]),
      sectionImg: new FormControl(null),
    });
    this.sections.push(sectionForm);
  }
  // Get Sections
  get sections() {
    return this.createBlogForm.controls["blogSections"] as FormArray;
  }
  // Delete 
  deleteSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }
  
  onBlogSubmit() {
    // Read form values
    console.log(this.createBlogForm.value);
    console.log(this.createBlogForm);
    
    // Create Blog 
    const blog: Blog = {
      creator: this.userEmail,
      createdAt: new Date,
      title: this.createBlogForm.value.blogTitle,
      description: this.createBlogForm.value.blogDesc,
      bgImg: this.createBlogForm.value.blogImg,
      Sections: this.createBlogForm.value.blogSections
    }

    // Save the blog to user blogs in firebase
    this.db.collection('users').doc(this.userUid).collection('userBlogs').add(blog).then(val => {
      this.db.collection('blogs').doc(val.id).set(blog);
    });
    
    // Save the blog in global blog collection

    // Remove subscription from counting each charachter of blog title and description
    this.titlSub?.unsubscribe();
    this.descSub?.unsubscribe();
    // Reset Form and remove section controls
    this.createBlogForm.reset();
    this.sections.controls = [];
  }

}
