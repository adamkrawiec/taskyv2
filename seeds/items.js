const Item = require('#app/items/item.model');

const itemsData = [
  {
    title: 'Introduction to Node.js / A beginners guide to Node.js and NPM',
    body: 'Sometimes it is very difficult to learn a new programming language because we generally don’t know where to begin. Node.js is nothing but JavaScript running on the server and it’s super awesome. In this article, we will learn how to set it up and understand some key concepts. By the end of this article, you will be to writing applications using Node.js.',
    url: 'https://medium.com/jspoint/introduction-to-node-js-a-beginners-guide-to-node-js-and-npm-eca9c408f9fe',
    addedById: 1
  },
  {
    title: 'Make Medium.com site with Node.js and React.js',
    body: '',
    url: 'https://www.myhsts.org/tutorial-develop-medium-dot-com-site-with-js-node-and-react.php',
    addedById: 2
  },
  {
    title: 'CRUD REST API with Node.js, Express, and PostgreSQL',
    body: 'For a modern web developer, knowing how to work with APIs to facilitate communication between software systems is paramount. In this tutorial, we’ll learn how to create a CRUD RESTful API in a Node.js environment that runs on an Express server and uses a PostgreSQL database. We’ll also walk through connecting an Express server with PostgreSQL using node-postgres.',
    url: 'https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/',
    addedById: 1
  },
  {
    title: 'Node.js Full Course for Beginners | Complete All-in-One Tutorial | 7 Hours',
    body: 'This Node.js Full Course for Beginners is an all-in-one beginner tutorial and complete course full of nearly 7 hours of Node JS code and instruction to level up your programming skills. This course teaches NodeJS, the Express JS framework, and MongoDB. Think of this Node.js full course tutorial as a Node JS video textbook with 15 clearly defined chapters.',
    url: 'https://www.youtube.com/watch?v=f2EqECiTBL8',
    addedById: 2
  },
  {
    title: 'Kurs Node.js + Express.js #1 - Pierwsze kroki z Express.js',
    body: '',
    url: 'https://www.youtube.com/watch?v=wh92CVwZs9Y',
    addedById: 2
  },
  {
    title: 'Express.js Fundamentals',
    body: 'Express.js is a fast and lightweight framework used majorly for web application development and Node.js Developers all over the world are totally in love with this framework. Express.js provides all the features of web applications without overshadowing the Node.js features. Through the medium of this article, I will be giving you a complete insight into the fundamentals of Express.js which will help you get started with it.',
    url: 'https://medium.com/edureka/expressjs-tutorial-795ad6e65ab3',
    addedById: 2
  },
  {
    title: 'Requiring modules in Node.js: Everything you need to know',
    url: 'https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/',
    addedById: 1
  }
];


itemsData.map(async (dataEntry) => await Item.create(dataEntry));
