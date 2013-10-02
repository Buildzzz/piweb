Router.map(function() {
  this.route('home', {path: '/',});
  this.route('lessons', {path: '/'});
  this.route('chapters');
  this.route('pages');
  this.route('sections');
  
  this.route('viewlesson');
});

/*  this.route('chapters', {
  	template: 'chapters',
    	renderTemplates: {
      		'addChapterForm': {to: 'chapterForm'}
      	}
  });
*/

