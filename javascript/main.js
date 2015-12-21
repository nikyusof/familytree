$('.js-dob').dateDropper({
	years_multiple: '10',
	minYear: '1940',
	animation: 'bounce'
});

$('.js-add-child').click(function(e) {
	var count = $(this).data('count') || 0;
	$(this).attr('data-count', ++count);
	addChildElement(count);
});

function addChildElement(count) {
	var $childElement = '<fieldset><h2><strong>Child ' + count + '</strong></h2><p><label for="child_' + count + '_name">Full Name </label><input type="text" name="child_' + count + '_name" /></p><p><label for="child_' + count + '_email">Email </label><input type="email" name="child_' + count + '_email"/></p><p><label for="child_' + count + '_phone">Phone Number </label><input type="text" name="child_' + count + '_phone"/></p><p><label for="child_' + count + '_dob">DOB </label><input type="text" name="child_' + count + '_dob" class="js-dob"/></p></fieldset>';
    $childElement.replace(/#/g, count);
    $($childElement).insertBefore('.js-add-child');
}