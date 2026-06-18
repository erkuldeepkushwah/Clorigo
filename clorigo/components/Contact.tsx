import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, service, message } = formData;

    // Use default values if empty to keep the template readable
    const serviceText = service || '[Service Type]';
    const nameText = name || '[Name]';
    const phoneText = phone || '[Phone]';
    const emailText = email || '[Email]';

    const subject = `Inquiry regarding ${serviceText}`;
    const body = `Hello Clorigo Team,

I am interested in your services regarding ${serviceText}

Here are my details:

Name: ${nameText}
Contact No: ${phoneText}
Email: ${emailText}
Service Required: ${serviceText}
Message / Project Details:
${message}

I am looking to develop a ${serviceText} for my business and would like to know more about your solutions, features, pricing, and implementation process.

Looking forward to your response.

Best Regards,
${nameText}`;

    // Open mail client
    window.location.href = `mailto:clorigoindia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-dark mb-6">Have Any Projects In Mind?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We are ready to assist you with your digital needs. Reach out to us for a free consultation or quote. Our team responds within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark">Our Location</h4>
                  <p className="text-gray-600">Tech Park, Innovation Street, Indore, MP, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark">Email Us</h4>
                  <p className="text-gray-600">clorigoindia@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark">Call Us</h4>
                  <p className="text-gray-600">+917898692133</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-dark mb-6">Send A Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50" 
                    placeholder="" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50" 
                    placeholder="" 
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50" 
                    placeholder="" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 text-gray-700 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select a Service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50" 
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Send A Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
