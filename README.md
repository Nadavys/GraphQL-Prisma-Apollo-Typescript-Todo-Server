## GraphQL Prisma Apollo Typescript - Todo Server


- apollo-server
- prisma
- graphql
- typescript
- sqlite

---

install and run
```bash
npm install

npx prisma db push

npx prisma db seed

npm run dev
```


cURL command example
```bash
curl --request POST \
  --url http://localhost:4000/ \
  --header 'Content-Type: application/json' \
  --data '{"query":"query{allTodos{title, status}}"}'
```

See all persons and assigned tasks
```GraphQL
query test{
	allPersons{
		__typename
		name
		tasks{
			title
			status
		}
	}
}
```
Response:
```json
{
	"data": {
		"allPersons": [
			{
				"__typename": "Person",
				"name": "Moe",
				"tasks": [
					{
						"title": "Wash the car",
						"status": "PENDING"
					},
					{
						"title": "Walk the dog",
						"status": "PENDING"
					},
					{
						"title": "Grocery shopping",
						"status": "PENDING"
					},
					{
						"title": "Mop the floor",
						"status": "PENDING"
					},
					{
						"title": "Water plants",
						"status": "PENDING"
					}
				]
			},
			{
				"__typename": "Person",
				"name": "Larry",
				"tasks": []
			},
			{
				"__typename": "Person",
				"name": "Curly",
				"tasks": []
			}
		]
	}
}
```

Assign task to person
```GraphQL
mutation test{
	assignTodoToPerson(personId: 24, todoId:13){__typename,id, title person{name}}
}
```

Search by filter params
```GraphQL
query test{
	todoFeed(
	searchString:"clean"
		take: 10,
		skip: 0
	){
		__typename
		id
		title
		person{
			__typename
			name
		}
	}
}
```