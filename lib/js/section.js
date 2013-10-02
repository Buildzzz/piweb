Section = new Meteor.Collection('section');

Meteor.methods({
  EditSection: function (x, a, b, c){
    if (this.isSimulation) {}
    else{
      Section.update({ _id: x}, 
          {$set: {sNumber: a, sType: b, sText: c}}
      );
    }
  },
  AddSection: function (x, a, b, c){
    if (this.isSimulation) {}
    else{
      Section.insert({ pId: x, sNumber: a, sType: b, sText: c});
    }
  },
  RemoveSection: function (x){
    if (this.isSimulation) {}
    else{
      Section.remove(x);
    }
  },

});

/*************************************************/

if (Meteor.isClient) {

//Page Input Page

  Template.sections.helpers({
	  mTitle: function () {return Session.get("lessonTitle");},
  	cNumber: function () {return Session.get("cNumber");},
    cTitle: function () {return Session.get("cTitle");},
    pNumber: function () {return Session.get("pNumber");},
    pTitle: function () {return Session.get("pTitle");},
  	section: function () {return Section.find( {pId: Session.get("pId")}, {sort: {sNumber:1}});},
  	editing: function () {return Session.get("edit-");},
	  sectionEdit: function () {return Section.find({_id: Session.get("sId")});},
  });

  Template.addSectionForm.numberOfSections = function () {
    var x = Section.find( {pId: Session.get("pId")}).count();
    return x+1;
  };

  Template.sectionOutline.events = ({
    'click #editSection': function (e, t) {
      Session.set("edit-", true);
      Session.set("sId", t.data._id);
    },

    'click .del': function (e, t) {
      var x = confirm("Are you sure you want to delete " + t.data.sText +"?");
        if (x==true){
          Meteor.apply("RemovePage", [t.data._id]);
        }
        else{
      }
    },
  });

  Template.addSectionForm.events = ({
    'click #addSection': function (x, t){
      var sn = t.find("#aSNumber");
      var stype = t.find("#aSType");
      var stxt = t.find("#aSText");
      
      if (sn.value == "") {
        alert("Please input a section number.")  
      }
      else if (stype.value == ""){
        alert("Please select the section type.")
      }
      else if (stxt.value == ""){
        alert("Please input section text.")
      }
      else {
        Meteor.apply("AddSection", 
          [Session.get("pId"), sn.innerHTML, stype.value, stxt.value]);
        sn.value = "";
        stype.value = "";
        stxt.value = "";
      }
    },
  });

  Template.editSectionForm.events = ({
    'click #cancelEdit': function (x, t) {
      Session.set("edit-", false);
      Session.set("sId", "");
    },
    'click #editSection': function (x, t) {
      var sn = t.find("#eSNumber");
      var stype = t.find("#eSType");
      var stxt = t.find("#eSText");
      
      if (sn.value == "") {
        alert("Please input a section number.")  
      }
      else if (stype.value == ""){
        alert("Please select the section type.")
      }
      else if (stxt.value == ""){
        alert("Please input section text.")
      }
      else {
        Meteor.apply("EditSection",
          [Session.get("sId"), sn.value, stype.value, stxt.value]);
        sn.value = "";
        stype.value = "";
        stxt.value = "";
        Session.set("edit-", false);
      }
    },
  });

}