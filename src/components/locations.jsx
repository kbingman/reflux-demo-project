import React from 'react';
import Reflux from 'reflux';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

import locationStore from '../stores/location_store';
import locationActions from '../actions/location_actions';

var Locations = React.createClass({

    mixins: [ Reflux.connect(locationStore) ],

    // Fired just before the component is mounted.
    // Here we check for the locations prop and set the state to that
    // if found. This is used for preloading and bootstrapping data.
    componentWillMount() {
        if (this.props.locations) {
            locationStore.handleUpdateLocations(this.props.locations);
        }
    },

    renderListEl (location, i) {
        return (
            <li key={ 'location_' + i }>{ location.name }</li>
        );
    },

    render() {
        // Error Messaging
        if (this.state.errorMessage) {
            return (
                <div>Something is wrong</div>
            );
        }

        // Add the loading overlay here
        if (this.state.loading ) {
            console.log('loading');
        }

        // Main Rendering
        return (
            <div>
                <h1>React / Alt Demo</h1>
                <ul>
                    { this.state.locations.map(this.renderListEl) }
                </ul>
                <button onClick={ locationActions.updateLocations }>Update</button>
            </div>
        );
    }
});

export default Locations;
