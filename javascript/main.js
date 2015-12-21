$('.js-dob').dateDropper({
	years_multiple: '10',
	minYear: '1940',
	animation: 'bounce'
});

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
	var $childElement = '<fieldset class="child_' + count + '"><div class="child_wrapper"><h2 class="child_tag"><strong>Child ' + count + '</strong></h2><button type="button" class="js-remove-child btn btn-danger remove_child" data-child="' + count + '">-</button></div><p><label for="child_' + count + '_name">Full Name </label><input type="text" name="child_' + count + '_name" /></p><p><label for="child_' + count + '_email">Email </label><input type="email" name="child_' + count + '_email"/></p><p><label for="child_' + count + '_phone">Phone Number </label><input type="text" name="child_' + count + '_phone"/></p><p><label for="child_' + count + '_dob">DOB </label><input type="text" name="child_' + count + '_dob" class="js-dob"/></p></fieldset>';
    $($childElement).insertBefore('.js-add-child');
}

/**
 * Handle removing a child
 */
$(document).on('click', '.js-remove-child', function(e) {
	// reduce the count of children
	count--;

	// get the index of the child to remove
	var childIndex = $(this).data('child');

	removeChildElement(childIndex);
});

/**
 * Function to remove a child element
 */
function removeChildElement(childIndex) {
	var $className = '.child_' + childIndex;
	$($className).remove();
}
