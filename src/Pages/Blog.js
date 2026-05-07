import React from "react";
import { Footer, Header } from "../Components";
import { faChess, faLaptopCode, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Blog = () => {
  return (
    <div>
      <Header />
      <div className="blog">
        <Link className="link_blog" to="/blog/reisebericht-4-wochen-in-aveiro">
          <FontAwesomeIcon className="icon" icon={faPlane} />4 Wochen in Aveiro
        </Link>
        <Link className="link_blog" to="/blog/rustyrook">
          <FontAwesomeIcon className="icon" icon={faChess} />
          RustyRook - Chess Engine
        </Link>
        <Link className="link_blog" to="/blog/ocp21">
          <FontAwesomeIcon className="icon" icon={faLaptopCode} />
          Java SE 21 Developer Professional
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
