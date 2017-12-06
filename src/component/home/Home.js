import React from 'react';
import { Page } from 'react-onsenui'

const api = 'http://api.jakarta.go.id/ruang-publik/rptra'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setState({
    	loading: false,
    	alldata: []
    })
  }

  componentWillMount() {
  	this.setState({loading: true})
	 	fetch(api)
    	.then(res => res.json())
    	.then(data => {
     	 	const alldata = data.data
      	this.setState({alldata})
    	})
    	.catch(err => {
     	 	this.setState({ err: true , err_msg: err.message })
   		})
   	this.setState({loading: false})
  }

  fetchdata() {
  	this.state.alldata.map((o , i) => (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h1>{o.kecamatan}</h1>
					</div>
				</div>
			</div>
  	))
  }

  render() {
    const { loading , alldata } = this.state
    return (
    	<Page>
    		{loading ? <p>Loading...</p> : <h1>Tester</h1>}
    	</Page>
    );
  }
}
