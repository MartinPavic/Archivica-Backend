<br />
<div align="center">

<h3 align="center">Archivica</h3>

  <p align="center">
    <a href="https://documenter.getpostman.com/view/6304568/2sA2xb7bnG"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project




### Built With

* NodeJS - v18.17 minimum
* Redis
* MongoDB 



## Getting Started
Install nodeJS with minimum version v18.17. Also you will need to have docker that is running databases containers. Install docker and docker-compose for running it. You can also install Docker Desktop if you want to run containers from UI.

Git clone project from repository
```sh 
git clone https://github.com/MartinPavic/Archivica-Backend.git
```

Navigate to cloned project and run containers
```sh
docker-compose -f docker-compose-local.yml
```
After that check that 3 MongoDB, Redis and PostgreSQL containers are running. Posgre is not being used right now.  

After that install packages used in project with
 ```sh 
  npm install
```



Run backend with command
 ```sh 
  npm start:win:run
```
Before checking frontend, migrate data to database so you don't have errors.
```sh
npx migrate up add_all_collections
```

Make sure that .env file is placed in project root folder where all keys, ports and paths are there. You have to ask owner for .env file. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>
