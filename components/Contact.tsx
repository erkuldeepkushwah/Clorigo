import React, { useState } from 'react';
import { CONTACT_INFO, SERVICES } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, phone, subject, message } = formData;
    
    const body = `Hello Clorigo Team,

I am interested in your services regarding ${subject || '[type]'}

Here are my details:
Name: ${name}
Contact No: ${phone}
Email: ${email}
Service Required: ${subject || '[ Type ]'}

Message / Project Details:
${message}

I am looking to develop a ${subject || '[type ]'} for my business and would like to know more about your solutions, features, pricing, and implementation process.

Looking forward to your response.

Best Regards,
${name}`;

    const mailtoLink = `mailto:clorigoindia@gmail.com?subject=Inquiry regarding ${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Side Info */}
          <div className="w-full lg:w-5/12">
            <span className="text-gray-500 font-bold text-xs tracking-widest uppercase mb-2 block">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Have Any Projects In Mind?
            </h2>
            <p className="text-gray-600 mb-10 text-sm leading-relaxed">
              We are ready to assist you with your digital needs. Reach out to us for a free consultation or quote. Our team responds within 24 hours.
            </p>

            <div className="space-y-8">
              {CONTACT_INFO.map((info, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-primary">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold mb-1">{info.type}</h4>
                    {info.content.map((line, i) => (
                      <p key={i} className="text-gray-600 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send A Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Service Type</label>
                    <div className="relative">
                      <select 
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm bg-white appearance-none cursor-pointer text-gray-700"
                      >
                        <option value="" disabled>Select a Service</option>
                        {SERVICES.map((service, idx) => (
                          <option key={idx} value={service.title}>{service.title}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow transition-colors uppercase tracking-wide text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;