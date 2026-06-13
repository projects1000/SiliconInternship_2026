import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent {
  messageText: string = '';
  username: string = 'satya';
  
  isRecording: boolean = false;
  mediaRecorder: any;
  audioChunks: any[] = [];

  @ViewChild('folderInput') folderInput!: ElementRef;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage({
        sender: this.username,
        text: this.messageText.trim(),
        timestamp: new Date(),
        type: 'text'
      });
      this.messageText = '';
    }
  }

  // --- Voice Recording Logic ---
  async toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      await this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.addEventListener('dataavailable', (event: any) => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        this.chatService.sendMessage({
          sender: this.username,
          text: 'Voice Message',
          timestamp: new Date(),
          type: 'audio',
          audioUrl: audioUrl
        });
      });

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('Microphone access denied or error:', err);
      alert('Could not access microphone.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach((track: any) => track.stop());
      this.isRecording = false;
    }
  }

  // --- Folder Upload Logic ---
  triggerFolderSelect() {
    this.folderInput.nativeElement.click();
  }

  onFolderSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (files.length === 0) return;

    // Get folder name from the first file's webkitRelativePath
    const firstPath = files[0].webkitRelativePath || '';
    const folderName = firstPath.split('/')[0] || 'Uploaded Folder';

    let totalSizeBytes = 0;
    const fileDetails = files.map(f => {
      totalSizeBytes += f.size;
      return {
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB'
      };
    });

    const totalSizeMb = (totalSizeBytes / (1024 * 1024)).toFixed(2) + ' MB';

    this.chatService.sendMessage({
      sender: this.username,
      text: `Uploaded folder: ${folderName}`,
      timestamp: new Date(),
      type: 'folder',
      folderData: {
        folderName: folderName,
        fileCount: files.length,
        totalSize: totalSizeMb,
        files: fileDetails.slice(0, 5) // Send up to 5 for preview
      }
    });

    // Reset input
    event.target.value = '';
  }
}
