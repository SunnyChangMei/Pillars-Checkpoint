import React from 'react';

// exporting the constructor function (dumb component).
// Zach - Great us of destructuing the incoming props for clarity and economy of code. This is well written code.
const Article = ({ fullArticle }) => {
  const { title, content } = fullArticle;
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Article;
