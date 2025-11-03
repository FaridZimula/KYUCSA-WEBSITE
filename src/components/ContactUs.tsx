import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Globe } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create mailto link with form data
      const emailBody = `Name: ${formData.name}%0D%0A` +
        `Phone: ${formData.phone}%0D%0A` +
        `Email: ${formData.email}%0D%0A%0D%0A` +
        `Subject: ${formData.subject}%0D%0A%0D%0A` +
        `Message:%0D%0A${encodeURIComponent(formData.message)}`;

      const mailtoLink = `mailto:info@kyucsa.org?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus('success');
        setIsSubmitting(false);
      }, 500);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  // Google Maps embed URL for Faculty of Science Block, Kyambogo University
  // Using a search query for Kyambogo University, Faculty of Science Block
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7546956381047!2d32.63470331475461!3d0.349957599638832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbf1f0c0e6b3b%3A0x1f5c5c5c5c5c5c5c!2sKyambogo%20University%20Faculty%20of%20Science!5e0!3m2!1sen!2sug!4v1634567890123!5m2!1sen!2sug";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Header Section */}
      <div className="bg-primary-500 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out to us through any of the channels below or visit us at our location.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Location */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500 p-3 rounded-full flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <p className="text-sm text-gray-600">Faculty of Science Block</p>
                    <p className="text-sm text-gray-600">Kyambogo University</p>
                    <p className="text-sm text-gray-600">Kampala, Uganda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500 p-3 rounded-full flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <a href="tel:+256765458906" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                      +256 765 458 906
                    </a>
                    <a href="tel:+256701234567" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                      +256 701 234 567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Email */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500 p-3 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <a href="mailto:info@kyucsa.org" className="text-sm text-primary-500 hover:text-primary-600 transition-colors break-all">
                      info@kyucsa.org
                    </a>
                    <a href="mailto:president@kyucsa.org" className="text-sm text-primary-500 hover:text-primary-600 transition-colors break-all">
                      president@kyucsa.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary-500 p-3 rounded-full flex-shrink-0">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <p className="text-sm text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    <p className="text-sm text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                    <p className="text-sm text-gray-600">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Form Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Google Map */}
          <div className="order-2 lg:order-1">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                Find Us on Map
              </h3>
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="KYUCSA Location - Faculty of Science Block, Kyambogo University"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Address:</strong> Faculty of Science Block, Kyambogo University, Kampala, Uganda
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Faculty+of+Science+Block+Kyambogo+University+Kampala+Uganda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-500 hover:text-primary-600 transition-colors inline-flex items-center"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-primary-500 p-6 sm:p-8 rounded-xl shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Send us a Message
              </h3>
              
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="text-sm">✓ Your email client should open. If not, please email us directly at info@kyucsa.org</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="text-sm">There was an error. Please try again or email us directly at info@kyucsa.org</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Full Name <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 focus:outline-none text-sm sm:text-base text-gray-900"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 focus:outline-none text-sm sm:text-base text-gray-900"
                      placeholder="+256 700 000 000"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2 text-sm sm:text-base">
                      Email Address <span className="text-red-300">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 focus:outline-none text-sm sm:text-base text-gray-900"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Subject <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 focus:outline-none text-sm sm:text-base text-gray-900"
                    placeholder="What is your message about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Message <span className="text-red-300">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-secondary-500 focus:outline-none resize-none text-sm sm:text-base text-gray-900"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary-500 hover:bg-secondary-600 disabled:bg-secondary-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      Send Message via Email
                    </>
                  )}
                </button>

                <p className="text-xs text-blue-100 text-center mt-4">
                  By submitting this form, your default email client will open with your message pre-filled.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
