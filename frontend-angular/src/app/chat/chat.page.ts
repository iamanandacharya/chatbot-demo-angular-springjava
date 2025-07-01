
import { ChatServiceService } from '../services/chat-service.service'
 import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonContent } from '@ionic/angular';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {

@ViewChild('messagesDisplay', { static: false }) messagesDisplay: ElementRef | undefined;
  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  isTyping: boolean = false;
  backendUrl: string = 'http://localhost:8080/api/chat'; // Replace with your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initial bot message or welcome message
    this.messages.push({
      sender: 'bot',
      text: 'Hello! How can I assist you today?',
      timestamp: new Date(),
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(300); // Scroll to bottom with a 300ms animation
    }
  }

  async sendMessage() {
    const userMessageText = this.newMessage.trim();
    if (!userMessageText) {
      return;
    }

    // Add user message to chat
    this.messages.push({
      sender: 'user',
      text: userMessageText,
      timestamp: new Date(),
    });
    this.newMessage = ''; // Clear input field
    this.scrollToBottom();

    this.isTyping = true; // Show typing indicator

    try {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const response = await this.http.post<any>(this.backendUrl, { message: userMessageText }, { headers }).toPromise();

      // Add bot response to chat
      this.messages.push({
        sender: 'bot',
        text: response.reply, // Assuming backend sends a 'reply' field
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error sending message to backend:', error);
      this.messages.push({
        sender: 'bot',
        text: 'Sorry, I am having trouble connecting to the service. Please try again later.',
        timestamp: new Date(),
      });
    } finally {
      this.isTyping = false; // Hide typing indicator
      this.scrollToBottom();
    }
  }
}
