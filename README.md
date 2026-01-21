website is active @ https://todo-mern-steel-xi.vercel.app/
A full-stack To-Do List application built using the MERN stack (MongoDB, Express, React, Node.js).  
Users can add, edit, delete, and mark tasks as completed with a clean and responsive UI.

features:
  -add todo
  -edit todo and save 
  -delete todo
  -update todo(completed)

link : https://thanuj-imayavaramban31.github.io/todo-mern/

content of .env :
  PORT : 4000
  MONGO_URI: mongodb+srv://varamban2007_db_user:gYzA50S6OcaLFQP7@mern-stack.itachtr.mongodb.net/


GET method	
      /api/todos	- Fetch all todos
POST metghod 
      /api/todos	- Create a new todo
PUT	method 
      /api/todos/:id	- Update a todo
DELETE	method
      /api/todos/:id	- Delete a todo


problems faced : 
    ES Module : in package.json i added "type": "module"  but i used ,require which doesnot supported , then i have cahnged evrything to import ,each and evry functions i have chnage it to "export functionName " 
    backend : backend is intially running in different port , but i tried to fetch from other port which gave me error , then i changed it .
    connection : connecting backend with frontend is a difficult task because we have to deal with the naming , i had a lot of errors by using different names , like using camel casing convention in one 
                  and just plain name in another , which gave a lot of errors.
    too-many render : in App.js file ,inside return ,inside some button i tried to call the function onClick but without uing a function way , which cause too-many render,prevent he webpage from running 
                  and then i addded arrow function to solve that problem
    PUT method : for updatetodo method i was using patch method instead of put method which cause  an error 








                  
