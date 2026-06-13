import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isMe: boolean; // Relative to active role
}

export interface ChatChannel {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  status: 'online' | 'offline' | 'typing';
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  // Toast notifications stream
  private toastSubject = new Subject<ToastMessage>();
  toast$: Observable<ToastMessage> = this.toastSubject.asObservable();

  // Chat channels stream
  private channelsSubject = new BehaviorSubject<ChatChannel[]>([]);
  channels$: Observable<ChatChannel[]> = this.channelsSubject.asObservable();

  private activeChannelIdSubject = new BehaviorSubject<string>('dr-sarah-alice');
  activeChannelId$: Observable<string> = this.activeChannelIdSubject.asObservable();

  private channels: ChatChannel[] = [];

  constructor() {
    this.initChats();
  }

  // --- TOAST SERVICES ---
  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    this.toastSubject.next({ id, message, type, duration });
  }

  // --- CHAT SERVICES ---
  private initChats() {
    this.channels = [
      {
        id: 'dr-sarah-alice',
        name: 'Dr. Sarah Connor ↔ Alice Smith',
        avatar: '🩺',
        lastMessage: 'Please check your ECG vitals today.',
        lastMessageTime: '09:30 AM',
        unreadCount: 0,
        status: 'online',
        messages: [
          {
            id: 'm1',
            sender: 'Dr. Sarah Connor',
            text: 'Hello Alice, how are you feeling today after the morning medication?',
            timestamp: '09:15 AM',
            status: 'read',
            isMe: true
          },
          {
            id: 'm2',
            sender: 'Alice Smith',
            text: 'Hello Doctor, I feel much better, but I have a mild headache.',
            timestamp: '09:20 AM',
            status: 'read',
            isMe: false
          },
          {
            id: 'm3',
            sender: 'Dr. Sarah Connor',
            text: 'I see. I will adjust the Sumatriptan dosage if needed. Please check your ECG vitals today.',
            timestamp: '09:30 AM',
            status: 'read',
            isMe: true
          }
        ]
      },
      {
        id: 'caresync-ai',
        name: 'CareSync GenAI Assistant',
        avatar: '🤖',
        lastMessage: 'GenAI Engine Active. Type "help" to start diagnostics.',
        lastMessageTime: 'Just Now',
        unreadCount: 0,
        status: 'online',
        messages: [
          {
            id: 'ai1',
            sender: 'CareSync AI',
            text: 'Welcome to CareSync GenAI Clinical Intelligence Assistant. I am linked to the live telemetry vitals system. Type "analyze Alice Smith" or "help" to get started.',
            timestamp: '10:00 AM',
            status: 'read',
            isMe: false
          }
        ]
      }
    ];
    this.channelsSubject.next(this.channels);
  }

  setActiveChannel(channelId: string) {
    this.activeChannelIdSubject.next(channelId);
    const channel = this.channels.find(c => c.id === channelId);
    if (channel) {
      channel.unreadCount = 0;
      this.channelsSubject.next(this.channels);
    }
  }

  sendMessage(channelId: string, sender: string, text: string, isMe: boolean, currentVitals?: any) {
    const channel = this.channels.find(c => c.id === channelId);
    if (!channel) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender,
      text,
      timestamp: time,
      status: 'sent',
      isMe
    };

    channel.messages.push(newMessage);
    channel.lastMessage = text;
    channel.lastMessageTime = time;
    this.channelsSubject.next(this.channels);

    // Simulate delivered tick after 500ms
    setTimeout(() => {
      newMessage.status = 'delivered';
      this.channelsSubject.next(this.channels);
    }, 500);

    // Simulate read tick after 1000ms
    setTimeout(() => {
      newMessage.status = 'read';
      this.channelsSubject.next(this.channels);
    }, 1000);

    // Trigger AI or Doctor response
    if (channelId === 'caresync-ai') {
      this.handleAIResponse(channel, text, currentVitals);
    } else if (channelId === 'dr-sarah-alice') {
      // Auto-reply logic: if the message was sent by Alice (patient), let Dr. Sarah auto-respond.
      // If the message was sent by Doctor, no auto-respond.
      if (sender === 'Alice Smith') {
        this.handleDoctorResponse(channel, text, currentVitals);
      }
    }
  }

  private handleAIResponse(channel: ChatChannel, userText: string, vitals?: any) {
    channel.status = 'typing';
    this.channelsSubject.next(this.channels);

    const query = userText.toLowerCase().trim();
    let replyText = '';

    setTimeout(() => {
      if (query.includes('help') || query === 'hi' || query === 'hello') {
        replyText = `### CareSync Clinical GenAI Portal
Available AI commands:
1. \`analyze [patient]\` - Run diagnostics using live telemetry vitals (e.g. *analyze Alice Smith*).
2. \`explain [disease]\` - Request clinical pathology breakdown (e.g. *explain Arrhythmia*).
3. \`suggest rx for [patient]\` - Draft prescription medications using symptom intelligence.
4. \`status\` - Report facility bed occupancy and doctor availability.`;
      } else if (query.includes('analyze')) {
        let patientName = userText.replace(/analyze/i, '').trim() || 'Alice Smith';
        patientName = patientName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        
        const hr = vitals?.heartRate || 72;
        const bp = vitals?.bloodPressure || '120/80';
        const spo2 = vitals?.oxygenSaturation || 98;
        const temp = vitals?.temperature || 98.6;

        replyText = `### 📋 GenAI Clinical Telemetry Report - ${patientName}
- **Vitals Status**: ${hr > 90 || temp > 99.5 ? '⚠️ Abnormal (Triage Required)' : '🟢 Stable (Nominal)'}
- **Heart Rate**: ${hr} BPM
- **Blood Pressure**: ${bp} mmHg
- **Oxygen Saturation**: ${spo2}%
- **Temperature**: ${temp} °F

**Clinical Evaluation**: Telemetry feeds indicate ${hr > 90 ? 'mild sinus tachycardia' : 'healthy sinus rhythm'}. ${temp > 99.5 ? 'Subfebrile state detected, clinical supervision recommended.' : 'Normal thermoregulation.'}

**AI Guidelines**:
1. Order routine ECG trace.
2. If heart rate exceeds 95 BPM, alert Dr. Sarah Connor.
3. Keep patient hydrated.`;
      } else if (query.includes('explain')) {
        const path = userText.replace(/explain/i, '').trim() || 'Arrhythmia';
        replyText = `### 🩺 Pathology Intelligence: ${path}
**Description**: Abnormal heart rhythm caused by malfunctioning cardiac electrical impulses.
**Key Diagnostic Parameters**:
- normal PR Interval: 120-200ms
- Normal QRS Complex: < 120ms
- Target heart rate: 60-100 BPM
*Note: This neural-generated report is intended for clinician training and diagnostic assistance.*`;
      } else if (query.includes('suggest rx') || (query.includes('suggest') && query.includes('prescription'))) {
        const patientName = userText.replace(/suggest rx for|suggest prescription for/i, '').trim() || 'Alice Smith';
        replyText = `### 📝 Recommended Prescription Draft - ${patientName}
Recommended based on clinical telemetry history:
1. **Metoprolol Succinate 25mg** (Beta-Blocker) - 1 Tablet daily in morning.
2. **Aspirin 81mg** (Antiplatelet) - 1 Tablet daily after breakfast.

*Draft sent to Diagnostics module. Requires signature by an authorized physician.*`;
      } else if (query.includes('status')) {
        replyText = `### 🏥 CareSync Facility Status Audit
- **Active Patients**: ${vitals?.totalPatients || 3}
- **Bed Occupancy**: ${vitals?.roomOccupancyPercent || 30}%
- **On-Duty Clinicians**: ${vitals?.activeDoctorsCount || 2} Available
- **System Health**: All operations functioning within normal limits.`;
      } else {
        replyText = `I have received your query: "${userText}".
For dynamic analysis, type \`analyze Alice Smith\` or type \`help\` for a list of clinical commands.`;
      }

      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      channel.messages.push({
        id: Math.random().toString(36).substring(2, 9),
        sender: 'CareSync AI',
        text: replyText,
        timestamp: time,
        status: 'read',
        isMe: false
      });
      channel.lastMessage = 'AI analysis ready.';
      channel.lastMessageTime = time;
      channel.status = 'online';
      this.channelsSubject.next(this.channels);
      this.showToast('New clinical AI analysis report generated!', 'info');
    }, 1500);
  }

  private handleDoctorResponse(channel: ChatChannel, userText: string, vitals?: any) {
    channel.status = 'typing';
    this.channelsSubject.next(this.channels);

    setTimeout(() => {
      const hr = vitals?.heartRate || 72;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyText = '';

      if (userText.toLowerCase().includes('dizzy') || userText.toLowerCase().includes('pain') || userText.toLowerCase().includes('headache')) {
        replyText = `Hi Alice, I see your live heart rate is at ${hr} BPM. Please lie down immediately and stay calm. I will send a nurse to your room to check your vitals.`;
      } else if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
        replyText = `Hello Alice, I am currently reviewing your charts. Your heart rate is stable at ${hr} BPM. How are you feeling?`;
      } else {
        replyText = `Thank you for the update, Alice. Please rest. I will check on you during rounds.`;
      }

      channel.messages.push({
        id: Math.random().toString(36).substring(2, 9),
        sender: 'Dr. Sarah Connor',
        text: replyText,
        timestamp: time,
        status: 'read',
        isMe: false // Relative to Alice (Patient) who sent the previous message
      });
      channel.lastMessage = replyText;
      channel.lastMessageTime = time;
      channel.status = 'online';
      this.channelsSubject.next(this.channels);
      this.showToast('Dr. Sarah Connor replied to your message.', 'success');
    }, 2000);
  }
}
