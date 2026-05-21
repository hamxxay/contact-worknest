import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

// ─────────────────────────────────────────────
//  ✏️  CHANGE YOUR WHATSAPP NUMBER HERE
//      Include country code, no + or spaces
//      e.g. '923001234567' for Pakistan +92 300 1234567
// const WHATSAPP_NUMBER = '923335288498';
const WHATSAPP_NUMBER = '923160577702';
// ─────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {
  sent = false;

  // WhatsApp FAB — opens a blank chat
  whatsappFabUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  // Background slideshow
  slides = [
    'images/Slideshow1.jpg',
    'images/Slideshow2.jpg',
    'images/Slideshow3.jpg',
    'images/Slideshow4.jpg',
  ];
  currentSlide = 0;
  private slideInterval: ReturnType<typeof setInterval> | null = null;


  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  }

  ngOnDestroy() {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  onSubmit(form: NgForm) {
    const { name, email, message } = form.value;
    const text = `Hello WorkNest! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    this.sent = true;
    form.resetForm();
    setTimeout(() => (this.sent = false), 4000);
  }
}
