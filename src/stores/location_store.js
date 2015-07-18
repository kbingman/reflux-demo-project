import Reflux from 'reflux';
import locationActions from '../actions/location_actions';
import LocationsFetcher from '../utils/locations_fetcher';

var locationStore = Reflux.createStore({

    listenables: [locationActions],

    data: {
        locations: [],
        errorMessage: null,
        loading: false
    },

    init() {
        console.log('init');
    },

    handleUpdateLocations(locations) {
        this.data.locations = locations;
        this.trigger(this.data);
    },

    handleError(error) {
        this.data.error = error;
        this.trigger(this.data);
    },

    onUpdateLocations() {
        LocationsFetcher.fetch()
            .then(this.handleUpdateLocations)
            .catch(this.handleError);
    },

    getInitialState() {
        return this.data;
    }

});

export default locationStore;
