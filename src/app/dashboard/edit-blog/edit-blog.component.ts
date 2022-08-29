import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Blog } from 'src/app/shared/blog.model';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../ui/store/ui.actions';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

  blog$!: Observable<Blog | null>;
  selectedBlog: Blog | null = null;
  editBlogForm!: FormGroup;
  blogDescLength: number = 0;
  blogTitleLength: number = 0;

  private userSub!: Subscription;
  private userUid!: any;

  // Subscriptions
  titlSub!: Subscription | undefined;
  descSub!: Subscription | undefined;
  constructor(
    private store: Store<fromApp.AppState>, 
    private db: AngularFirestore) {

      this.editBlogForm = new FormGroup({
        blogTitle: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        blogDesc: new FormControl(null, [Validators.required, Validators.maxLength(450)]),
        blogImg: new FormControl(null),
        blogSections: new FormArray([], [Validators.required])
      });
      
    }
    
    ngOnInit(): void {

      this.userSub = this.store.select('auth').subscribe(val => {
        this.userUid = val.uid;
      })

      this.blog$ = this.store.select(fromApp.getUserEditBlog);
      this.blog$.subscribe(val => {
        this.selectedBlog = val;
        console.log(val)
      });

      this.editBlogForm.setValue({
        blogTitle: this.selectedBlog?.title,
        blogDesc: this.selectedBlog?.description,
        blogImg: this.selectedBlog?.bgImg,
        blogSections: []
      })

      this.selectedBlog?.Sections.forEach(blog => {
        this.sections.push(new FormGroup( {
          sectionTitle: new FormControl(blog.sectionTitle, [Validators.required]),
          sectionDesc: new FormControl(blog.sectionDesc, [Validators.required]),
          sectionImg: new FormControl(blog.sectionImg),          
        }))
      })

    console.log(this.editBlogForm);

    this.titlSub = this.editBlogForm.get('blogDesc')?.valueChanges.subscribe(val => {
      this.blogDescLength = val.length;
    });
    this.descSub = this.editBlogForm.get('blogTitle')?.valueChanges.subscribe(val => {
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
    get sections() : any {
      return this.editBlogForm.controls["blogSections"] as FormArray;
    }
    // Delete 
    deleteSection(sectionIndex: number) {
      this.sections.removeAt(sectionIndex);
    }
    
    onBlogSubmit() {
      // Read form values
      console.log(this.editBlogForm.value);
      console.log(this.editBlogForm);
      
      // Create Blog 
      const blog: Blog = {
        createdAt: new Date,
        title: this.editBlogForm.value.blogTitle,
        description: this.editBlogForm.value.blogDesc,
        bgImg: this.editBlogForm.value.blogImg,
        Sections: this.editBlogForm.value.blogSections
      }
  
      // Save the blog to user blogs in firebase
      this.db.collection('users').doc(this.userUid).collection('userBlogs').doc(this.selectedBlog?.blogId).update(blog);
      
      // Save the blog in global blog collection
      this.db.collection('blogs').doc(this.selectedBlog?.blogId).update(blog);
  
      // Remove subscription from counting each charachter of blog title and description
      this.titlSub?.unsubscribe();
      this.descSub?.unsubscribe();
      // Send message to app
      this.store.dispatch(UIActions.setStatusMessage({message: "Blog has been successfully edited!"}));
    }

}
