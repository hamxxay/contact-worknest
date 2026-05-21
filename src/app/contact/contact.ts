import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

// ─────────────────────────────────────────────
//  ✏️  CHANGE YOUR WHATSAPP NUMBER HERE
//      Include country code, no + or spaces
//      e.g. '923001234567' for Pakistan +92 300 1234567
const WHATSAPP_NUMBER = '923160577702';
// ─────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private platformId = inject(PLATFORM_ID);
  sent = false;
  whatsappFabUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  onSubmit(form: NgForm) {
    const { name, email, message } = form.value;
    const text = `Hello WorkNest! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
    this.sent = true;
    form.resetForm();
    setTimeout(() => (this.sent = false), 4000);
  }
}
