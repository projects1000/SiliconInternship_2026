import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent {

  message = '';
  userName = 'User A';
  mediaRecorder!: MediaRecorder;

audioChunks: Blob[] = [];

isRecording = false;
cameraStream!: MediaStream;

showCamera = false;
  constructor(
    private chatService: ChatService
  ) {}

  sendMessage() {

    if(!this.message.trim()) return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'text',

      text:this.message,

      content:this.message,

      time:new Date()

    });
    this.message='';

  }
 onTyping(){

  this.chatService.sendTyping(
    'User A'
  );

}
showEmojiPicker=false;

emojis=[

'😀',
'😂',
'😍',
'🥰',
'❤️',
'👍',
'🔥',
'🎉',
'😭',
'😎'

];

addEmoji(emoji:string){

  this.message += emoji;

}
uploadImage(event:any){

  const file = event.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const result = reader.result;
    if (typeof result !== 'string') return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'image',

      content:result,

      time:new Date()

    });

  };

  reader.readAsDataURL(file);

}

uploadVideo(event:any){

  const file = event.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const result = reader.result;
    if (typeof result !== 'string') return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'video',

      content:result,

      time:new Date()

    });

  };

  reader.readAsDataURL(file);

}

uploadAudio(event:any){

  const file = event.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const result = reader.result;
    if (typeof result !== 'string') return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'audio',

      content:result,

      fileName:file.name,

      time:new Date()

    });

  };

  reader.readAsDataURL(file);

}

uploadFile(event:any){

  const file = event.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const result = reader.result;
    if (typeof result !== 'string') return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'file',

      fileName:file.name,

      content:result,

      time:new Date()

    });

  };

  reader.readAsDataURL(file);

}
capturePhoto(event:any){

  const file = event.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    const result = reader.result;
    if (typeof result !== 'string') return;

    this.chatService.sendMessage({

      sender:this.userName,

      userType:'A',

      type:'image',

      content:result,

      time:new Date()

    });

  };

  reader.readAsDataURL(file);

}
async recordVoice(){

  if(!this.isRecording){

    const stream =
    await navigator.mediaDevices.getUserMedia({

      audio:true

    });

    this.mediaRecorder =
    new MediaRecorder(stream);

    this.audioChunks = [];

    this.mediaRecorder.ondataavailable =

    (event)=>{

      this.audioChunks.push(
        event.data
      );

    };

    this.mediaRecorder.onstop = ()=>{

      const audioBlob =
      new Blob(

        this.audioChunks,

        {
          type:'audio/webm'
        }

      );

      const audioUrl =
      URL.createObjectURL(
        audioBlob
      );

      this.chatService.sendMessage({

        sender:this.userName,

        userType:'A',

        type:'audio',

        content:audioUrl,

        time:new Date()

      } as any);

    };

    this.mediaRecorder.start();

    this.isRecording = true;

  }

  else{

    this.mediaRecorder.stop();

    this.isRecording = false;

  }

}
async openCamera(){

  this.showCamera = true;

  setTimeout(async ()=>{

    this.cameraStream =
    await navigator.mediaDevices.getUserMedia({

      video:true

    });

    const video:any =
    document.getElementById(
      'cameraVideoA'
    );

    if(video){

      video.srcObject =
      this.cameraStream;

    }

  },200);

}
captureFromCamera(){

  const video:any =

  document.getElementById(

    'cameraVideoA'

  );

  const canvas =

  document.createElement(

    'canvas'
  );

  canvas.width =

  video.videoWidth;

  canvas.height =

  video.videoHeight;

  const ctx:any =

  canvas.getContext('2d');

  ctx.drawImage(

    video,

    0,

    0
  );

  const imageData =

  canvas.toDataURL(

    'image/png'
  );

  this.chatService.sendMessage({

    sender:this.userName,

    userType:'A',

    type:'image',

    content:imageData,

    time:new Date()

  } as any);

  this.cameraStream

  .getTracks()

  .forEach(track=>track.stop());

  this.showCamera = false;

}
}

