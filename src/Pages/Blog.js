import React from "react";
import { Footer, Header } from "../Components";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Blog = () => {
  return (
    <div>
      <Header />
      <div className="blog">
        <a
          className="link_blog"
          onClick={() => (window.location.href = `/blog/reisebericht-4-wochen-in-aveiro`)}
        >
          <FontAwesomeIcon className="icon" icon={faPlane} />4 Wochen in Aveiro
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
