import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { initializeApp } from 'firebase/app';
import 'firebase/ai';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-studio',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './studio.html',
    styleUrl: './studio.css'
})
export class StudioComponent implements AfterViewChecked {
    authService = inject(AuthService);
    private model: any;

    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    userInput = '';
    canvasContent = '';
    isLoading = false;

    chatMessages: { role: 'user' | 'model'; text: string }[] = [
        { role: 'model', text: 'Hello! I am your AI writing assistant. usage "gemini-3-flash-preview". How can I help you draft today?' }
    ];

    constructor() {
        try {
            // Re-initializing a dedicated app instance to ensure 'ai' service binding works correctly
            const app = initializeApp(environment.firebase, 'studio-ai');

            // Using getAI with GoogleAIBackend 
            const ai = getAI(app, { backend: new GoogleAIBackend() });

            this.model = getGenerativeModel(ai, {
                model: 'gemini-3-flash-preview',
                systemInstruction: `You are a helpful and creative writing assistant. 
You are collaborating with a user on a document in a "Canvas" on the right side of the screen.
When the user asks you to write, edit, or change something, you should:
1. Provide a brief, helpful response in the chat.
2. Provide the FULL updated content for the Canvas.

Use a specific JSON structure for your response so I can parse it:
\`\`\`json
{
  "chatResponse": "Your helpful chat message here.",
  "canvasUpdate": "The full text content for the canvas here."
}
\`\`\`
If you are just chatting and not updating the canvas, set "canvasUpdate" to null.
Always return valid JSON.`
            });
        } catch (e) {
            console.error('Error initializing Firebase AI:', e);
            this.chatMessages.push({ role: 'model', text: 'Error: Could not initialize AI model. Check console for details.' });
        }
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    async sendMessage() {
        if (!this.userInput.trim()) return;

        if (!this.model) {
            this.chatMessages.push({ role: 'model', text: 'AI Model not initialized. Refresh page.' });
            return;
        }

        const userMsg = this.userInput;
        this.userInput = '';
        this.chatMessages.push({ role: 'user', text: userMsg });
        this.isLoading = true;

        try {
            const result = await this.model.generateContent({
                contents: [
                    { role: 'user', parts: [{ text: `Current Canvas Content:\n${this.canvasContent}\n\nUser Request: ${userMsg}` }] }
                ]
            });

            const responseText = result.response.text();
            this.processResponse(responseText);

        } catch (error) {
            console.error('AI Error:', error);
            this.chatMessages.push({ role: 'model', text: 'Sorry, I encountered an error processing your request.' });
        } finally {
            this.isLoading = false;
        }
    }

    private processResponse(rawText: string) {
        try {
            // Attempt to clean code blocks if present
            const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/) || rawText.match(/```\n([\s\S]*?)\n```/);
            const jsonStr = jsonMatch ? jsonMatch[1] : rawText;

            const data = JSON.parse(jsonStr);

            if (data.chatResponse) {
                this.chatMessages.push({ role: 'model', text: data.chatResponse });
            }
            if (data.canvasUpdate) {
                this.canvasContent = data.canvasUpdate;
            }

        } catch (e) {
            // Fallback if not JSON
            this.chatMessages.push({ role: 'model', text: rawText });
        }
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    copyToClipboard() {
        navigator.clipboard.writeText(this.canvasContent);
    }
}
