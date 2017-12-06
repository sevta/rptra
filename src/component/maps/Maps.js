import React from 'react';
import { Page } from 'react-onsenui'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const api = 'http://api.jakarta.go.id/ruang-publik/rptra'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: -6.216077, lng: 106.851920 }}
  >
    {props.isMarkerShown && 
    	props.data.map((object , index) => (
	    	<Marker 
	    		onClick={props.toggle(index)}
	    		position={{ lat: object.location.latitude, lng: object.location.longitude }} 
	    	/>
    	))
    }
  </GoogleMap>
))


export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	alldata: []
    }
  }

  componentWillMount() {
  	fetch(api)
      .then(res => res.json())
      .then(data => {
        const alldata = data.data
        this.setState({alldata})
      })
      .catch(err => {
        this.setState({ err: true , err_msg: err.message })
      })
  }

  toggle(data) {
  	console.log(data)
  }

  render() {
  	const key = 'AIzaSyAxA5qUBrq8JoBPKpNI3b7OX4SXXmBS__s'
    return (
			<Page>
				<MyMapComponent
					toggle={this.toggle.bind(this)}
					data={this.state.alldata}
				  isMarkerShown
				  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `100%` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				/>
				<div className="container">
					<div className="row">
						<div className="col-12">
							
						</div>
					</div>
				</div>
			</Page>
    );
  }
}
