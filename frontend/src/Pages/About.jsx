import React from "react";

const About = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8">About Book Haven</h1>

        {/* Intro paragraph */}
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Welcome to <span className="font-semibold text-blue-600">Book Haven</span> — your trusted destination for everything books. 
          Whether you're looking for the latest bestsellers, timeless classics, or hidden literary gems, 
          we are here to make your reading journey unforgettable.
        </p>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Left side: image */}
          <img 
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794" 
            alt="Books"
            className="rounded-2xl shadow-lg"
          />

          {/* Right side: text */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Story</h2>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Founded in 2020, Book Haven began with a simple mission: to inspire a love of reading in people of all ages. 
              What started as a small online bookstore has blossomed into a thriving community of readers, dreamers, and thinkers. 
              Every book we offer is carefully curated to bring value, joy, and inspiration to your life.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-blue-600">What Makes Us Special?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Vast collection of genres, from fiction to self-help</li>
              <li>Exclusive deals and seasonal discounts</li>
              <li>Fast and reliable worldwide shipping</li>
              <li>Passionate customer support that cares about you</li>
            </ul>
          </div>

        </div>

        {/* Final Call-to-action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Join Our Book-Loving Family!</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Be part of a community where stories come alive. Stay updated with the latest releases, author events, and exciting offers.
          </p>
          <a 
            href="/shop"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-full shadow hover:bg-blue-700 transition"
          >
            Explore Our Collection
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
