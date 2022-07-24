# Technologies

### Azure Services

**Azure Cosmos DB**
- This will serve as the database for the project
- It will store user submissions and images to be displayed on the app

**Azure Serverless Functions**
- Any interaction with the database will be done through serverless functions
- This includes queries for locations and images and adding locations and images 

**Azure Static Web Apps**
- This is how the app will be hosted

### APIs

**Maps Javascript API**
- This will be used to locations to embed Google Maps into each submission
- This will make it easier for users to find locations

**Maps Embed API**
- This may be a simpler way to get an interactive map in the app
- Whether this is used or not the Javascript API is needed to access the Places Library

### Packages/Libraries/Databases

**Node Fetch**
- This will be used for fetches to serverless functions

**Parse Multipart**
- This will be used to upload images to the database

**Places Library**
- This is used with the Maps Javascript API to create an autocomplete search box for the maps

**TailwindCSS**
- This will be used to speed up styling and front-end development

**Next.js**
- This will be used to simplify development with a component-based framework, as well as image optimiazation and extra features provided by Next.

### Front-end Languages

**Javascript**
- This will be used since the project will be developed in Next.js

### Flowchart

![Flowchart](Serverless%20Camp%20Project.png)
