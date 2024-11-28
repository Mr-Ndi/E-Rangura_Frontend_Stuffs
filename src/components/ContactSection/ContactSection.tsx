import { useState } from 'react';
import './ContactSection.css'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="contact" id="Contact">
      <h1>
        Contact <span>Us</span>
      </h1>
      <div className="container">
        <div className="contact_box">
          <div className="left">
            <h2>We'd Love to Hear From You!</h2>
            <p>Feel free to reach out with any questions or feedback.</p>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                className="field"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                id="email"
                className="field"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                id="phone"
                className="field"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                id="message"
                className="field"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="contact_btn">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
