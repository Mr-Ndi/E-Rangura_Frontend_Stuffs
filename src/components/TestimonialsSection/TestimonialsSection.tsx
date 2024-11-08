import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        { id: 1, text: "Great products! Highly recommend.", name: "Alice" },
        { id: 2, text: "Excellent customer service!", name: "Bob" },
    ];

    return (
        <div className="testimonials">
            <h2>What Our Customers Say</h2>
            {testimonials.map(testimonial => (
                <blockquote key={testimonial.id}>
                    <p>"{testimonial.text}"</p>
                    <footer>- {testimonial.name}</footer>
                </blockquote>
            ))}
        </div>
    );
};

export default TestimonialsSection;
