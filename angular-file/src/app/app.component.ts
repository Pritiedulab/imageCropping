import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { HttpClient, HttpClientModule } from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-file';
  imageChangedEvent: any;croppedImage: any='';
  myfile:any='';
  @ViewChild('lgModal') lgModal!:any;
    rotateStatus:boolean=false;
    fliphorizontalStatus:boolean=false;
    flipverticalStatus:boolean=false
    discardStatus:boolean=false;
    transform:ImageTransform={};
  
 
  constructor(private http:HttpClient){}
  ngOnInit():void{}

  fileChangeEvent(event:any):void{
    this.imageChangedEvent = event;
    console.log(event.target.files[0].name);
    this.imageChangedEvent=event;

  }
  imageCropped(event:ImageCroppedEvent){
    this.croppedImage=event.base64;
    console.log(this.croppedImage);
    this.myfile=this.dataURLtoFile(this.croppedImage,"myImage.jpg")
  }
  imageLoaded(image?:LoadedImage){

  }
  cropperReady(){

  }
  loadImageFailed(){

  }
  dataURLtoFile(dataurl:any,filename:any){
    let arr=dataurl.split(','),
    mime=arr[0].match(/:(.*?);/)[1],
    bstr=atob(arr[1]),
    n=bstr.length,
    u8arr=new Uint8Array(n);

    while(n--){
      u8arr[n]=bstr.charCodeAt(n);
    }
console.log("mime ="+mime);

    return new File([u8arr],filename,{type:mime})
  }
  saveImage(){
  this.lgModal.hide();
  console.log(this.myfile);
    const formData = new FormData();
    formData.append('file',this.myfile);
    //postreq
    this.http.post<any>("http://localhost:3000/file",formData)
      .subscribe((res)=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      })
    }
      

    // const upload$=this.http.post("",formData)
    // upload$.subscribe();
  


  // afuConfig = {
  //   uploadAPI: {
  //     url:"https://example-file-upload-api"
  //   }
//};
  rotate(){
    this.rotateStatus=true;
    this.fliphorizontalStatus=false;
    this.flipverticalStatus=false;
    this.discardStatus=false;

    const newVal=((this.transform.rotate?? 0)+90)%360;
    this.transform={
      ...this.transform,
      rotate:newVal
    }
  }
  fliphorizontal(){
    this.rotateStatus=false;
    this.fliphorizontalStatus=true;
    this.flipverticalStatus=false;
    this.discardStatus=false;

    this.transform={
      ...this.transform,
      flipH:!this.transform.flipH
    }
  }
  flipvertical(){
    this.rotateStatus=false;
    this.fliphorizontalStatus=false;
    this.flipverticalStatus=true;
    this.discardStatus=false;

    this.transform={
      ...this.transform,
      flipV:!this.transform.flipV
    }
  }
  discard(){
    this.rotateStatus=false;
    this.fliphorizontalStatus=false;
    this.flipverticalStatus=false;
    this.discardStatus=true;
    this.lgModal.hide()
  }
}
