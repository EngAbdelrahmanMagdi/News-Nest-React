import React from "react";

const NewsNestTitle: React.FC = () => {
  return (
    <div className="flex items-center justify-center my-16 mb-5">
      <h1
        className="text-6xl font-bold text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ffffff, #007bbf, #009de0, #f48024)",
        }}
      >
        News Nest
      </h1>
    </div>
  );
};

export default NewsNestTitle;
