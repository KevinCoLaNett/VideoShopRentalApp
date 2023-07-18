Ext.define('VideoShopRental.view.movie.MovieFormController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.movieformcontroller', // used to instantiate in CustomerFormView.js

  config: {
    formType: 'add', // Default form type is 'add'
    recordData: null
  },

  setFormType: function (formType) {
    this.formType = formType;
  },

  loadRecordData: function (recordData) {
    this.recordData = recordData;
  },

  onSaveMovieClick: function (button) {
    // Access the formType property
    var form = button.up('form'),
      formType = this.formType,
      recordData = this.recordData,
      formValues = form.getValues(),
      movieStore = Ext.getStore('moviestore');

    var formController = this;
    var view = formController.getView(); // Get the view instance

    var numberInStock = formValues.NumberInStock;
    var numberAvailable = formValues.NumberAvailable;
    
    if (numberInStock < numberAvailable) {
      Ext.Msg.alert('Invalid Quantity', 'Number Available cannot exceed Number in Stock.');
      return console.log('Invalid Quantity');
    }

    if (form && form.isValid()) {

      if (formType == 'add') {
        // Create a new record with the form values
        var newMovie = Ext.create('VideoShopRental.model.Movie', formValues);

        // Add the new record to the store
        newMovie.set('MovieId', 0);
        movieStore.add(newMovie);
        movieStore.sync({
          success: function (response) {
            Ext.Msg.alert('Add Movie', 'Movie added successfully!');
            form.reset();

            // Reload the grid store
            var grid = Ext.ComponentQuery.query('movie')[0];
            grid.getStore().reload();

            // Close the window/modal
            var window = view.up('window');
            window.close();
          },
          failure: function (response) {
            movieStore.remove(newMovie);
            Ext.Msg.alert('Add Movie', 'Failed to add Movie!');
          }
        });
      }
      else if (formType == 'update') {
        // Find the existing record by the unique identifier
        var existingRecord = movieStore.findRecord('MovieId', recordData.MovieId);
        if (existingRecord) {
          // Update the record with the new form values
          existingRecord.set(formValues);
          movieStore.sync({
            success: function (response) {
              Ext.Msg.alert('Update Movie', 'Movie updated successfully!');
              // Reload the grid store
              var grid = Ext.ComponentQuery.query('movie')[0];
              grid.getStore().reload();

              // Close the window/modal
              var window = view.up('window');
              window.close();
            },
            failure: function (response) {
              Ext.Msg.alert('Update Movie', 'Failed to update Movie!');
            }
          });
        } else {
          console.log('Movie does not exist!');
        }
      } else {
        console.log('there is something wrong!');
      }
    }

    // //Add new movie
    // if (formType === 'add') {
    //   var newMovie = Ext.create('VideoShopRental.model.Movie');
    //   newMovie.set(formValues);
    //   newMovie.set('MovieId', 0);

    //   movieStore.add(newMovie);
    //   //console.log(newMovie);

    //   movieStore.sync({
    //     success: function (response) {
    //       Ext.Msg.alert('Add Movie', 'Movie added successfully!');
    //       movieStore.load();
    //       form.reset();
    //     },
    //     failure: function (response) {
    //       movieStore.remove(newMovie);
    //       Ext.Msg.alert('Add Movie', 'Failed to add Movie!');
    //     }
    //   });
    // }

    // //Update movie
    // else if (formType === 'update') {
    //   //console.log(recordData);
    //   // Find the existing record by the unique identifier
    //   var existingRecord = movieStore.findRecord('MovieId', recordData.MovieId);
    //   if (existingRecord) {
    //     existingRecord.set(formValues);
    //     movieStore.sync({
    //       success: function (response) {
    //         Ext.Msg.alert('Add Movie', 'Movie updated successfully!');
    //         movieStore.load();
    //       },
    //       failure: function (response) {
    //         movieStore.remove(newMovie);
    //         Ext.Msg.alert('Add Movie', 'Failed to update Movie!');
    //       }
    //     });
    //   } else {
    //     console.log('movie does not exist!')
    //   }
    // }
  }
});