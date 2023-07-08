Hello everyone i hope you all doing well,
I will be explaining in the next paragraphs about the code that i wrote and explain few aspects and upgrades that might be included other than the assignment.


Installation:
- install the dependencies in the backend , run command "npm install" in backend dir and it will install the deps in package.json
- install the dependencies in the frontend , run command "npm install" in frontend dir and it will install the deps in package.json
- To run the server please change directory to the backend dir and write in the terminal "npm run start" and this will run nodemon inorder to run the server.
- To start the application please change directory to the frontend dir and write in terminal "npm start" and this will start our react application.
- In order to run the jest test for the retention time please change directory to backend and write "npx jest --detectOpenHandles" and this command will run a 
test in jest for uplading a file and checking if it removes after a period of time that we choose correctly.


Description about the frontend:

- I have created 1 component that might be used in the future maybe and 2 pages
- Filesharing component is a component that has the functionality of dragging or uploading a file and submit it for the server with a link that can be copied 
and sent to other employees in order to view it by sending a request for the server and it has also a retention of time for the specific meme and after that time 
the server will be deleting it.
- Error page that will be displayed when ever an error happend for a page not found.
- Memepage that is a specific meme with it's id and the page is bassicaly is the meme it self.

Description about the backend:

- I have created two routes one for putting a file into our (Disk we can use a database for that with a function that will run after specific of time but i did this inorder to reply
for the requests fast and without a third connection with a database and requests) and second route is for get requests that are for files them selfs.


Description about the tests:

- test that is adding an example picture (can be a meme) and it checks if it is there and after the retention of time it checks if that file is deleted from the server

Description about upgrades:

- we can use a fast in memory(cache) database like redis since the memes have retention time and all of the pictures will be saved in jziped form for memory
and when the time is up the server will request to delete that picture and when ever it is not deleted a user can get the picture after the server unzip it back to him.

- we can also use state managment tools like redux in order to have a better store of states and for future purposes and to avoid props hell.

- we can include authentication and autherization into the app for only cyclo employees to access the memes and share between them selfs.


I am karam, i hope you like my work for this assignment and i hope i will meet and be in one of the best enviroments ever and thanks.

Best regards,
Karam