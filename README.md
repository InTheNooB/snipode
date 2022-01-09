#  Snipode

Snipode *`Snippet Code`* is a web plateforme that allows visitors to access and store code snippets.
![name](https://i.ibb.co/7QyPKV8/Capture-d-cran-2022-01-09-172122.png)

## Installation
Build the react project using the command  
```bash
npm run build
``` 
Then start the NodeJS server using 
```bash
npm run start
```
## Usage 
The list of snippets is displayed on the main page on arrival. It is possible to :
-  Search through them using the search bar on top
-  Add new ones using the **Add** button on the top right 
- Copy code snippets by clicking on their title 

## Database
The snippets are stored server-side inside a **YAML** file 
```bash
/server/data/code-snippets.yaml
```

```yaml
-   id:  1
	title: First code snippet
	description: There goes the snippet's description. Might support HTML ?
	language: javascript
	code:  let a = "abc";
	color: hsl(154,54%,65%)
-   id:  2
	title: Second code snippet
	description:
	language: javascript
	code:  let a = "abc";
	color: hsl(23,44%,85%)

```