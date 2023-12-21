**API for date booking**

*GET /calendar/event*

Returns event by its id

```
Request
query: {"id": string}
```

```
Response 
{"id": string, 

"title": string, 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"}
```

*GET /calendar/events*

Returns all events within the specified period.

```
Request
query: { 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"

}
```


```
Response 
[{"id": string, 

"title": string, 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"}]
```

*GET /calendar/availability*

Checks the availability for the specified period. Returns *true* or *false*.

```
Request
query: { 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"

}
```


*POST /calendar/event

Creates a new event.

```
Request
body: {

"title": string, 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"

}
```


```
Response 
{
	
	"id": string, 

"title": string, 

"startDate": "YYYY-MM-DD", 

"endDate": "YYYY-MM-DD"}
```

// TODO:

— Swagger
— Unit tests