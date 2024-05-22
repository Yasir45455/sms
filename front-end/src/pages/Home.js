import React from 'react';
import UserNavbar from '../components/UserNavbar/UserNavbar';
import StudentLogin from '../components/StudentLogin/StudentLogin';
// export default function Home() {
//   return (
//     <div>
//       < StudentLogin />
//     </div>
//   );
// }
export function HomeSection() {
  return (
    <div className="py-5" style={{ boxShadow: "none", backgroundColor: "#e4e4e4" }}>
      <div className="row align-items-center">
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <div className="home-content">
            <h1 className="d-none d-md-block m-0 p-0"
              style={{ fontSize: '90px', fontWeight: '800' }}>
              STUDENT </h1> <h1 style={{ fontSize: '50px' , fontWeight: '800'  }}> <span style={{ color: "#007dfe" }}>  MANAGEMENT  </span> SYSTEM</h1>
            <h3 className="d-md-none" style={{ fontWeight: '800' }}>ODE ONLINE SURVEY</h3>
            <p> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="button-container">
              <button className="btn btn-lg me-3 text-white" style={{ backgroundColor: "#007dfe" }}>Learn More</button>
              <button className="btn btn-lg me-3" style={{ border: "1px solid #007dfe", color: "#007dfe" }}>Contact Us</button>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="image-container">
            <img className="img-fluid" src="https://img.freepik.com/free-vector/college-students-concept-illustration_114360-13745.jpg?t=st=1715858097~exp=1715861697~hmac=d214f7f2bc97d91174be536256ee2f238ffc15165e478675d385586102bc2839&w=826" alt="Placeholder" />
          </div>
        </div>
        <div className="col-lg-1"></div>
      </div>
    </div>
  );
};

export function FeatureCard({ featureTitle, featureDescription, featureIconClass }) {
  return (
    <div className="card">
      <div className="card-body">
        <i className={featureIconClass} style={{ color: "#007dfe", fontSize: "40px" }}> </i>
        <h5 className="card-title mt-3">{featureTitle}</h5>
        <p className="card-text mt-3">{featureDescription}</p>
      </div>
    </div>
  );
};

export function FeaturesSection() {
  return (
    <section className="features">
      <div className="container" style={{ boxShadow: "none" }}>
        <h2 className="text-center my-5 text-dark">Key Features</h2>

        <div className="row">
          <div className="col-md-4">
            <FeatureCard
              featureTitle="Feature 1"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              featureIconClass="fas fa-heart"
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              featureTitle="Feature 2"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              featureIconClass="fas fa-star"
            />
          </div>
          <div className="col-md-4">
            <FeatureCard
              featureTitle="Feature 3"
              featureDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              featureIconClass="fas fa-check"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export function TestimonialCard({ quote, imageSrc, name, profession }) {
  return (
    <div data-aos-duration="1500" data-aos="fade-up" className="card p-2 mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <i className="fa-solid fa-quote-left" style={{ fontSize: '100px' }}></i>
        <div>
          {[...Array(5)].map((star, index) => (
            <i key={index} className="fa-solid fa-star text-warning"></i>
          ))}
        </div>
      </div>
      <div className="card-body">
        <p className="card-text text-center text-secondary fw-bold" style={{ fontWeight: '600' }}>{quote}</p>
        <div className="d-flex justify-content-center align-items-center pt-2 carousel w-100">
          <img className="carousel" src={imageSrc} alt="" />
          <div className="text-start">
            <h5 className="fw-bold m-0 my-1 text-start text-secondary">{name}</h5>
            <span className="text-info">{profession}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
// 
export function CardComponent({ title, description, iconClass }) {
  return (
    <div className="card border-0" data-aos="fade-up" data-aos-duration="1500">
      <div className="card-body row">
        <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center align-items-center">
          <i className={`fa-solid ${iconClass} text-white bg-danger p-3`}></i>
        </div>
        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10">
          <h4 className="">{title}</h4>
          <p className="text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default function Home() {
  return (
    <>
      {/* < StudentLogin /> */}

      <HomeSection />
      <FeaturesSection />
      <div style={{
        backgroundColor: "#e4e4e4"
      }}>
        <h2 className="text-center my-5 text-dark py-5">Our Services</h2>
        <div className="d-flex justify-content-around flex-wrap gap-5 px-md-5 py-3 services">
          <CardComponent
            title="Individual Enrollment"
            description="We help Individual Providers and Groups to get enrollment with CMS Plans (Medicare & Medicaid) and all other commercial Plans"
            iconClass="fa-user-plus"
          />
          <CardComponent
            title="Another Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            iconClass="fa-heart"
          />
          <CardComponent
            title="Another Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            iconClass="fa-heart"
          />
          <CardComponent
            title="Another Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            iconClass="fa-heart"
          />
          {/* Add more instances of CardComponent as needed */}
        </div>
      </div>
      <div className="container py-5 cardB" style={{ boxShadow: "none" }}>
        <div className="row">
          <div data-aos="fade-right" className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-center align-items-center">
            <img src="https://img.freepik.com/free-photo/3d-render-smartphone-black-hands-with-finger_107791-17739.jpg?t=st=1710387041~exp=1710390641~hmac=4d601afc1975cbf95ab800cca44c6b6315a5339ce5f003c8ba0470c251be0597&w=740" className="img-fluid" />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 section-4">
            <h1 className="heading-1 text-center" style={{ fontWeight: "800", fontSize: '35px', color: "#007dfe" }} data-aos="fade-up" data-aos-duration="1500">
              HOW WE WORK
            </h1>
            <p className="text-center" data-aos="fade-up" data-aos-duration="1500">
              We provide truly professional Credentialing and Medical Billing Services
            </p>
            <CardComponent
              title="Another Title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              iconClass="fa-heart"
            />
            <CardComponent
              title="Another Title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              iconClass="fa-heart"
            />
            <CardComponent
              title="Another Title"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              iconClass="fa-heart"
            />
            <a className="btn btnn rounded text-white px-3" href="#">Explore All Services</a>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#007dfe" }} className="p-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="d-none d-md-block m-0 p-0 py-5 text-white text-center"
          style={{ fontSize: '40px', fontWeight: '800' }}>
          Can't decide? Love everybody vote! </h1>
        <h3 className="d-md-none" style={{ fontWeight: '800' }}> Can't decide? Love everybody vote!</h3>
        <button className="btn btn-lg me-3 text-white py-2 vote-btn" style={{ border: "1px solid white", fontSize: '20px', fontWeight: '800', width: "200px" }}>Click here to vote now!</button>
      </div>
      <div className="section-6 row  pb-md-5 px-md-5" style={{ marginTop: "100px" }}>
        <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 testtimonial-cards">
          <TestimonialCard
            quote="I have been working with this company for a short while now and I am more than pleased. At first I was a little scared and nervous but working with Shawn Benson has been the BEST!"
            imageSrc="https://robustcredentialing.com/wp-content/uploads/2023/10/patient_1.jpg"
            name="Saybah Glay"
            profession="Doctor"
          />
          <TestimonialCard
            quote="I have been working with this company for a short while now and I am more than pleased. At first I was a little scared and nervous but working with Shawn Benson has been the BEST!"
            imageSrc="https://robustcredentialing.com/wp-content/uploads/2023/10/patient_2.jpg"
            name="Naimah Colloway"
            profession="Doctor"
          />
        </div>
        <div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
          <div className="p-5">
            <h1 className="m-0 py-5">Testimonials</h1>
            <a className="btn rounded text-white px-3" href="#" style={{ backgroundColor: "#007dfe" }}>Contact Us</a>
          </div>
        </div>
      </div>
    </>
  );
}