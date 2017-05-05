//Script for creating todos database and collection

//Create todolist database and connect to it
var db = connect('127.0.0.1:27017/todos');
allTodos = null;

print("* Todos database created");

//Add todos
db.todos.insert({'title': 'CS Homework',
                 'text': 'Finish creating app',
                 'due': 'Tomorrow at 9 AM',
                'status': 'Not Done'});

print("* Todos created");

//Set a reference to all documents in the database
allTodos = db.todos.find();

print("* All Todos:");

//Iterate the todos collection and output each document (todo)
while (allTodos.hasNext()) {
    printjson(allTodos.next());
}