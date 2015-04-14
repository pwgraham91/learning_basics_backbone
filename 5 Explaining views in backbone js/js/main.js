var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 23,
		occupation: 'worker'
	},
	validate: function(attributes) {
		if ( attributes.age < 0 ) {
			return 'Age must be positive.';
		}

		if ( !attributes.name ) {
			return 'Every person must have a name.';
		}
	},
	work: function() {
		return this.get('name') + ' is working.';
	},
	setHometown: function (hometown) {
		this.set('hometown', hometown)
	}
});

var otherPerson = new Person({name:"Maroon Tyagi", age: 26, occupation: "Graphics Designer"});
var person = new Person;
person.setHometown('SF')
person.set('name', 'Taroon Tyagi')
person.set('hometown', 'Austin')
console.log(person.toJSON());
// wont work because of validator
person.set('age', -1);

var PeopleCollection = Backbone.Collection.extend({
  model: Person
});

// View for all people
var PeopleView = Backbone.View.extend({
	tagName: 'ul',

	render: function() {
		this.collection.each(function(person) {
			var personView = new PersonView({ model: person });
			this.$el.append(personView.render().el);
		}, this);

		return this;
	}
});

var PersonView = Backbone.View.extend({
	tagName: 'li',

	//my_template: _.template("<strong><%= name %></strong> (<%= age %>) - <%= occupation %>"),
	template: _.template( $('#personTemplate').html() ),

	initialize: function() {
		this.render();
	},

	render: function() {
		// anti-pattern
		//this.$el.html( this.model.get('name') + ' (' + this.model.get('age') + ') - ' + this.model.get('occupation') );
		//this.$el.html( this.my_template(this.model.toJSON()) );
		this.$el.html( this.template(this.model.toJSON()) );

	}
});

var jain = new Person({name: "Mohit Jain", age: 25, occupation: "Software Developer"})
var personView = new PersonView({ model: jain });
$(document.body).html(personView.el);

var peopleCollection = new PeopleCollection([
  {
      name: 'Mohit Jain',
      age: 26
  },
  {
      name: 'Taroon Tyagi',
      age: 25,
      occupation: 'web designer'
  },
  {
      name: 'Rahul Narang',
      age: 26,
      occupation: 'Java Developer'
  }
]);
