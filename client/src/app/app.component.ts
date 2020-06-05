import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fileUpload';
  dspImg:SafeUrl ='';
  images;
  multipleImages = [];
  constructor(private http: HttpClient,protected domSanitizer: DomSanitizer){}

  ngOnInit(){

  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(
      (res) => {
        console.log(res.avatar.data)
        var uints = new Uint8Array(res.avatar.data);
        const STRING_CHAR = String.fromCharCode.apply(null, uints);
        let base64String = btoa(STRING_CHAR);
        this.dspImg =  this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ base64String)["changingThisBreaksApplicationSecurity"];
   
      }
     
    );
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }

    this.http.post<any>('http://localhost:3000/multipleFiles', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
