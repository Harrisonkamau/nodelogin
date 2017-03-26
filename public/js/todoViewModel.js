function ViewModel() {

  // Data
  var self = this;
  self.todos = ko.observableArray([]);
  self.newTodo = ko.observable();

  // Behaviour
  self.addTodo = function(){
    if(self.newTodo != ""){
      self.todos.push(self.newTodo());
      // clear the input
      self.newTodo("");
    }
  }

}

// Activate knockout.js
ko.applyBindings(new ViewModel());