import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    barber: "",
    date: "",
    time: "",
    notes: "",
  });

  const services = useQuery(api.services.list) || [];
  const barbers = useQuery(api.barbers.list) || [];
  const createBooking = useMutation(api.bookings.create);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createBooking(formData);
      toast.success("Booking request submitted successfully! We'll contact you to confirm.");
      setFormData({ name: "", email: "", phone: "", service: "", barber: "", date: "", time: "", notes: "" });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    // 1. Changed section background to white
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* 2. Changed heading and paragraph text to dark gray */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-wider">
            BOOK YOUR APPOINTMENT
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience the Prestige difference? Schedule your appointment and discover true luxury grooming.
          </p>
        </div>

        {/* 3. Changed form container to white with border and shadow */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {/* 4. Inverted form field colors */}
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Full Name *</label>
                <input
                  id="name"
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="name-help"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Email Address *</label>
                <input
                  id="email"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="email-help"
                />
              </div>
            </div>
            {/* ... (Repeat color changes for all form fields) ... */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-gray-800 font-semibold mb-2">Phone Number *</label>
                <input
                  id="phone"
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="phone-help"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-gray-800 font-semibold mb-2">Service *</label>
                <select
                  id="service"
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="service-help"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service.name}>{service.name} - £{service.price} ({service.duration}min)</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="barber" className="block text-gray-800 font-semibold mb-2">Preferred Barber</label>
                <select
                  id="barber"
                  name="barber" 
                  value={formData.barber} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  aria-describedby="barber-help"
                >
                  <option value="">No preference</option>
                  {barbers.map((barber) => (<option key={barber._id} value={barber.name}>{barber.name}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-gray-800 font-semibold mb-2">Preferred Date *</label>
                <input
                  id="date"
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="date-help"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-800 font-semibold mb-2">Preferred Time *</label>
                <select
                  id="time"
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors"
                  required
                  aria-describedby="time-help"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (<option key={time} value={time}>{time}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Special Requests or Notes</label>
              <textarea
                name="notes" value={formData.notes} onChange={handleChange} rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 focus:border-amber-600 focus:outline-none transition-colors resize-none"
                placeholder="Any specific requests or notes for your appointment..."
              />
            </div>
            <div className="text-center">
              {/* 5. Changed button text to white */}
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-12 py-4 rounded text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                SUBMIT BOOKING REQUEST
              </button>
              {/* 2. Changed helper text color */}
              <p className="text-gray-500 text-sm mt-4">* We'll contact you within 24 hours to confirm your appointment</p>
            </div>
          </form>
        </div>

        {/* 6. Inverted Contact Info section colors */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <h3 className="text-gray-900 font-bold mb-2">Location</h3>
            <p className="text-gray-600">432 Madison Avenue<br/>New York<br/>NY 10017</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </div>
            <h3 className="text-gray-900 font-bold mb-2">Phone</h3>
            <p className="text-gray-600">(212) 555-TRIM<br/><span className="text-sm">Call or text</span></p>
          </div>
          <div>
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <h3 className="text-gray-900 font-bold mb-2">Hours</h3>
            <p className="text-gray-600">Mon-Fri: 7AM-8PM <br /> Sat: 8AM-6PM<br/>Sun: 10AM-4PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}