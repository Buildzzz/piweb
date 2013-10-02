/*************************************************/

if (Meteor.isClient) {

  Template.viewlesson.helpers({
    title: function () {return Session.get("lessonTitle");
    },
    chapters: function () {return Chapter.find( {lessonId: Session.get("lessonId")}, {sort: {cNumber:1}});
    },
    pageForChapter: function () {return Page.find();
    },
    sectionForPage: function () {return Section.findOne( {pId: this.data._id});
    },
    section: function () {return Section.find( {pId: Session.get("pId")}, {sort: {sNumber:1}});},
  });

}