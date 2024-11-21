import './AboutSection.css'
const About = () => {
  return (
    <>
      <div className="about" id="About">
        <div className="about_main">
          <div className="about_text">
            <h1>
              About <span>Us</span>
            </h1>
            <h3>Why Choose Us</h3>
            <p>
              Welcome to E-Sokoni Market! We make it easy to shop for all your daily needs, from food essentials like rice, sugar, and cooking oil to personal care products and household basics. Our goal is to provide you with high-quality items at affordable prices, so you don’t have to worry about finding what you need.

              At E-Sokoni Market, we put our customers first. We make shopping convenient with fast delivery and an easy online ordering process, so you can get what you need without leaving your home. We also offer secure payment options, so you can shop with confidence.

              Choose E-Sokoni Market for reliable service, quality products, and a hassle-free shopping experience. We’re here to make your life easier and bring essential products right to your doorstep.
            </p>
          </div> {/* Fixed the closing tag here */}
        </div>
      </div>
    </>
  );
};

export default About;
