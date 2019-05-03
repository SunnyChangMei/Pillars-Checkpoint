import React from 'react';

// exporting the constructor function (dumb component).

const Article = ({fullArticle}) => {
  const {title, content} = fullArticle;
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Article;
