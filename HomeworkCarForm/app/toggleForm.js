$(document).ready(function () {
	$('.btnShow').click(function(){
		$('#carForm').toggle();
		var $this = $(this);
		$this.toggleClass('btnShow');
		if ($this.hasClass('btnShow')) {
			$this.text('Hide Form of Add Car');
		}else {
			$this.text('Show Form of Add Car')
		}
	});
	$('.btnShowStyle').click(function(){
		$('#formStyle').toggle();
		var $this = $(this);
		$this.toggleClass('btnShowStyle');
		if ($this.hasClass('btnShowStyle')) {
			$this.text('Hide Form of Add Style');
		}else {
			$this.text('Show Form of Add Style')
		}
	});
});


