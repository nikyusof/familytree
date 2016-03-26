// $(function() {

// 	Parse.$ = jQuery;

// 	// Initialize Parse applicaiton javascript keys
// 	Parse.initialize('NUERg7Hfj2r8fR1Doh5sIF0M2ZCAloiGw7gqp7Xo',
// 					 				 'b0S35wwtlN48gvRWbg1z77CPZA9Amy0160bsGDTO');

// 	var AppState = Parse.Object.extend('AppState', {
// 		defaults: {
// 			route: '#'
// 		}
// 	});

// 	// Person Model
// 	// ------------

// 	// The person model
// 	var Person = Parse.Object.extend('Person', {
// 		// default attributes for the person
// 		defaults: {
// 			fullName: '',
// 			email: '',
// 			phoneNumber: '',
// 			dob: ''
// 		},

// 		// Ensure that each person model has a first name and last name
// 		initialize: function() {
// 			if (!this.get('fullName')) {
// 				this.set({ 'fullName': this.defaults.fullName });
// 			}
// 		}
// 	});

// 	// Person Collection
// 	// -----------------

// 	// The person collection
// 	var PersonCollection = Parse.Collection.extend({
// 		// Reference to this collection's model
// 		model: Person
// 	});

// 	// Person View
// 	// -----------

// 	var PersonView = Parse.View.extend({
// 		// The DOM element for the Person view
// 		// TODO: change the tagName
// 		tagName: 'fieldset',

// 		// Cache the template function for a single person
// 		template: _.template($('#person-template').html()),

// 		// The DOM events specific to a person
// 		events: {
// 			'click .js-remove-child' : 'clear'
// 		},

// 		// The PersonView listens for changes to its model, re-rendering.
// 		initialize: function() {
// 			_.bindAll(this, 'render', 'clear');
// 			// this.model.bind('destroy', this.remove);
// 		},

// 		// render the view
// 		render: function() {
// 			$(this.el).html(this.template(this.model));
// 			return this;
// 		},

// 		// Remove the child, destroy the model
// 		clear: function() {
// 			this.model.destroy();
// 		}
// 	});

// 	// The Application
// 	// ---------------

// 	// The main view that lets a user manage the family people
// 	var MangeFamilyView = Parse.View.extend({

// 		// Delegated events for creating new person
// 		events: {
// 			'click .js-add-child': 'addChild',
// 			'click .js-submit': 'submitPost'
// 		},

// 		el: '.contact',

// 		// At initialization we bind to the relevant events on the PersonCollection
// 		// when children are added or changed.
// 		initialize: function() {
// 			var self = this;

// 			_.bindAll(this, 'addChild', 'activateDatePicker');

// 			// Manage family template
// 			this.$el.html(_.template($('#contact').html()));

// 			this.input = this.$('.js-add-child');

// 			// Create our collection of people
// 			this.family = new PersonCollection;

// 			// this.family.bind('addChild', this.addChild());
// 		},

// 		// Add a single child to the list by creating a view for it,
// 		// and appending its element to the '<ul>'
// 		addChild: function(person) {
// 			var view = new PersonView({model: person});
// 			this.$('.js-add-child').append(view.render().el);
// 			this.activateDatePicker();
// 		},

// 		// Activate the date picker
// 		activateDatePicker: function() {
// 			$('.js-dob').dateDropper({
// 				years_multiple: '10',
// 				minYear: '1940',
// 				animation: 'bounce'
// 			});
// 		},

// 		// Submit the post and save our data
// 		submitPost: function() {
			
// 		}
// 	});

// 	// The main view for the app
// 	var AppView = Parse.View.extend({
// 		el: $('#familytreeapp'),

// 		initialize: function() {
// 			this.activateDatePicker();
// 			this.render();
// 		},

// 		// render the views
// 		render: function() {
// 			new MangeFamilyView();
// 		},

// 		// Activate the date picker
// 		activateDatePicker: function() {		
// 			$('.js-dob').dateDropper({
// 				years_multiple: '10',
// 				minYear: '1940',
// 				animation: 'bounce'
// 			});
// 		}
// 	});

// 	// The main router for the app
// 	var AppRouter = Parse.Router.extend({
// 		routes: {
// 			"#": "home"
// 		},

// 		initialize: function(options) {
// 		},

// 		home: function() {
// 			state.set({ route: '#' })
// 		}
// 	});

// 	var state = new AppState;

// 	new AppRouter;
// 	new AppView;
// 	Parse.history.start();

// });

/**
* Function to activate the date picker
*/
function activateDatePicker() {
	$('.js-dob').dateDropper({
		years_multiple: '10',
		minYear: '1940',
		animation: 'bounce'
	});
}

// initialize the date picker when the application starts
activateDatePicker();

// global variable for count
var count = 0;

/**
 * Handle adding a new child
 */
$('.js-add-child').click(function(e) {
	// increment the children count
	count++;

	addChildElement(count);
});

/**
 * Function to add a child element
 */
function addChildElement(count) {
	var $childElement = '<fieldset class="person child_' + count + '"><div class="child_wrapper"><h2 class="child_tag"><strong>Child ' + count + '</strong></h2><button type="button" class="js-remove-child btn btn-danger remove_child" data-child="' + count + '">-</button></div><p><label>Full Name </label><input type="text" name="child_' + count + '_name" /></p><p><label>Email </label><input type="email" name="child_' + count + '_email"/></p><p><label>Phone Number </label><input type="text" name="child_' + count + '_phone"/></p><p><label>DOB </label><input type="text" name="child_' + count + '_dob" class="js-dob"/></p></fieldset>';
    $($childElement).insertBefore('.button_add_child_wrapper');

    // activate the date picker once a child is added
    activateDatePicker();
}

/**
 * Handle removing a child
 */
$(document).on('click', '.js-remove-child', function(e) {
	e.preventDefault();

	// reduce the count of children
	count--;

	// get the index of the child to remove
	var childIndex = $(this).data('child');

	removeChildElement(childIndex);
});

/**
 * Function to remove a child element and replacing the numbers
 */
function removeChildElement(childIndex) {
	var $className = '.child_' + childIndex;

	// remove the current class first
	$($className).remove();

	var $nextClassName = '.child_' + ++childIndex;

	while ($($nextClassName)[0]) {
		var $classToReplace = '.child_' + (childIndex - 1);
		$($nextClassName).addClass('child_' + (childIndex - 1));
		$($classToReplace).removeClass('child_' + childIndex);

		// replace all the name tags
		var childName = 'child_' + childIndex + '_name';
		var childEmail = 'child_' + childIndex + '_email';
		var childPhone = 'child_' + childIndex + '_phone';
		var childDob = 'child_' + childIndex + '_dob'

		var childNameReplacement = 'child_' + (childIndex - 1) + '_name';
		var childEmailReplacement = 'child_' + (childIndex - 1) + '_email';
		var childPhoneReplacement = 'child_' + (childIndex - 1) + '_phone';
		var childDobReplacement = 'child_' + (childIndex - 1) + '_dob';

		$($classToReplace).find("input[name=" + childName  + "]").attr('name', childNameReplacement);
		$($classToReplace).find("input[name=" + childEmail  + "]").attr('name', childEmailReplacement);
		$($classToReplace).find("input[name=" + childPhone  + "]").attr('name', childPhoneReplacement);
		$($classToReplace).find("input[name=" + childDob  + "]").attr('name', childDobReplacement);

		$($classToReplace).find('.child_tag').html('<strong>Child ' + (childIndex - 1) + '</strong>');
		$($classToReplace).find('.js-remove-child').data('child', childIndex - 1);

		$nextClassName = '.child_' + ++childIndex;
	}
}
